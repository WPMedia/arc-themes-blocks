/* eslint-disable import/no-dynamic-require */
const { resolve } = require('path');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const fileMappings = {};
const supportedLocales = [];
const defaultLang = 'en';

let localeFiles = glob.sync('./locale/*.json');
localeFiles = localeFiles.sort();

localeFiles.forEach((file) => {
  let lang = path.basename(file).split('.json')[0];
  console.log(lang);
  //lang = lang.sort((a, b) => b - a);
  //console.log(lang);
  supportedLocales.push(lang);
  fileMappings[lang] = require(resolve(file));
  //console.log(fileMappings[lang])
});

// JSON is strucutred with first key being the block name
const blockNames = Object.keys(fileMappings[defaultLang]);
//console.log(blockNames);

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

  fs.writeFileSync(`./blocks/${key}/intl.json`, JSON.stringify(blockOutputMap, null, '\t'));
});
