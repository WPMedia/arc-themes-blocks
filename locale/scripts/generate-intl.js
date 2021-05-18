/* eslint-disable import/no-dynamic-require */
const { resolve } = require('path');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const fileMappings = {};
const supportedLocales = [];
const defaultLang = 'en';

const localeFiles = glob.sync('./locale/*.json');

localeFiles.forEach((file) => {
  const lang = path.basename(file).split('.json')[0];
  supportedLocales.push(lang);
  fileMappings[lang] = require(resolve(file));
});

// JSON is strucutred with first key being the block name
const blockNames = Object.keys(fileMappings[defaultLang]);

blockNames.forEach((key) => {
  const blockOutputMap = {};
  supportedLocales.forEach((l) => {
    let keys = [];
    if (fileMappings[l][key]) {
      keys = Object.keys(fileMappings[l][key]);
    }
    keys.forEach((item) => {
      if (!blockOutputMap[item]) {
        blockOutputMap[item] = {};
      }

      blockOutputMap[item][l] = fileMappings[l][key][item];
    });
  });
  fs.writeFileSync(`./blocks/${key}/intl.json`, JSON.stringify(blockOutputMap));
});
