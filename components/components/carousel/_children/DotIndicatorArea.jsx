import PropTypes from "prop-types";

const BLOCK_CLASS_NAME = "c-carousel";

const DotIndicatorArea = ({ currentSlideNumber, goToSlide, goToSlidePhrase, totalSlideNumber }) => (
	<div className={`${BLOCK_CLASS_NAME}__indicator-dots-container`}>
		{Array.from({ length: totalSlideNumber }, (_unusedValue, index) => (
			<button
				aria-label={goToSlidePhrase(index + 1)}
				key={`carousel-indicator-dot-${index}`}
				type="button"
				onClick={() => goToSlide(index + 1)}
				className={[
					`${BLOCK_CLASS_NAME}__indicator-dot`,
					index === currentSlideNumber - 1 ? `${BLOCK_CLASS_NAME}__indicator-dot--active` : "",
				]
					.filter((potentiallyTruthyString) => potentiallyTruthyString)
					.join(" ")}
			/>
		))}
	</div>
);

DotIndicatorArea.propTypes = {
	/** The current slide number */
	currentSlideNumber: PropTypes.number.isRequired,
	/** Function to go to a slide */
	goToSlide: PropTypes.func.isRequired,
	/** Internationalization function for handling indicator aria-labels  */
	goToSlidePhrase: PropTypes.func.isRequired,
	/** The total number of slides */
	totalSlideNumber: PropTypes.number.isRequired,
};

export default DotIndicatorArea;
