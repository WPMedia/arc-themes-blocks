/*
  Dimensions array format is a multidimensional array
  [
    [ [adWidth, adHeight], [adWidth, adHeight] ], // desktop ad sizes
    [ [adWidth, adHeight], [adWidth, adHeight] ], // tablet ad sizes
    [ [adWidth, adHeight], [adWidth, adHeight] ], // mobile ad sizes
  ]
*/

const sz0x0 = [0, 0];
const sz1x1 = [1, 1];
const sz300x250 = [300, 250];
const sz300x600 = [300, 600];
const sz320x50 = [320, 50];
const sz728x90 = [728, 90];
const sz970x90 = [970, 90];
const sz970x250 = [970, 90];

const adMapping = {
  '1x1': {
    adName: 'oop',
    adClass: '1x1',
    dimensionsArray: [sz1x1, sz1x1, sz1x1],
    ampDimensionsArray: sz1x1,
  },
  '300x250': {
    adName: 'cube',
    adClass: '300x250',
    dimensionsArray: [sz300x250, sz300x250, sz300x250],
    ampDimensionsArray: sz300x250,
  },
  '300x250|300x600': {
    adName: 'flex_cube',
    adClass: '300x600',
    dimensionsArray: [
      [sz300x250, sz300x600],
      [sz300x250, sz300x600],
      sz300x250,
    ],
    ampDimensionsArray: sz300x250,
  },
  '300x250|300x600_rightrail': {
    adName: 'right_rail_cube',
    adClass: '300x250',
    dimensionsArray: [[sz300x250, sz300x600], sz0x0, sz0x0],
    ampDimensionsArray: sz0x0,
  },
  '728x90|320x50': {
    adName: 'leaderboard_medium',
    adClass: '728x90',
    dimensionsArray: [sz728x90, sz728x90, sz320x50],
    ampDimensionsArray: sz320x50,
  },
  '970x250|970x90|728x90|320x50': {
    adName: 'leaderboard_large', // TODO: Rename 'leaderboard_flex'?
    adClass: '728x90',
    dimensionsArray: [
      [sz728x90, sz970x90, sz970x250],
      sz728x90,
      sz320x50,
    ],
    ampDimensionsArray: sz320x50,
  },
};

export default adMapping;
