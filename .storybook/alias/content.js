import { footerContentMock } from '../mock-content/footer';
import { smallPromoMock } from '../mock-content/smallPromo';
import { mediumPromoMock } from '../mock-content/mediumPromo';
import { extraLargePromo } from '../mock-content/extraLargePromo';
import { largePromoMock } from '../mock-content/largePromo';

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
	if ( query.feature === 'footer' ) {
		return footerContentMock;
	}
	if ( query.feature === 'small-promo' ) {
		return smallPromoMock;
	}
	if ( query.feature === 'medium-promo' ) {
		return mediumPromoMock;
	}

  if (query.feature === 'large-promo') {
    return largePromoMock;
  }
  
	if (query.feature === 'extra-large-promo') {
		return extraLargePromo;
	}

	if (query.raw_image_url === 'https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG' ) {
		return {
			'274x154': 'LBTiSxaxr1Eo-tEz9BKFCnZNArw=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'274x183': 'Z3YDeb5U67phnWn-jjZ1D3raqLg=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'274x206': 'bg-hZozUyDasSC82dzGY6h7OzQE=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x212': 'Cs3j2blNOos8oV4gL9mNQQGcVOo=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x251': 'YoPu3mRVQwa3LClZJb0auXux-Fc=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
			'377x283': 'DIOvLGCX55M5sj_OH0IcRNvugP4=filters:format(jpg):quality(70):focal(4335x1885:4345x1895)/',
		}
	}
	return {}
};
