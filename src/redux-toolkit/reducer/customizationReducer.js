import { createSlice } from '@reduxjs/toolkit';
import config from '@/config';

export const initialState = {
  isOpen: [],
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  outlinedFilled: config.outlinedFilled,
  navType: config.theme,
  presetColor: config.presetColor,
  locale: config.i18n,
  rtlLayout: config.rtlLayout,
  opened: true,
};

let id;

export const customizationReducer = createSlice({
  name: '@customization',
  initialState,
  reducers: {
    MENU_OPEN: (state, action) => {
      id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    },

    MENU_TYPE: (state, action) => {
      return {
        ...state,
        navType: action.navType,
      };
    },

    PRESET_COLORS: (state, action) => {
      return {
        ...state,
        presetColor: action.presetColor,
      };
    },

    THEME_LOCALE: (state, action) => {
      return {
        ...state,
        locale: action.locale,
      };
    },

    THEME_RTL: (state, action) => {
      return {
        ...state,
        rtlLayout: action.rtlLayout,
      };
    },

    SET_MENU: (state, action) => {
      return {
        ...state,
        opened: action.opened,
      };
    },

    SET_FONT_FAMILY: (state, action) => {
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    },

    SET_BORDER_RADIUS: (state, action) => {
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    },

    SET_OUTLINED_FILLED: (state, action) => {
      return {
        ...state,
        outlinedFilled: action.outlinedFilled,
      };
    },
  },
});

export const {
  MENU_OPEN,
  MENU_TYPE,
  PRESET_COLORS,
  THEME_LOCALE,
  THEME_RTL,
  SET_MENU,
  SET_FONT_FAMILY,
  SET_BORDER_RADIUS,
  SET_OUTLINED_FILLED,
} = customizationReducer.actions;

export default customizationReducer.reducer;
