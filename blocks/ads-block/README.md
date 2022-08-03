# Ads Block

This is the `AdsBlock` feature that utilizes the ArcAds library to render Google DFP advertisements. It will allow PageBuilder editors to select an 'Ad Type' as well as 'display' configuration option. It also includes the option of displaying or hiding an 'ADVERTISEMENT' label above the ad unit.

## Props

| **Prop**           | **Required** | **Type** | **Description**                                         |
| ------------------ | ------------ | -------- | ------------------------------------------------------- |
| **adType**         | yes          | string   | 'Ad Type' configuration to use for ad unit instance     |
| **displayAdLabel** | yes          | boolean  | Indicates whether or not to display advertisement label |

## Internationalization fields

| Phrase key | Default (English) |
| ---------- | ----------------- |
| ad-label   | ADVERTISEMENT     |

## Additional Considerations

- This block is using `arcads@6.1.1`. See [here](https://github.com/washingtonpost/ArcAds) for more info on the library. It is a DFP wrapper created by Arc Publishing with publishers in mind. Please note that this package is not supported by Themes developers.
