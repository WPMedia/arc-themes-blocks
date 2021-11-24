import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

function AccountManagement({ customFields }) {
  const { redirectURL } = customFields;

  // get properties from context for using translations in intl.json
  // See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
  const { arcSite } = useFusionContext();
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  // if logged in redirect to the url provided in customFields
  console.log(redirectURL, 'redirect url');

  return (
    <h1>
      {phrases.t('account-management-block.account-information')}
    </h1>
  );
}

AccountManagement.label = 'Account Management - Profile';

AccountManagement.icon = 'monitor-use';

AccountManagement.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/login/',
    }),
  }),
};

export default AccountManagement;
