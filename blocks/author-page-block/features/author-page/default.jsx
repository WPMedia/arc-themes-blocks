import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Envelope from './images/envelope';
import Twitter from './images/twitter';
import Facebook from './images/facebook';
import Instagram from './images/instagram';
import Rss from './images/rss';
import './author-page.scss';

const StyledAuthorContent = styled.div`
  font-family: ${props => props.primaryFont};
  .author-name {
    font-family: ${props => props.primaryFont};
  }
  .author-title {
    font-family: ${props => props.primaryFont};
  }
`;

const logos = {
  email: <Envelope title="Email" alt="email" />,
  twitter: <Twitter title="Follow on Twitter" alt="twitter" />,
  facebook: <Facebook title="Connect on Facebook" alt="facebook" />,
  instagram: <Instagram title="Follow on Facebook" alt="instagram" />,
  rss: <Rss title="RSS feed" alt="rss" />,
};

const links = {
  twitter: 'https://www.twitter.com',
  facebook: 'https://www.facebook.com',
};

const AuthorPage = () => {
  const { globalContent: content, arcSite } = useFusionContext();
  const temp = true;
  const icons = Object.keys(logos);
  return (
    !!(
      temp
    ) && (
      <>
        <div className="image-container">
          <img
            src="https://via.placeholder.com/250"
            className="image"
            alt="Author image"
          />
        </div>
        <div>
          <StyledAuthorContent
            className="content"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
          >
            <h1 className="author-name">Author Name</h1>
            <h4 className="author-title">Author Title</h4>
            <p className="author-bio">
              {'Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'}
            </p>
          </StyledAuthorContent>
        </div>

        <div className="social-container">
          <div className="social">
            <p className="social-column"><b>Connect</b></p>
            {
              icons.map(logo => (
                <a
                  className="social-column"
                  href={links[logo]}
                >
                  {logos[logo]}
                </a>
              ))
            }
          </div>
        </div>
      </>
    )
  );
};

export default AuthorPage;
