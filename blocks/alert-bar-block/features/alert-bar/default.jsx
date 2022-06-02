import React, { Component, createRef, forwardRef } from "react";

import Consumer from "fusion:consumer";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import PropTypes from "@arc-fusion/prop-types";
import { Button, Icon, isServerSide, Link } from "@wpmedia/arc-themes-components";

import { readCookie, saveCookie } from "./cookies";

const BLOCK_CLASS_NAME = "b-alert-bar";

export const AlertBarPresentational = forwardRef(
	({ barAriaLabel, closeAriaLabel, hideAlertHandler, url, linkText }, ref) => (
		<nav aria-label={barAriaLabel} className={BLOCK_CLASS_NAME} ref={ref}>
			<Link href={url}>{linkText}</Link>
			<Button accessibilityLabel={closeAriaLabel} onClick={hideAlertHandler}>
				<Icon name="Close" />
			</Button>
		</nav>
	)
);

@Consumer
class AlertBar extends Component {
	constructor(props) {
		super(props);
		const { arcSite } = this.props;
		const { cached, fetched } = this.getContent({
			sourceName: "alert-bar-collections",
			query: {
				site: arcSite,
				from: 0,
				size: 1,
			},
		});

		this.alertRef = createRef();
		this.phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");

		if (isServerSide()) {
			this.state = {
				content: cached,
				visible: false,
			};
		} else {
			this.cookie = readCookie();
			this.state = {
				content: cached,
				visible: this.checkAlertVisible(cached),
			};
			fetched.then(this.updateContent);
		}
	}

	componentDidMount() {
		const { arcSite } = this.props;
		// The content source will always return an array with one story in it
		this.timeID = window.setInterval(() => {
			const { fetched } = this.getContent({
				sourceName: "alert-bar-collections",
				query: {
					site: arcSite,
					from: 0,
					size: 1,
				},
			});
			fetched.then(this.updateContent);
		}, 120000);
	}

	componentWillUnmount() {
		clearInterval(this.timeID);
	}

	updateContent = (content) => {
		this.cookie = readCookie();
		const isAlertVisible = this.checkAlertVisible(content);
		this.setState({ content, visible: isAlertVisible });
	};

	checkAlertVisible = (content) => {
		const elements = content?.content_elements;
		const hasAlert = elements?.length > 0;
		return hasAlert ? elements?.[0].headlines?.basic !== this.cookie : false;
	};

	hideAlert = () => {
		const { content } = this.state;
		const story = content?.content_elements?.[0]?.headlines?.basic;
		saveCookie(story);
		this.setState({ visible: false });
	};

	render() {
		const { content, visible } = this.state;
		const { arcSite, customFields = {} } = this.props;
		const { ariaLabel } = customFields;
		const article = content?.content_elements?.[0];

		return article && visible ? (
			<AlertBarPresentational
				barAriaLabel={ariaLabel || this.phrases.t("alert-bar-block.element-aria-label")}
				closeAriaLabel={this.phrases.t("alert-bar-block.close-button")}
				hideAlertHandler={this.hideAlert}
				linkText={article?.headlines?.basic}
				ref={this.alertRef}
				url={article?.websites?.[arcSite]?.website_url}
			/>
		) : null;
	}
}

AlertBar.label = "Alert Bar – Arc Block";

AlertBar.icon = "alarm-bell-ring";

AlertBar.propTypes = {
	customFields: PropTypes.shape({
		ariaLabel: PropTypes.string.tag({
			label: "Aria-label",
			defaultValue: "Breaking News Alert",
			description:
				'The label is provided to assistive technologies to provide it with a unique name for the breaking news nav landmark - defaults to "Breaking News Alert" if left blank',
		}),
	}),
};

export default AlertBar;
