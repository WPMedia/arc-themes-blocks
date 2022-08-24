# Signing Service Content Source

A Fusion content source for interacting with the Arc Signing Service for generating hashed strings based on an input

## Environment Variables

The signing content source relies on the following environment variables

| Variable                        | Description                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| SIGNING_SERVICE_DEFAULT_APP     | The name of the signing service app that should be used as the default app for API request |
| SIGNING_SERVICE_DEFAULT_VERSION | The signing service app version that aligns with the default app                           |

## Content Source Params

| Param          | Description                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| id             | The string to be hashed - this will be passed to the signing service as an encoded string generate a hashed string on |
| service        | The signing service app to use, by default will use the value from `SIGNING_SERVICE_DEFAULT_APP` environment variable |
| serviceVersion | The signing service app version to use, by default will use the value from `SIGNING_SERVICE_DEFAULT_VERSION`          |

## TTL

- 365 Days
