const extract = (key) => (item) => item[key];

const formatCredits = (credits) => {
	const creators = credits?.by?.map(extract("name")).join(", ") || false;
	const affiliations = credits?.affiliation?.map(extract("name")).join(", ") || false;

	return creators || affiliations ? `(${[creators, affiliations].filter(Boolean).join("/")})` : "";
};

export default formatCredits;
