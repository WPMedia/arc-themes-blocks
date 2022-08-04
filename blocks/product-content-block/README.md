# Product Information Block

Used in conjuction with Arc Commerce to give an editor the ability to display Product
Description and/or Product Details

## Custom Fields

| **Custom Field** | **Required** | **Type** | **Description**                                                                        |
| ---------------- | ------------ | -------- | -------------------------------------------------------------------------------------- |
| **contentType**  | no           | string   | Choice of which product content item to show                                           |
| **headline**     | no           | string   | A custom headline to be used in place of the default headline for a given content type |
| open             | no           | boolean  | Flag to denote if the content panel should be open on intial render                    |

## Data

Relies on `globalContent` for data access from Arc Commerce
