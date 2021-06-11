import PropTypes from 'prop-types';

const TextOutputType = (props) => props.children;

TextOutputType.contentType = 'text/plain';
TextOutputType.fallback = false;

TextOutputType.propTypes = {
  children: PropTypes.node,
};

export default TextOutputType;
