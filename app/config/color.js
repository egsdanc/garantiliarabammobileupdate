/**
 * Color Palette Define
 */

let OrangeColor = {
  primaryColor: '#D81C1C',
  darkPrimaryColor: '#C31C0D',
  lightPrimaryColor: '#FF8A65',
  accentColor: '#4A90A4',
};

let BlueColor = {
  primaryColor: '#5DADE2',
  darkPrimaryColor: '#1281ac',
  lightPrimaryColor: '#68c9ef',
  accentColor: '#FF8A65',
};

let PinkColor = {
  primaryColor: '#A569BD',
  darkPrimaryColor: '#C2185B',
  lightPrimaryColor: '#F8BBD0',
  accentColor: '#8BC34A',
};

let GreenColor = {
  primaryColor: '#58D68D',
  darkPrimaryColor: '#388E3C',
  lightPrimaryColor: '#C8E6C9',
  accentColor: '#607D8B',
};

let YellowColor = {
  primaryColor: '#FDC60A',
  darkPrimaryColor: '#FFA000',
  lightPrimaryColor: '#FFECB3',
  accentColor: '#795548',
};

/**
 * Main color use for whole application
 */
let BaseColor = {
  ...OrangeColor,
  ...{
    textPrimaryColor: '#212121',
    textSecondaryColor: '#E0E0E1',
    grayColor: '#9B9B9B',
    grayColor2: '#F5F3F3',
    grayColor3: '#EEEEEE',
    darkBlueColor: '#24253D',
    dividerColor: '#BDBDBD',
    whiteColor: '#FFFFFF',
    fieldColor: '#F5F5F5',
    yellowColor: '#FDC60A',
    navyBlue: '#3C5A99',
    kashmir: '#5D6D7E',
    black: '#000000',
    webBlue: '#95aac9',
    pink: '#F8BBD0',
    error: 'red',
    gold: '#FFBC02',
    grey: '#F2F3F5',
    medium: '#6e6969',
    light: '#f8f4f4',
    dark: '#0c0c0c',
    danger: '#E0004E',
    red: '#F0193D',
    blue: '#0596FF',
    blackGrey: '#848484',
    openGold: '#F8F3EB',
    offRed: '#D34570',
    green: '#3B9500',
  },
};

export const generateColors = (
  baseColor = {...BaseColor},
  cssProperty = 'backgroundColor',
  prefix = '',
) =>
  Object.entries(baseColor).reduce((acc, [key, value], index, array) => {
    acc[`${prefix}${key}`] = {[cssProperty]: value};
    return acc;
  }, {});

export {BaseColor, OrangeColor, BlueColor, PinkColor, GreenColor, YellowColor};
