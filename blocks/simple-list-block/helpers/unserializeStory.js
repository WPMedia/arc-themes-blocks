/* eslint-disable max-len */
/*
type: "story"
version: "0.10.4"
content_elements: [{…}]
created_date: "2020-02-10T16:08:44.538Z"
revision: {revision_id: "XFT43R77IVDS5CMV262PYHENA4", parent_id: "7GXRVRIRNNDHXERJXUXYWMHTH4", editions: Array(1), branch: "default", user_id: "youngj@washpost.com", …}
last_updated_date: "2020-02-10T16:09:45.197Z"
canonical_url: "/news/2020/02/10/video-test/"
headlines: {basic: "Video Test", mobile: "", native: "", print: "", tablet: "", …}
owner: {sponsored: false, id: "corecomponents"}
content_restrictions: {content_code: "free"}
address: {}
workflow: {status_code: 1}
subheadlines: {basic: ""}
description: {basic: ""}
language: ""
label: {}
source: {name: "corecomponents", system: "composer", source_type: "staff"}
taxonomy: {tags: Array(0), sites: Array(1), sections: Array(8), primary_site: {…}, primary_section: {…}}
related_content: {basic: Array(0), redirect: Array(0)}
promo_items: {lead_art: {…}}
distributor: {name: "corecomponents", category: "staff", subcategory: ""}
canonical_website: "the-sun"
planning: {internal_note: "", story_length: {…}}
display_date: "2020-02-10T16:09:44.509Z"
credits: {by: Array(1)}
subtype: "right-rail-template"
first_publish_date: "2020-02-10T16:09:45.223Z"
websites: {dagen: {…}, the-sun: {…}, washpost: {…}, the-globe: {…}, the-planet: {…}, …}
additional_properties: {clipboard: {…}, has_published_copy: true, is_published: false, publish_date: false}
publish_date: "2020-02-10T16:09:45.223Z"
publishing: {scheduled_operations: {…}}
_id: "UK662DYK6VF5XCY7KNZ25XB3QQ"
website: "the-sun"
website_url: "/news/2020/02/10/video-test/"

simplified
/*
for helper
    const mockPayload = [
      {
        promo_items: {
          basic: {
            type: {
              image: {
                url: 'something.jpg',
              },
            },
          },
        },
        headlines: {
          basic: 'Video Test', mobile: '', native: '', print: '', tablet: '',
        },
        _id: 'UK662DYK6VF5XCY7KNZ25XB3QQ',
      },
    ];

*/
/* eslint-enable max-len */

const extractImage = storyObject => storyObject.promo_items && storyObject.promo_items.basic && storyObject.promo_items.basic.type === 'image' && storyObject.promo_items.basic.url;

const unserializeStory = storyObject => ({
  id: storyObject._id,
  itemTitle: storyObject.headlines.basic,
  imageURL: extractImage(storyObject) || '',
});

export default unserializeStory;
