const React = require('react');
const { mount } = require('enzyme');

describe('the article body OEmbed component', () => {
  const content = [
    {
      type: 'oembed_response',
      subtype: 'twitter',
      _id: 'QVHHHM5PDVGB3JSPMQ7QJRNW5E',
      raw_oembed: {
        url: 'https://twitter.com/washingtonpost/status/1150785932213346304',
        author_name: 'The Washington Post',
        author_url: 'https://twitter.com/washingtonpost',
        html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sassy, salty preserved lemons belong in your pantry.<br><br>Here’s how to use them. <a href="https://t.co/g96lwAQWDT">https://t.co/g96lwAQWDT</a></p>&mdash; The Washington Post (@washingtonpost) <a href="https://twitter.com/washingtonpost/status/1150785932213346304?ref_src=twsrc%5Etfw">July 15, 2019</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        width: 550,
        height: null,
        type: 'twitter',
        cache_age: '3153600000',
        provider_name: 'Twitter',
        provider_url: 'https://twitter.com',
        version: '1.0',
        _id: 'https://twitter.com/washingtonpost/status/1150785932213346304',
        additional_properties: {
          comments: [],
          _id: 1572984379570,
        },
      },
      referent: {
        id: 'https://twitter.com/washingtonpost/status/1150785932213346304',
        service: 'oembed',
        type: 'twitter',
        provider: 'https://publish.twitter.com/oembed?url=',
        referent_properties: {
          additional_properties: {
            comments: [],
            _id: 1572984379570,
          },
        },
      },
    }, {
      type: 'oembed_response',
      subtype: 'instagram',
      _id: 'M3QRULGGHVELFMBEYMU6YMSF64',
      raw_oembed: {
        version: '1.0',
        title: "Welcome to San Francisco. Hop a cable car, climb a secret staircase, eat a dim-sum feast or wander with no itinerary. Just remember to wear layers. What's your favorite spot in our first city? #BTW #BTWSanFrancisco (illustration by San Francisco illustrator @chie.tamada)",
        author_name: 'bytheway',
        author_url: 'https://www.instagram.com/bytheway',
        author_id: 10742342465,
        media_id: '2070603754408536082_10742342465',
        provider_name: 'Instagram',
        provider_url: 'https://www.instagram.com',
        type: 'instagram',
        width: 658,
        height: null,
        html: '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/By8QyTkHGgS/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/By8QyTkHGgS/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/By8QyTkHGgS/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Welcome to San Francisco. Hop a cable car, climb a secret staircase, eat a dim-sum feast or wander with no itinerary. Just remember to wear layers. What&#39;s your favorite spot in our first city? #BTW #BTWSanFrancisco (illustration by San Francisco illustrator @chie.tamada)</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/bytheway/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> By The Way</a> (@bytheway) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-06-20T18:27:04+00:00">Jun 20, 2019 at 11:27am PDT</time></p></div></blockquote>\n<script async src="//www.instagram.com/embed.js"></script>',
        thumbnail_url: 'https://scontent-iad3-1.cdninstagram.com/vp/6c8ce8a153c53f81ab6a99cc4bdb02f3/5E4EA5F4/t51.2885-15/sh0.08/e35/s640x640/63161934_143080750110753_8371479687097356691_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=109',
        thumbnail_width: 640,
        thumbnail_height: 640,
        _id: 'https://www.instagram.com/p/By8QyTkHGgS/',
        additional_properties: {
          comments: [],
          _id: 1572984379572,
        },
      },
      referent: {
        id: 'https://www.instagram.com/p/By8QyTkHGgS/',
        service: 'oembed',
        type: 'instagram',
        provider: 'https://api.instagram.com/oembed?url=',
        referent_properties: {
          additional_properties: {
            comments: [],
            _id: 1572984379572,
          },
        },
      },
    }, {
      type: 'oembed_response',
      subtype: 'facebook',
      _id: 'M4DRTLELUJAHRAOEYNXSFVAW2U',
      raw_oembed: {
        author_name: 'Washington Post Department of Satire',
        author_url: 'https://www.facebook.com/wapodeptofsatire/',
        provider_url: 'https://www.facebook.com',
        provider_name: 'Facebook',
        success: true,
        height: 375,
        html: '<div id="fb-root"></div>\n<script async="1" defer="1" crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v5.0"></script><div class="fb-video" data-href="https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/"><blockquote cite="https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/">How to identify the cherry blossom</a><p>It&#039;s that time of the year to incorrectly identify cherry blossom trees.\n\nHere&#039;s how to do it correctly, so you don&#039;t look like a n00b:</p>Posted by <a href="https://www.facebook.com/wapodeptofsatire/">Washington Post Department of Satire</a> on Tuesday, March 26, 2019</blockquote></div>',
        type: 'facebook-video',
        version: '1.0',
        url: 'https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/',
        width: 500,
        _id: 'https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/',
        additional_properties: {
          comments: [],
          _id: 1572984379574,
        },
      },
      referent: {
        id: 'https://www.facebook.com/wapodeptofsatire/videos/2101216293510579/',
        service: 'oembed',
        type: 'facebook-video',
        provider: 'https://www.facebook.com/plugins/video/oembed.json/?url=',
        referent_properties: {
          additional_properties: {
            comments: [],
            _id: 1572984379574,
          },
        },
      },
    }, {
      type: 'oembed_response',
      subtype: 'youtube',
      _id: '3OYDYWUAK5D4XP5WJ6PLS4KHYQ',
      raw_oembed: {
        width: 480,
        author_name: 'Washington Post',
        height: 270,
        type: 'youtube',
        provider_url: 'https://www.youtube.com/',
        thumbnail_width: 480,
        author_url: 'https://www.youtube.com/user/WashingtonPost',
        thumbnail_height: 360,
        provider_name: 'YouTube',
        version: '1.0',
        html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/817CYL6KuGo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        title: 'How to grocery shop | Teach Dave to Cook',
        thumbnail_url: 'https://i.ytimg.com/vi/817CYL6KuGo/hqdefault.jpg',
        _id: 'https://www.youtube.com/watch?v=817CYL6KuGo',
        additional_properties: {
          comments: [],
          _id: 1572984379576,
        },
      },
      referent: {
        id: 'https://www.youtube.com/watch?v=817CYL6KuGo',
        service: 'oembed',
        type: 'youtube',
        provider: 'https://www.youtube.com/oembed?url=',
        referent_properties: {
          additional_properties: {
            comments: [],
            _id: 1572984379576,
          },
        },
      },
    },
  ];

  it('should render amp-twitter correctly', () => {
    const { default: Oembed } = require('./oembed');
    const { default: EmbedContainer } = require('react-oembed-container');
    const wrapper = mount(
      <Oembed element={content[0]} isAmp={false} isLeadArt={false} />,
    );
    expect(wrapper.find('.oembed-twitter')).toHaveLength(1);
    expect(wrapper.find(EmbedContainer)).toHaveLength(1);
    expect(wrapper.find(EmbedContainer).text()).toMatch('.Here’s how to use them. https://t.co/g96lwAQWDT— The Washington Post (@washingtonpost)');
  });

  it('should render amp-instagram correctly', () => {
    const { default: Oembed } = require('./oembed');
    const wrapper = mount(
      <Oembed element={content[1]} isAmp isLeadArt={false} />,
    );
    expect(wrapper.find('div.oembed-instagram.container_row')).toHaveLength(1);
    expect(wrapper.find('.oembed-instagram')).toHaveLength(1);
  });

  it('should render amp-youtube correctly', () => {
    const { default: Oembed } = require('./oembed');
    const wrapper = mount(
      <Oembed element={content[3]} isAmp isLeadArt={false} />,
    );
    expect(wrapper.find('div.oembed-youtube.container_row')).toHaveLength(1);
    expect(wrapper.find('.oembed-youtube')).toHaveLength(1);
  });

  it('should render amp-facebook correctly', () => {
    const { default: Oembed } = require('./oembed');
    const wrapper = mount(
      <Oembed element={content[2]} isAmp isLeadArt={false} />,
    );
    expect(wrapper.find('div.oembed-facebook.container_row')).toHaveLength(1);
    expect(wrapper.find('.oembed-facebook')).toHaveLength(1);
  });

  it('should render amp-twitter correctly', () => {
    const { default: Oembed } = require('./oembed');
    const wrapper = mount(
      <Oembed element={content[0]} isAmp isLeadArt={false} />,
    );
    expect(wrapper.find('div.oembed-twitter.container_row')).toHaveLength(1);
    expect(wrapper.find('.oembed')).toHaveLength(1);
  });

  it('should render amp-youtube correctly', () => {
    const { default: Oembed } = require('./oembed');
    const { default: EmbedContainer } = require('react-oembed-container');
    const wrapper = mount(
      <Oembed element={content[3]} isAmp={false} isLeadArt={false} />,
    );
    expect(wrapper.find('.oembed-youtube')).toHaveLength(1);
    expect(wrapper.find(EmbedContainer)).toHaveLength(1);
  });
});
