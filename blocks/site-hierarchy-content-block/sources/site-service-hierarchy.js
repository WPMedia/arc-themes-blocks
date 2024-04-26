export default {
    resolve(resolveParams) {
        const { hierarchy, sectionId, "arc-site": arcSite } = resolveParams;
        return `/site/v3/navigation/${arcSite}?${hierarchy ? `hierarchy=${hierarchy}` : ""}${
            sectionId ? `&_id=${sectionId}` : ""
        }`;
    },
    schemaName: "navigation-hierarchy",
    params: {
        hierarchy: "text",
        sectionId: "text",
    },
    transform: (data, query) => {
        if (query?.sectionId === data._id) {
            return data;
        }
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
    },
};
