/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-typos */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import PropTypes from 'prop-types';
import './articlebody.scss';
import Body from './render';

@Consumer
class ArticleBody extends Component {
  render() {
    const { globalContent: content, customFields, arcSite } = this.props;
    return (
      <Body
        data={content}
        params={customFields}
        correctionTitle={getThemeStyle(arcSite).correctionTitle}
      />
    );
  }
}

ArticleBody.propTypes = {
  customFields: PropTypes.shape({
    inheritGlobalContent: PropTypes.boolean,
  }),
};

export default ArticleBody;
