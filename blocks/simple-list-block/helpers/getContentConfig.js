const getContentConfig = (propsObject) => {
  if ('customFields' in propsObject) {
    const { customFields } = propsObject;

    if ('listContentConfig' in customFields) {
      const { listContentConfig } = customFields;
      if ('contentService' in listContentConfig) {
        const { contentService, contentConfigValues } = listContentConfig;
        return {
          contentService, contentConfigValues,
        };
      }
    }
  }

  return {
    contentService: '',
    contentConfigValues: {},
  };
};

export default getContentConfig;
