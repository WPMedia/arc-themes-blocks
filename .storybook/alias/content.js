import { extraLargePromo } from '../mock-content/extraLargePromo';
import { footerContentMock } from '../mock-content/footer';
import { largePromoMock } from '../mock-content/largePromo';
import { linksBarMock } from '../mock-content/linksBar';
import { mediumPromoMock } from '../mock-content/mediumPromo';
import { resultsList } from '../mock-content/resultsList';
import { simpleListMock } from '../mock-content/simpleList';
import { smallPromoMock } from '../mock-content/smallPromo';
import { topTableListMock } from '../mock-content/topTableList';

const featureMocks = {
  footer: footerContentMock,
  'small-promo': smallPromoMock,
  'medium-promo': mediumPromoMock,
  'large-promo': largePromoMock,
  'extra-large-promo': extraLargePromo,
  'simple-list': simpleListMock,
  'numbered-list': simpleListMock,
  'card-list': simpleListMock,
  'links-bar': linksBarMock,
  'results-list': resultsList,
  'top-table-list': topTableListMock,
};

export const useEditableContent = () => ({
  editableContent: () => {},
  searchableField: () => {},
});

export const useContent = ({ query }) => {
  if (!query) {
    return {};
  }

  if (query.noData) {
    return {};
  }

  if (featureMocks[query.feature]) {
    if (typeof featureMocks[query.feature] === 'function') {
      return featureMocks[query.feature](query);
    }
    return featureMocks[query.feature];
  }

  if (query.raw_image_url === 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG') {
    return {
      '274x154': 'LBTiSxaxr1Eo-tEz9BKFCnZNArw=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '274x183': 'Z3YDeb5U67phnWn-jjZ1D3raqLg=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '274x206': 'bg-hZozUyDasSC82dzGY6h7OzQE=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '377x212': 'Cs3j2blNOos8oV4gL9mNQQGcVOo=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '377x251': 'YoPu3mRVQwa3LClZJb0auXux-Fc=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '377x283': 'DIOvLGCX55M5sj_OH0IcRNvugP4=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '400x225': '0h3vL_qyc8pjZN_cnwYgHECxICA=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '400x267': 'SBSiikbg6B9BLxiEqnZhBDbOelY=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '400x300': '4oA14YOFAWISqfWe7GayPCW-l9k=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '600x400': 'IYlSHyCyebwHaotJBuhSSiykktg=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '600x450': 'pmSxIhr_2yF6wtOJyOkbEaphdok=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '800x450': 'VD7LAiaSV3kPnNUuP36bbTT2S0Y=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '800x533': '4dhmPhU2HvAd69Kkkj0rcfE41mw=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
      '800x600': '6fqhqLAchOq1gB_xNn2lGb-WHmk=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
    };
  }

  if (query.raw_image_url === 'https://arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png') {
    return {
      '84x56': 'b5wfZSSCrPhbJrORnvG5FXMoDr4=/fit-in/84x56/filters:quality(70):fill(white):background_color(white)/',
      '105x70': 'e6iZtVfaJOxIs342PGXoM-Y5Nu4=/fit-in/105x70/filters:quality(70):fill(white):background_color(white)/',
      '158x105': 'ciIbzGLGGntlmMxW-OXZ_OFsQfs=/fit-in/158x105/filters:quality(70):fill(white):background_color(white)/',
      '274x183': '74FUDjj5P9QGqVekHa1JSdaSU1M=/fit-in/274x183/filters:quality(70):fill(white):background_color(white)/',
      '377x251': 'CTkC4Qg7ArqcadymT-6hF6kpQcQ=/fit-in/377x251/filters:quality(70):fill(white):background_color(white)/',
      '400x267': 'hBPl4S4C9ngZRqmRAJ-Op0njTlo=/fit-in/400x267/filters:quality(70):fill(white):background_color(white)/',
      '600x400': 'm617pE8A870PD_Ceg3c8lLzsMY8=/fit-in/600x400/filters:quality(70):fill(white):background_color(white)/',
      '768x512': '42Gq8nwJdwiwDGEjvXIRosQPvKM=/fit-in/768x512/filters:quality(70):fill(white):background_color(white)/',
      '800x533': '7-ZUOzJOw3UKHN0nCjkYUWYMMhg=/fit-in/800x533/filters:quality(70):fill(white):background_color(white)/',
      '1024x683': 'zxZMYm5rP9oYWRMp7xg_cjqLssM=/fit-in/1024x683/filters:quality(70):fill(white):background_color(white)/',
      '1440x960': 'lM113UEvbUcBQmfUxaxjjvymfL8=/fit-in/1440x960/filters:quality(70):fill(white):background_color(white)/',
      '1600x1067': 'BP4BtQEHW2PIahEZ0Iha-zIXoFY=/fit-in/1600x1067/filters:quality(70):fill(white):background_color(white)/',
      '84x63': 'CD5KPCY_fwSMCI_xytqY_GFeXO0=/fit-in/84x63/filters:quality(70):fill(white):background_color(white)/',
      '105x79': 'MRwmeksbWfCFE523W0vmz2Lvumo=/fit-in/105x79/filters:quality(70):fill(white):background_color(white)/',
      '158x119': '_r5tCmSEITOO3NTJLBkot61mzBA=/fit-in/158x119/filters:quality(70):fill(white):background_color(white)/',
      '274x206': 'NL8g53815dsUhgTS3jXC7rdAt4U=/fit-in/274x206/filters:quality(70):fill(white):background_color(white)/',
      '377x283': '0u2mo8HtMOnqPnQPtxKoxRqfE04=/fit-in/377x283/filters:quality(70):fill(white):background_color(white)/',
      '400x300': 'Gcq-GY6hHc7VbCX4ZY8PBuqVjF4=/fit-in/400x300/filters:quality(70):fill(white):background_color(white)/',
      '600x450': '09o5mViAlwuxUTgL6vkoXkCfchE=/fit-in/600x450/filters:quality(70):fill(white):background_color(white)/',
      '768x576': 'ji27jOy0l-Kaj5T654LhgVRXWpw=/fit-in/768x576/filters:quality(70):fill(white):background_color(white)/',
      '800x600': 'r2VBjzND5c-k4G6JEpzyYpGHngs=/fit-in/800x600/filters:quality(70):fill(white):background_color(white)/',
      '1024x768': 'dLGtbpAl3oNYQ29b8b8vIIW8USg=/fit-in/1024x768/filters:quality(70):fill(white):background_color(white)/',
      '1440x1080': 'yeoeeTujSHwDjTerpiwXiZziqyg=/fit-in/1440x1080/filters:quality(70):fill(white):background_color(white)/',
      '1600x1200': '7PiVpqa_FxTcR0Yj_aLC7WpnjzQ=/fit-in/1600x1200/filters:quality(70):fill(white):background_color(white)/',
      '84x0': 'ypPWGXyZQIfvus8XpYlHcz9s-2M=/fit-in/84x0/filters:quality(70):fill(white):background_color(white)/',
      '105x0': 'OzGNyBo2WPsnUeAg11pcLYsNN7w=/fit-in/105x0/filters:quality(70):fill(white):background_color(white)/',
      '158x0': 'qdxfL8Ms-GjEXSvEPFrR0MMJVfI=/fit-in/158x0/filters:quality(70):fill(white):background_color(white)/',
      '274x0': '7lwbXw39fsb7SslOOiUxu1ly4gc=/fit-in/274x0/filters:quality(70):fill(white):background_color(white)/',
      '377x0': 'akEakgCNST0luHQSfxw9JFGhTI4=/fit-in/377x0/filters:quality(70):fill(white):background_color(white)/',
      '400x0': 'v5yK4OiOsizjnS5QUES6os7edxU=/fit-in/400x0/filters:quality(70):fill(white):background_color(white)/',
      '600x0': 'OiKZ9gjSp-91zxKMjn6d7I9Xn0Q=/fit-in/600x0/filters:quality(70):fill(white):background_color(white)/',
      '768x0': 'EzouokEblmG43adARCILjk7ioSg=/fit-in/768x0/filters:quality(70):fill(white):background_color(white)/',
      '800x0': 'XuPV6Xyq1DZfouUYaTClp4KtmVk=/fit-in/800x0/filters:quality(70):fill(white):background_color(white)/',
      '1024x0': '-i8cZWpmS7BVf7n-tGixdIhRdPc=/fit-in/1024x0/filters:quality(70):fill(white):background_color(white)/',
      '1440x0': '9dzRorTa9AFZvec138wzfAzZnOs=/fit-in/1440x0/filters:quality(70):fill(white):background_color(white)/',
      '1600x0': 'ILJn0fFa7NIsStekj_TtlBCSvBU=/fit-in/1600x0/filters:quality(70):fill(white):background_color(white)/',
      '84x47': 'Gw1ATz6cGk1Op8Yjnb9XBfe-10U=/fit-in/84x47/filters:quality(70):fill(white):background_color(white)/',
      '105x59': 'ElJJzRWq1ZB82l4keqayBsGhOhM=/fit-in/105x59/filters:quality(70):fill(white):background_color(white)/',
      '158x89': 'r7SMPMvoPdoraJUSo3Jqo1mhUlY=/fit-in/158x89/filters:quality(70):fill(white):background_color(white)/',
      '274x154': 'DdErna-7pp6myk9CrCpHdgiGQrA=/fit-in/274x154/filters:quality(70):fill(white):background_color(white)/',
      '377x212': '8TDhSLyZg_kUCihvynOQi06pYzg=/fit-in/377x212/filters:quality(70):fill(white):background_color(white)/',
      '400x225': '-pXO6s24r9KmlC-6siXm4uzrKxg=/fit-in/400x225/filters:quality(70):fill(white):background_color(white)/',
      '600x338': '-GfTnJijLXqUVhdTdiyE9l0_yeI=/fit-in/600x338/filters:quality(70):fill(white):background_color(white)/',
      '768x432': 'vMR3AlfbO_ZZ2FuJYh18eHD7LQM=/fit-in/768x432/filters:quality(70):fill(white):background_color(white)/',
      '800x450': 'TJxjOo89SZxFXQZwqRbmk1W62po=/fit-in/800x450/filters:quality(70):fill(white):background_color(white)/',
      '1024x576': 'srrkeFOCj6KdudRPul8F6l4vFqs=/fit-in/1024x576/filters:quality(70):fill(white):background_color(white)/',
      '1440x810': 'xjFGAhcROAHGIJjQF0-VXGgP5UA=/fit-in/1440x810/filters:quality(70):fill(white):background_color(white)/',
      '1600x900': '_1NLnVpYWGV_sSMu4bNaPViOM-Y=/fit-in/1600x900/filters:quality(70):fill(white):background_color(white)/',
      '84x84': 'g9s6e6Xg5fUugoCvSi6ozD9U4RA=/fit-in/84x84/filters:quality(70):fill(white):background_color(white)/',
      '105x105': 'irmzJqlUTrRGDvY2bMfhcx_5Ahc=/fit-in/105x105/filters:quality(70):fill(white):background_color(white)/',
      '158x158': 'vMMvyypjSX4SntqGzufNzKSlll4=/fit-in/158x158/filters:quality(70):fill(white):background_color(white)/',
      '274x274': 'MDrtZOPpTHNfaBvyvUpoDRp_Pmw=/fit-in/274x274/filters:quality(70):fill(white):background_color(white)/',
      '377x377': 'ievAZC23UVlp0pDO9i_vYd4Mzns=/fit-in/377x377/filters:quality(70):fill(white):background_color(white)/',
      '400x400': '9PtxKndKHARFk6D0ynV-eeWSyow=/fit-in/400x400/filters:quality(70):fill(white):background_color(white)/',
      '600x600': 'rxxPemZQ3CI0OrPBoSnSHQKPhpA=/fit-in/600x600/filters:quality(70):fill(white):background_color(white)/',
      '768x768': 'Exeh9lKLfeQ8EY8BFF6MAIWw8f4=/fit-in/768x768/filters:quality(70):fill(white):background_color(white)/',
      '800x800': 'xzLASjSBuaDaTlfQfKRfNx_TXtQ=/fit-in/800x800/filters:quality(70):fill(white):background_color(white)/',
      '1024x1024': 'RkTnuW6j5K7QDCOkBuXOQNxF0zM=/fit-in/1024x1024/filters:quality(70):fill(white):background_color(white)/',
      '1440x1440': 'C01cML7mEmfmz3nF_uKCcmQAsdo=/fit-in/1440x1440/filters:quality(70):fill(white):background_color(white)/',
      '1600x1600': 'CQcCSFygCQqghFAVoFOYMGePDKg=/fit-in/1600x1600/filters:quality(70):fill(white):background_color(white)/',
    };
  }
  return {};
};
