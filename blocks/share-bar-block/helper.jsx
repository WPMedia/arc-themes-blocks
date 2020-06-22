import { select, text } from '@storybook/addon-knobs';

const data = () => ({
  customFields: {
    email: select('Email', [true, false], true),
    facebook: select('Facebook', [true, false], true),
    pinterest: select('Pinterest', [true, false], true),
    twitter: select('Twitter', [true, false], true),
    linkedIn: select('Linkedin', [true, false], true),
  },
  globalContent: {
    label: {
      basic: {
        display: select('Label display', [true, false], true),
        url: text('Label URL', 'http://google.com/'),
        text: text('Label text', 'Overline Text Root'),
      },
    },
  },
});

export default data;
