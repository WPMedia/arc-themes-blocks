---
title: How to Configure Fusion Engine Logs Forwarding
description: Step-by-step guide to configure log forwarding from Arc XP's Fusion rendering engine to AWS CloudWatch and S3.
lastUpdated: 2025-03-26T00:00:00.000Z
conversionDate: 2024-08-04T22:16:25.444Z
---

In any software application of sufficient size and complexity, you'll have to deal with log management and forwarding. This guide outlines the step-by-step process for configuring an Arc XP client’s AWS account to receive logs from Arc XP's Fusion rendering engine.

It includes detailed instructions on:

- Setting up a **Kinesis Data Stream**
- Creating the necessary **IAM roles and policies**
- Configuring the **CloudWatch Logs destination**
- Deploying resources using the **AWS CLI**

Additionally, the solution includes an optional **AWS Lambda function** that enables streaming of logs content to **CloudWatch Logs** and/or **Amazon S3** within the customer’s receiving account.

*Note:* The AWS region for the destination account must match the Arc XP Platform deployment region.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account with necessary permissions.
- AWS CLI installed and configured.
- `<sourceAccountId>` provided by Arc, representing Arc's source account ID.

## Step-by-Step Setup

In this section, we will walk through the process of setting up log forwarding from Arc XP's Fusion rendering engine to AWS CloudWatch and S3.

### 1. Create a Kinesis Data Stream
Kinesis Data Stream will act as the intermediary where logs are forwarded before being processed. Creating a Kinesis stream ensures that log data is handled efficiently and can be accessed by CloudWatch.

```sh
aws kinesis create-stream --stream-name "ArcXPDestinationLogStream" --shard-count 1
```

Wait until the stream becomes active. You can check the stream status with:

```sh
aws kinesis describe-stream --stream-name "ArcXPDestinationLogStream"
```

Take note of the `StreamARN` value, as it will be needed in later steps.

### 2. Establish IAM Trust Policy
CloudWatch Logs needs permission to assume a role in your AWS account to forward logs. We create an IAM trust policy to grant this access.

Create the trust policy file before proceeding:

```sh
cat > trust-policy.json << EOL
{
  "Statement": {
    "Effect": "Allow",
    "Principal": {
      "Service": "logs.amazonaws.com"
    },
    "Condition": {
      "StringLike": {
        "aws:SourceArn": [
          "arn:aws:logs:<region>:<sourceAccountId>:*",
          "arn:aws:logs:<region>:<destinationAccountId>:*"
        ]
      }
    },
    "Action": "sts:AssumeRole"
  }
}
EOL
```

### 3. Create IAM Role with Permissions
An IAM role is required for CloudWatch Logs to forward data to Kinesis. We create the role and attach the necessary permissions to allow `PutRecord` operations on the Kinesis stream.

```sh
# Create the IAM role
aws iam create-role --role-name ArcXPLogForwardingRole --assume-role-policy-document file://trust-policy.json

# Define the permissions policy before proceeding
cat > permissions-policy.json << EOL
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "kinesis:PutRecord",
      "Resource": "arn:aws:kinesis:<region>:<destinationAccountId>:stream/ArcXPDestinationLogStream"
    }
  ]
}
EOL

# Attach the permissions policy to the role
aws iam put-role-policy --role-name ArcXPLogForwardingRole --policy-name Permissions-Policy-For-CWL --policy-document file://permissions-policy.json
```

Replace `<region>`, `<sourceAccountId>`, and `<destinationAccountId>` with the respective AWS values.

### 4. Configure the CloudWatch Logs Destination
The CloudWatch Logs destination must be configured to send logs to the Kinesis stream.

```sh
aws logs put-destination \
    --destination-name ArcXPLogDestination \
    --target-arn arn:aws:kinesis:<region>:<destinationAccountId>:stream/ArcXPDestinationLogStream \
    --role-arn arn:aws:iam::<destinationAccountId>:role/ArcXPLogForwardingRole
```

### 5. Create the Access Policy File
CloudWatch Logs destinations require an access policy that allows the log sender account to forward logs. This policy must explicitly grant `logs:PutSubscriptionFilter` permission.

Create the access policy file before proceeding:

```sh
cat > access-policy.json << EOL
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"AWS": "<sourceAccountId>"},  # Provided by Arc, representing Arc's source account ID
      "Action": "logs:PutSubscriptionFilter",
      "Resource": "arn:aws:logs:<region>:<destinationAccountId>:destination:ArcXPLogDestination"
    }
  ]
}
EOL
```

### 6. Set Destination Policy
Now that the `access-policy.json` file has been created, we apply it to the CloudWatch Logs destination to finalize the configuration.

```sh
aws logs put-destination-policy \
    --destination-name ArcXPLogDestination \
    --access-policy file://access-policy.json
```

## Deploying the AWS Lambda Function with AWS SAM

The AWS Lambda function is designed to process log records from a Kinesis stream. It performs the following tasks:

- Decodes and decompresses log data received from Kinesis.
- Parses the log data and forwards it to CloudWatch Logs.
- Buffers log messages and uploads them to an S3 bucket when the buffer reaches a specified size.
- Ensures that the necessary CloudWatch log groups and streams are created and maintained.

Link to github [repo](https://github.com/arcxp/fusion-engine-logs) containing the Lambda source code.

### Important: Replace Placeholders in `template.yaml`
Before deploying the Lambda function, ensure that all placeholders in the `template.yaml` file are replaced with your specific AWS account details. The placeholders include:

- `<aws-account-id>`: Replace with your AWS account ID.
- `<region>`: Replace with the AWS region where you want to deploy the resources.
- `S3_BUCKET_NAME`: Your bucket name. Ensure the bucket already exists before running the lambda.


Ensure these placeholders are correctly replaced to avoid deployment errors.

### Step 1: Install AWS SAM CLI
Ensure you have the AWS SAM CLI installed. You can follow the installation guide from the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).

### Step 2: Build the Lambda Function
Use the SAM CLI to build the Lambda function. This command will package your application and its dependencies.

```bash
sam build
```

### Step 3: Deploy the Lambda Function
Deploy the function using the SAM CLI. This command will package and deploy your application to AWS, creating the necessary resources.

```bash
sam deploy --guided
```

During the guided deployment, you will be prompted to enter parameters such as the stack name, AWS region, and whether to save the configuration for future deployments.

### Step 4: Verify the Deployment
After deployment, verify that the Lambda function is created and configured correctly in the AWS Management Console.

<img width="1395" alt="image" src="/images/pagebuilder-engine/pagebuilder-engine-logs.png" />


## Next Steps

Now that you have set up the log forwarding, you may want to understand what's in the engine logs. You can refer to the [Arc XP documentation on how to read engine logs](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-read-engine-logs.html) for more information.

Additionally, you can explore some CloudWatch example queries that might be useful now that you have the engine logs in your AWS account.

### Common Issues and Fixes

- **Logs not appearing in CloudWatch**: Verify IAM role permissions, Kinesis stream configuration, and the Lambda function logs
- **Access Denied Errors**: Check the CloudWatch destination policy and IAM role permissions.
