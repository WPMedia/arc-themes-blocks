import React from 'react';
// import PropTypes from 'prop-types';
// import { useFusionContext } from 'fusion:context';

import {
  Overline, DateComponent, Grid, GridItem, Heading, Stack, Paragraph,
} from '@wpmedia/theme-components';

const POCList = () => (
  <Stack className="b-list">
    <Heading>List Block Title</Heading>

    <Grid className="b-list-item">
      <GridItem columns="span 6">
        <img src="https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG" alt="" />
      </GridItem>
      <GridItem columns="span 6">
        <Stack>
          <Overline>News</Overline>
          <Heading>In Albania, age-old traditions and Mediterranean beaches on the cheap</Heading>
          <Paragraph text="Let's get him. That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink." />
          <DateComponent date={new Date().toGMTString()} />
        </Stack>
      </GridItem>
    </Grid>

    <Grid className="b-list-item">
      <GridItem columns="span 6">
        <img src="https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/resizer/bxyzP5k6X1SlPFU52RAqDpsIjC0=/400x225/filters:format(jpg):quality(70):focal(4490x120:4500x130)/cloudfront-us-east-1.images.arcpublishing.com/corecomponents/OF7ZQ6IECJFRDHXPIFCRWAXMVI.JPG" alt="" />
      </GridItem>
      <GridItem columns="span 6">
        <Stack>
          <Overline text="Sports">Sports</Overline>
          <Heading>On an action-packed Bahamas vacation, off the beach and into high gear</Heading>
          <Paragraph text="Let's get him. That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink." />
          <DateComponent date={new Date().toGMTString()} />
        </Stack>
      </GridItem>
    </Grid>

    <Grid className="b-list-item">
      <GridItem columns="span 6">
        <img src="https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/resizer/ZGMUIqbFmEkXpjH0v1MZ1DjFlf0=/400x225/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/corecomponents/56KEAQ7TZZHITMQB5MIW7F5ELM.png" alt="" />
      </GridItem>
      <GridItem columns="span 6">
        <Stack>
          <Overline text="Business">Business</Overline>
          <Heading>Five affordable destinations for a do-it-yourself wellness vacation</Heading>
          <Paragraph text="Let's get him. That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink." />
          <DateComponent date={new Date().toGMTString()} />
        </Stack>
      </GridItem>
    </Grid>
  </Stack>
);

POCList.label = 'POC List Block – Arc Block';

// POCList.icon = 'programming-language-html';

POCList.propTypes = {};

export default POCList;
