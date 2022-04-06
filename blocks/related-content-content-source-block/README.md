# `@wpmedia/related-content-content-source-block`

_Content source block to get stories related content, using the story Id as key._

## Configurable Params

| **Param** | **Type** | **Required** | **Description**                                                       |
| --------- | -------- | ------------ | --------------------------------------------------------------------- |
| **\_id**  | String   | true         | Story ID go get related content from (ex: CMVOSB2VCRDIBPC356BF2AXBFI) |

## API Reference

Reference documentation for the API used by this content source can be on [ALC](https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json#/Related_Content/get_related_content)

## ANS Schema reference

Documents retrieved by this content source comply with Ans Schema [v0.10.6](https://github.com/washingtonpost/ans-schema/tree/master/src/main/resources/schema/ans/0.10.6)

## Usage

```
import { useContent } from 'fusion:content';

...

const relatedContent = useContent({
  sounce: 'related-content',
  query: {
    _id: 'CMVOSB2VCRDIBPC356BF2AXBFI',
  },
});
```

### Example output

```
{
  basic: [
    {
      _id: 'BPGB4PD6UJFJBMBFCZD7IHHRU4',
      additional_properties: {
        clipboard: {},
        has_published_copy: true,
        is_published: true,
        publish_date: '2020-09-15T18:33:29.404Z',
      },
      address: {},
      canonical_url: '/health/2020/09/15/testing-image-focal-point/',
      canonical_website: 'the-sun',
      content_elements: [
        {
          _id: 'ZUBFLUHI2NF23NILNSLT2UPX6M',
          additional_properties: {
            _id: 1600187300741,
            comments: [],
            inline_comments: [],
          },
          content: '<br/>',
          type: 'text',
        },
      ],
      content_restrictions: {},
      created_date: '2020-09-15T16:30:31.419Z',
      credits: {
        by: [],
      },
      description: {
        basic: '',
      },
      display_date: '2020-09-15T16:33:12.862Z',
      distributor: {
        category: 'staff',
        name: 'corecomponents',
        subcategory: '',
      },
      first_publish_date: '2020-09-15T16:33:12.862Z',
      geo: {},
      headlines: {
        basic: 'testing image focal point',
        meta_title: '',
        mobile: '',
        native: '',
        print: '',
        tablet: '',
        web: '',
      },
      label: {},
      language: '',
      last_updated_date: '2020-09-15T18:33:29.883Z',
      owner: {
        id: 'corecomponents',
        sponsored: false,
      },
      planning: {
        internal_note: '',
        story_length: {
          character_count_actual: 0,
          character_encoding: 'UTF-16',
          inch_count_actual: 0,
          line_count_actual: 0,
          word_count_actual: 0,
        },
      },
      promo_items: {
        basic: {
          _id: 'ROWVW4VI5ZEJ7ISJNYEMVQ5YTE',
          additional_properties: {
            fullSizeResizeUrl: '/photo/resize/vw1sQ3cLpQq21AzJRls-usF5NMU=/arc-anglerfish-arc2-prod-corecomponents/public/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
            galleries: [],
            ingestionMethod: 'manual',
            keywords: [],
            mime_type: 'application/octet-stream',
            originalName: 'L6NPTPXSLBGGXIPJGCHZI7KM4E.png',
            originalUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
            owner: 'sara.carothers@washpost.com',
            proxyUrl: '/photo/resize/vw1sQ3cLpQq21AzJRls-usF5NMU=/arc-anglerfish-arc2-prod-corecomponents/public/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
            published: true,
            resizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/vw1sQ3cLpQq21AzJRls-usF5NMU=/arc-anglerfish-arc2-prod-corecomponents/public/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
            restricted: false,
            template_id: 297,
            thumbnailResizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/otY4xsB1W_mAYGxYZX3ZD9yz0tQ=/300x0/arc-anglerfish-arc2-prod-corecomponents/public/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
            version: 4,
          },
          address: {},
          caption: 'Mexican guitarist Cham\u00edn Correa performs \'La Barca\' in a musical tribute to the Los Tres Caballeros, the musical trio he played in. Correa died at age 90.',
          created_date: '2020-01-17T20:29:20Z',
          credits: {
            affiliation: [
              {
                name: 'Enrique Valles',
                type: 'author',
              },
            ],
            by: [],
          },
          focal_point: {
            x: 1679,
            y: 457,
          },
          geo: {},
          height: 1080,
          image_type: 'photograph',
          last_updated_date: '2020-09-15T18:32:01Z',
          licensable: false,
          owner: {
            id: 'corecomponents',
            sponsored: false,
          },
          source: {
            additional_properties: {
              editor: 'photo center',
            },
            edit_url: 'https://corecomponents.arcpublishing.com/photo/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE',
            system: 'photo center',
          },
          status: '',
          subtitle: 'Cham\u00edn Correa',
          syndication: {
            external_distribution: '',
            search: '',
          },
          taxonomy: {
            associated_tasks: [],
          },
          type: 'image',
          url: 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/ROWVW4VI5ZEJ7ISJNYEMVQ5YTE.png',
          version: '0.10.3',
          width: 1920,
        },
      },
      publish_date: '2020-09-15T18:33:29.404Z',
      publishing: {
        scheduled_operations: {
          publish_edition: [],
          unpublish_edition: [],
        },
      },
      related_content: {
        basic: [],
        redirect: [],
      },
      revision: {
        branch: 'default',
        editions: [
          'default',
        ],
        parent_id: 'QFBVZZ3KABCGNBNIQG5XLPTJIM',
        published: true,
        revision_id: 'IC7SX523PZBADLLZ76M64NXAAE',
        user_id: 'fernandezn@washpost.com',
      },
      source: {
        name: 'corecomponents',
        source_type: 'staff',
        system: 'composer',
      },
      subheadlines: {
        basic: '',
      },
      taxonomy: {},
      type: 'story',
      version: '0.10.5',
      website: 'the-sun',
      website_url: '/health/2020/09/15/testing-image-focal-point/',
      websites: {
        'the-sun': {
          website_section: {
            _id: '/health',
            _website: 'the-sun',
            _website_section_id: 'the-sun./health',
            additional_properties: {},
            description: null,
            name: 'Health',
            parent: {
              default: '/',
            },
            parent_id: '/',
            path: '/health',
            type: 'section',
            version: '0.6.0',
          },
          website_url: '/health/2020/09/15/testing-image-focal-point/',
        },
      },
      workflow: {
        status_code: 1,
      },
    }
  ],
  "_id": "CMVOSB2VCRDIBPC356BF2AXBFI"
}
```
