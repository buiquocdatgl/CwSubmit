/* eslint-disable prettier/prettier */
// eslint-disable-next-line quotes
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const COLORS = {
    // base colors
    primary: '#5390ff', // Blue
    secondary: '#cacfd9',  // Gray
    pink: '#BF6B7B',
    light: '#F1F1F1',
    search: '#F291A3',
    grey: '#A9A9A9',
    dark: '#000',

    // colors
    black: '#1E1F20',
    white: '#FFFFFF',
    lightGray: '#eff2f5',
    gray: '#8b9097',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 6,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height,
};


const appTheme = { COLORS, SIZES};

export default appTheme;
