import React from "react";

import { Divider as DividerComponent } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-divider";

const Divider = () => <DividerComponent className={`${BLOCK_CLASS_NAME}`} assistiveHidden />;

Divider.label = "Divider – Arc Block";

Divider.icon = "layout-headline";

export default Divider;
