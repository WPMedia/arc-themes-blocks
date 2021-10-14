# `@wpmedia/ads-block`
_This is the `AdsBlock` feature that utilizes the ArcAds library to render Google DFP advertisements. It will allow PageBuilder editors to select an 'Ad Type' as well as 'display' configuration option. It also includes the option of displaying or hiding an 'ADVERTISEMENT' label above the ad unit._

## Acceptance Criteria
- Add AC relevant to the block

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **adType** | yes | string | 'Ad Type' configuration to use for ad unit instance |
| **displayAdLabel** | yes | boolean | Indicates whether or not to display advertisement label |

## ANS Schema
Outline any schema information requirements necessary to know for ths block

### ANS Fields
- n/a

## Internationalization fields
| Phrase key | Default (English) |
|---|---|
|`key`|`english translation`|

## Events
Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description** |
|---|---|
| **eventName** | Describe the event |

### Event Listening
Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Considerations
- This block is using arcads@4. See [here](https://github.com/washingtonpost/ArcAds) for more info on the library. It is a DFP wrapper created by Arc Publishing with publishers in mind. 
