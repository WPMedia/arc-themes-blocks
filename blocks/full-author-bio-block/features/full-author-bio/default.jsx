import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Envelope from './images/envelope';
import Twitter from './images/twitter';
import Facebook from './images/facebook';
import Instagram from './images/instagram';
import Rss from './images/rss';
import './full-author-bio.scss';

const StyledAuthorContent = styled.div`
  font-family: ${props => props.primaryFont};
  .author-name {
    font-family: ${props => props.primaryFont};
  }
  .author-title {
    font-family: ${props => props.primaryFont};
  }
  .author-bio {
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

const FullAuthorBio = () => {
  const { globalContent: mock, arcSite } = useFusionContext();
  // const mock = {
  //   authors: [
  //     {
  //       _id: 'saracarothers',
  //       firstName: 'Sara',
  //       lastName: 'Carothers',
  //       secondLastName: '',
  //       byline: 'Sara Lynn Carothers',
  //       role: 'Senior Product Manager',
  //       image: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
  //       email: '',
  //       affiliations: '',
  //       education: [],
  //       awards: [],
  //       books: [],
  //       podcasts: [],
  //       twitter: 'https://twitter.com/sLcarothers',
  //       bio_page: '/author/sara-carothers/',
  //       bio: 'Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ',
  //       longBio: 'Sara Carothers is a senior product manager for Arc Publishing. She works on Arc Themes and PageBuilder Fusion. This is a long bio. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n',
  //       slug: 'sara-carothers',
  //       instagram: 'https://www.instagram.com/scarothers/',
  //       native_app_rendering: false,
  //       fuzzy_match: false,
  //       contributor: false,
  //       status: true,
  //       last_updated_date: '2019-11-22T23:15:45.348Z',
  //       type: 'author',
  //     },
  //   ],
  //   last: 'c2FyYWNhcm90aGVycw==',
  //   more: false,
  //   _id: 'aea0c7ea37263d5d663cbb6844a506d39dfb7e02a76ab932d6e740c4e2807906',
  // };

  const socials = [];

  Object.keys(mock.authors[0]).forEach((item) => {
    if ((item === 'facebook'
      || item === 'instagram'
      || item === 'email'
      || item === 'rss'
    ) && item.length > 0) {
      socials.push(item);
    }
  });

  return (
    !!(
      mock.authors[0]
      && mock.authors[0].byline
      && mock.authors[0].role
      && (mock.authors[0].bio || mock.authors[0].longBio)
      && mock.authors[0].image
    ) && (
      <>
        <div className="image-container">
          <img
            src={mock.authors[0].image}
            className="author-image"
            alt="Author photo"
          />
        </div>
        <div>
          <StyledAuthorContent
            className="author-content"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
          >
            <h1 className="author-name">{mock.authors[0].byline}</h1>
            <h4 className="author-title">{mock.authors[0].role}</h4>
            <p className="author-bio">
              {mock.authors[0].longBio || mock.authors[0].bio}
            </p>
          </StyledAuthorContent>
        </div>

        <div className="social-container">
          <div className="social-items">
            <p className="social-column"><b>Connect</b></p>
            {
              socials.map(item => (
                <a
                  className="social-column"
                  href={
                    (item === 'email')
                      ? `mailto:${mock.authors[0][item]}`
                      : mock.authors[0][item]
                  }
                >
                  {logos[item]}
                </a>
              ))
            }
          </div>
        </div>
      </>
    )
  );
};

export default FullAuthorBio;
