import React from "react";
import AskTheNews from "./features/ask-the-news/default";

export default {
  title: "Blocks/Ask The News",
  parameters: {
    chromatic: { viewports: [320, 1200] },
  },
};

export const Default = () => <AskTheNews />;

export const StreamingEnabled = () => (
  <AskTheNews customFields={{ enableStreaming: true }} />
);

export const StreamingDisabled = () => (
  <AskTheNews customFields={{ enableStreaming: false }} />
);
