/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-typos */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
import './articlebody.scss';
import Body from './render';

@Consumer
class ArticleBody extends Component {
  render() {
    const { globalContent: content, customFields } = this.props;
    return (
      <Body data={content} params={customFields} />
    );
  }
}

ArticleBody.propTypes = {
  customFields: PropTypes.shape({
    inheritGlobalContent: PropTypes.boolean,
  }),
};

export default ArticleBody;
