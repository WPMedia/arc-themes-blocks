import React from "react";
import { useAppContext } from "fusion:context";
import SectionTitle from "./section-title";

const GlobalContentSectionTitle = () => {
	const { globalContent = {} } = useAppContext();

	return <SectionTitle content={globalContent} />;
};

export default GlobalContentSectionTitle;
