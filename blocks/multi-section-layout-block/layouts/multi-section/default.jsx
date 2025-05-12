import React from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Grid,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-multi-section-layout";

const MultiSectionLayout = ({ children }) => {
  const [
    header,
    threeColumn,
    fullWidth,
    leftRail,
    main,
    footer
  ] = React.Children.toArray(children);

  return (
    <div className={BLOCK_CLASS_NAME}>
      {/* Header Section - Full Width */}
      {header && (
        <Stack as="header" className={`${BLOCK_CLASS_NAME}__header`}>
          <Stack className={`${BLOCK_CLASS_NAME}__header-content`}>
            {header}
          </Stack>
        </Stack>
      )}

      {/* Three Column Section */}
      {threeColumn && (
        <Stack className={`${BLOCK_CLASS_NAME}__three-column`}>
          <Grid
            columns={3}
            columnGap={20}
          >
            {threeColumn}
          </Grid>
        </Stack>
      )}

      {/* Full Width Section */}
      {fullWidth && (
        <Stack className={`${BLOCK_CLASS_NAME}__full-width`}>
          <Stack className={`${BLOCK_CLASS_NAME}__full-width-content`}>
            {fullWidth}
          </Stack>
        </Stack>
      )}

      {/* Left Rail + Main Content Section */}
      <section role="main" tabIndex="-1" className={`${BLOCK_CLASS_NAME}__content`}>
        {(leftRail || main) && (
          <Grid
            columns={[1, 4]}
            columnGap={20}
          >
            {/* Left Rail */}
            {leftRail && (
              <Stack as="aside" className={`${BLOCK_CLASS_NAME}__left-rail`}>
                {leftRail}
              </Stack>
            )}

            {/* Main Content */}
            {main && (
              <Stack className={`${BLOCK_CLASS_NAME}__main`}>
                {main}
              </Stack>
            )}
          </Grid>
        )}
      </section>

      {/* Footer Section - Full Width */}
      {footer && (
        <Stack as="footer" className={`${BLOCK_CLASS_NAME}__footer`}>
          <Stack className={`${BLOCK_CLASS_NAME}__footer-content`}>
            {footer}
          </Stack>
        </Stack>
      )}
    </div>
  );
};

MultiSectionLayout.propTypes = {
  children: PropTypes.array,
};

MultiSectionLayout.sections = [
  "header",
  "threecolumn",
  "fullwidth",
  "leftrail",
  "main",
  "footer",
];

MultiSectionLayout.label = "Multi Section Layout";

MultiSectionLayout.icon = "arc-layout";

export default MultiSectionLayout; 