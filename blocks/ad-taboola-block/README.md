# `@wpmedia/ad-taboola-block`

A wrapper for [Taboola](https://www.taboola.com/) - an ad block for use across different page types.

Makes use of a page's meta tag - `page-type` to pass to taboola the value.

## Props

### Global

| **Prop**               | **Required** | **Description**                  |
| ---------------------- | ------------ | -------------------------------- |
| **taboolaPublisherId** | yes          | Publisher ID provided by Taboola |

This configuration need to added to `blocks.json` like this:

```
{
    ...
    "values": {
        "default": {
            "siteProperties": {
                ...
                "taboolaPublisherId": "client-publisher-id",
                ...
            }
        }
    }
}
```

### Per block

| **Prop**             | **Required** | **Description**                                  |
| -------------------- | ------------ | ------------------------------------------------ |
| **taboolaPlacement** | yes          | Block placement description, provided by Taboola |
| **taboolaMode**      | yes          | Block mode, provided by Taboola                  |
| **taboolaContainer** | yes          | Block container name, provided by Taboola        |

This properties will be defined on each block added to the page.

## Reference Material

[Implementing Taboola Javascript Placement Code](https://pubhelp.taboola.com/hc/en-us/articles/360003181054-Implementing-Javascript-Placement-Code)

## Additional Considerations

The block will not render fully within PageBuilder editor. Inside the editor, when the block has properties correctly configured, will show a dummy block with the placement name.
To see the block working, need to publish the page and on the preview url add the parameter `&taboola_sim_domain=XXX`, replacing XXX with the domain provided by Taboola for testing.
