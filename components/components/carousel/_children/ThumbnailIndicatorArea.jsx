import { Children, useEffect } from "react";
import PropTypes from "prop-types";

const BLOCK_CLASS_NAME = "c-carousel";

const ThumbnailIndicatorArea = ({ children, currentSlideNumber, goToSlide, goToSlidePhrase }) => {
	useEffect(() => {
		const indicator = document.querySelector(`.${BLOCK_CLASS_NAME}__indicator-thumbnail--active`);

		if (indicator) {
			indicator.scrollIntoView();
		}
	}, [currentSlideNumber]);

	return (
		<div className={`${BLOCK_CLASS_NAME}__indicator-thumbnails-container`}>
			{Children.map(children, (child, index) => (
				<button
					aria-label={goToSlidePhrase(index + 1)}
					key={child.key}
					type="button"
					onClick={() => goToSlide(index + 1)}
					className={[
						`${BLOCK_CLASS_NAME}__indicator-thumbnail`,
						index === currentSlideNumber - 1
							? `${BLOCK_CLASS_NAME}__indicator-thumbnail--active`
							: "",
					]
						.filter((potentiallyTruthyString) => potentiallyTruthyString)
						.join(" ")}
				>
					{child}
				</button>
			))}
		</div>
	);
};

ThumbnailIndicatorArea.propTypes = {
	/** The children of the component */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	/** The current slide number */
	currentSlideNumber: PropTypes.number.isRequired,
	/** Function to go to a slide */
	goToSlide: PropTypes.func.isRequired,
	/** Internationalization function for handling indicator aria-labels  */
	goToSlidePhrase: PropTypes.func.isRequired,
};

export default ThumbnailIndicatorArea;
