import { footerContentMock } from '../mock-content/footer';

export const useEditableContent = () => {
	return {
		editableContent: () => {},
	}
};

export const useContent = ({ query }) => {
  if ( query.feature === 'footer' ) {
    return footerContentMock;
  }
	return {}
};
