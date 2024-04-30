import React, { useEffect, useState, useCallback } from "react";

import PropTypes from "@arc-fusion/prop-types";
import { useIdentity, useSales } from "@wpmedia/arc-themes-components";
import SubscriptionProfileManagementList from "./children/SubscriptionProfileManagementList";

const BLOCK_CLASS_NAME = "b-subscriptions";

const SubscriptionProfileManagement = ({ customFields }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions ] = useState([]);

	const { Identity } = useIdentity();
  const { Sales } = useSales();

  useEffect(() => {
		const checkIsLoggedIn = async () => {
			setIsLoggedIn(await Identity.isLoggedIn());
		};

		checkIsLoggedIn();
	}, [Identity]);

  const fetchSubs = useCallback(async () => {
    if(isLoggedIn) {

      const subs = await Sales?.getAllSubscriptions();

      return Promise.all(subs?.map((sub => Sales?.getSubscriptionDetails(sub?.subscriptionID))))
        .then(response => setSubscriptions(response))
        // eslint-disable-next-line
        .catch(e => console.error(e))
    }
    return null;
  }, [Sales, isLoggedIn])

  useEffect(() => {
    fetchSubs();
  }, [isLoggedIn, fetchSubs])

	return (
		<section className={BLOCK_CLASS_NAME}>
      <SubscriptionProfileManagementList fetchSubs={fetchSubs} subscriptions={subscriptions} className={`${BLOCK_CLASS_NAME}__subscription-list`} customFields={customFields}/>
		</section>
	);
};
SubscriptionProfileManagement.propTypes = {
	customFields: PropTypes.shape({
    offerURL: PropTypes.string.tag({
      defaultValue: "/offer/",
      label: "Offer URL",
    }),
		showCancelLink: PropTypes.bool.tag({
			defaultValue: false,
			label: "Show cancel link",
		}),
		showResubscribeLink: PropTypes.bool.tag({
			defaultValue: false,
			label: "Show resubscribe link",
		}),
	}),
};

SubscriptionProfileManagement.label = "Subscriptions Profile Management - Arc Block";
SubscriptionProfileManagement.icon = "shop-cart";

export default SubscriptionProfileManagement;
