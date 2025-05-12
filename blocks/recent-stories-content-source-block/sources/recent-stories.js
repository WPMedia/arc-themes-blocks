import axios from "axios";
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from "fusion:environment";
import signImagesInANSObject from "@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object";
import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import { fetch as resizerFetch } from "@wpmedia/signing-service-content-source-block";

const params = [
  {
    displayName: "Number of Days",
    name: "days",
    type: "number",
    defaultValue: 7,
  },
  {
    displayName: "feedOffset",
    name: "feedOffset",
    type: "number",
  },
  {
    displayName: "feedSize",
    name: "feedSize",
    type: "number",
  },
  {
    default: "2",
    displayName: "Themes Version",
    name: "themes",
    type: "text",
  },
];

const fetch = (
  { days = 7, feedOffset: from = 0, feedSize: size = 10, "arc-site": website },
  { cachedCall }
) => {
  // Calculate the date X days ago
  const date = new Date();
  date.setDate(date.getDate() - days);
  const dateString = date.toISOString().split('T')[0];

  const urlSearch = new URLSearchParams({
    from,
    q: `display_date:>${dateString}`,
    sort: "display_date:desc",
    size,
    website,
  });

  return axios({
    url: `${CONTENT_BASE}/content/v4/search/published?${urlSearch.toString()}`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: "GET",
  })
    .then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(handleFetchError);
};

export default {
  fetch,
  params,
  schemaName: "ans-feed",
}; 