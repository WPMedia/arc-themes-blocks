import React, { createRef, useCallback, useEffect, useReducer, useState } from "react";
import { Button, Stack } from "@wpmedia/arc-themes-components";
import Divider from "@wpmedia/arc-themes-components/src/components/divider";
import { useContent } from "fusion:content";

import ResultItem from "./result-item";
import { reduceResultList } from "./helpers";

const BLOCK_CLASS_NAME = "b-results-list";

const Results = ({
	arcSite,
	configuredOffset,
	configuredSize,
	contentConfigValues,
	contentService,
	imageProperties,
	isServerSideLazy = false,
	phrases,
	showByline = false,
	showDate = false,
	showDescription = false,
	showHeadline = false,
	showImage = false,
	showItemOverline = false,
	targetFallbackImage,
}) => {
	const [queryOffset, setQueryOffset] = useState(configuredOffset);

	const placeholderResizedImageOptions = useContent({
		source: !targetFallbackImage.includes("/resources/") ? "resize-image-api" : null,
		query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
	});

	const serviceQueryPage = useCallback(
		(requestedOffset) => {
			/*
      This sets up a window view of the data starting from the initial index
      to *twice* the size.  When clicking on the more button, we will render
      the next size worth of items and load the next size from the server.
    */
			const size = requestedOffset === configuredOffset ? configuredSize * 2 : configuredSize;
			const offset =
				requestedOffset === configuredOffset ? configuredOffset : requestedOffset + configuredSize;
			switch (contentService) {
				case "story-feed-author":
				case "story-feed-sections":
				case "story-feed-tag": {
					return { feedOffset: offset, feedSize: size };
				}
				case "content-api-collections": {
					return { from: offset, size: configuredSize, getNext: true };
				}
				default: {
					break;
				}
			}
			return { offset, size };
		},
		[configuredOffset, configuredSize, contentService]
	);

	const requestedResultList = useContent({
		source: isServerSideLazy ? null : contentService,
		query: {
			...contentConfigValues,
			feature: "results-list",
			...serviceQueryPage(queryOffset),
		},
		filter: `{
      count
      next
      content_elements {
        _id,
        type
        display_date
        credits {
          by {
            _id
            name
            url
            type
            additional_properties {
              original {
                byline
              }
            }
          }
        }
        headlines {
          basic
        }
        label {
          basic {
            display
            url
            text
          }
        }
        owner {
          sponsored
        }
        description {
          basic
        }
        promo_items {
          basic {
			_id
            auth
            type
            url
          }
          lead_art {
            promo_items {
              basic {
				_id
				auth
                type
                url
              }
            }
            type
          }
        }
        websites {
          ${arcSite} {
            website_url
            website_section {
              _id
              name
            }
          }
        }
      }
    }`,
	});

	const [resultList, alterResultList] = useReducer(reduceResultList, requestedResultList);

	useEffect(() => {
		if (requestedResultList) {
			alterResultList({
				type: "appendUnique",
				data: requestedResultList,
			});
		}
	}, [requestedResultList]);

	const [elementRefs, setElementRefs] = useState([]);
	const [focalElement, setFocalElement] = useState(null);
	useEffect(() => {
		setElementRefs((existingRefs) => {
			const refArray = existingRefs.concat(
				requestedResultList?.content_elements
					? requestedResultList.content_elements.map(() => createRef())
					: []
			);
			if (queryOffset !== configuredOffset) {
				// ignore the first item for focus purposes
				const topItem = queryOffset - configuredOffset;
				setFocalElement(refArray[topItem]);
			}
			return refArray;
		});
	}, [configuredOffset, queryOffset, requestedResultList]);

	useEffect(() => {
		if (focalElement?.current) {
			const focusLink = focalElement.current.querySelector("a:not([aria-hidden])");
			if (focusLink) {
				focusLink.focus();
			}
		}
	}, [focalElement]);

	const viewableElements = resultList?.content_elements.slice(
		0,
		queryOffset + configuredSize - configuredOffset
	);
	const fullListLength = resultList?.count
		? resultList?.count - configuredOffset
		: resultList?.content_elements.length;

	const isThereMore = requestedResultList?.next || viewableElements?.length < fullListLength;

	const onReadMoreClick = useCallback(() => {
		setQueryOffset((oldOffset) => oldOffset + configuredSize);
	}, [configuredSize, setQueryOffset]);
	return viewableElements?.length > 0 && !isServerSideLazy ? (
		<Stack>
			{viewableElements.map((element, index) => (
				<Stack
					gap="1rem"
					className={`${BLOCK_CLASS_NAME}__${index === 0 ? "container--first" : "container"}`}
				>
					<ResultItem
						key={`result-card-${element._id}`}
						ref={elementRefs[index]}
						arcSite={arcSite}
						element={element}
						imageProperties={imageProperties}
						placeholderResizedImageOptions={placeholderResizedImageOptions}
						showByline={showByline}
						showDate={showDate}
						showDescription={showDescription}
						showHeadline={showHeadline}
						showImage={showImage}
						showItemOverline={showItemOverline}
						targetFallbackImage={targetFallbackImage}
					/>
					<Divider />
				</Stack>
			))}
			{isThereMore && (
				<Stack alignment="center" className={`${BLOCK_CLASS_NAME}__see-more`}>
					<Button
						accessibilityLabel={phrases.t("global.see-more-button-aria-label")}
						variant="primary"
						onClick={onReadMoreClick}
					>
						{phrases.t("global.see-more-button")}
					</Button>
				</Stack>
			)}
		</Stack>
	) : null;
};

export default Results;
