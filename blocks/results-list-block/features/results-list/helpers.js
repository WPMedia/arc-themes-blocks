const resolveDefaultPromoElements = (customFields = {}) => {
  const fields = {
    showHeadline: true,
    showImage: true,
    showDescription: true,
    showByline: true,
    showDate: true,
  };
  const fieldKeys = Object.keys(fields);
  return fieldKeys.reduce((acc, key) => {
    if (typeof customFields[key] === 'undefined') {
      acc[key] = fields[key];
    } else {
      acc[key] = customFields[key];
    }
    return acc;
  }, fields);
};

const fetchStoriesTransform = (data, storedList) => {
  const result = storedList;
  if (data) {
    // Add new data to previous list
    result.content_elements = storedList.content_elements.concat(data.content_elements);
    result.next = data.next;
  }
  return result;
};

export { resolveDefaultPromoElements, fetchStoriesTransform };
