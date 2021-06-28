import { footerContentMock } from '../mock-content/footer';
import { smallPromoMock } from '../mock-content/smallPromo';
import { mediumPromoMock } from '../mock-content/mediumPromo';
import { extraLargePromo } from '../mock-content/extraLargePromo';
import { largePromoMock } from '../mock-content/largePromo';
import { simpleListMock } from '../mock-content/simpleList';

const featureMocks = {
	footer: footerContentMock,
	'small-promo': smallPromoMock,
	'medium-promo': mediumPromoMock,
	'large-promo': largePromoMock,
	'extra-large-promo': extraLargePromo,
	'simple-list': simpleListMock,
	'numbered-list': simpleListMock,
}

export const useEditableContent = () => {
	return {
		editableContent: () => {},
		searchableField: () => {},
	}
};

export const useContent = ({ query }) => {
	if (!query) {
		return {};
	}

	if (featureMocks[query.feature]) {
		return featureMocks[query.feature];
	}

	if (query.raw_image_url === 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG' ) {
		return {
			'274x154': 'LBTiSxaxr1Eo-tEz9BKFCnZNArw=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'274x183': 'Z3YDeb5U67phnWn-jjZ1D3raqLg=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'274x206': 'bg-hZozUyDasSC82dzGY6h7OzQE=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x212': 'Cs3j2blNOos8oV4gL9mNQQGcVOo=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x251': 'YoPu3mRVQwa3LClZJb0auXux-Fc=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x283': 'DIOvLGCX55M5sj_OH0IcRNvugP4=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			"400x225":"0h3vL_qyc8pjZN_cnwYgHECxICA=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"400x267":"SBSiikbg6B9BLxiEqnZhBDbOelY=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"400x300":"4oA14YOFAWISqfWe7GayPCW-l9k=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"600x400":"IYlSHyCyebwHaotJBuhSSiykktg=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"600x450":"pmSxIhr_2yF6wtOJyOkbEaphdok=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"800x450":"VD7LAiaSV3kPnNUuP36bbTT2S0Y=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"800x533":"4dhmPhU2HvAd69Kkkj0rcfE41mw=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/",
			"800x600":"6fqhqLAchOq1gB_xNn2lGb-WHmk=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/"
		}
	}
	return {}
};
