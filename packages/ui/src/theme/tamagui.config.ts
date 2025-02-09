import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes } from '@tamagui/themes';

const interFont = createInterFont();

export const tamaguiConfig = createTamagui({
  themes: themes || {}, // ✅ `themes`가 `undefined`일 경우 기본값 제공
  shorthands: shorthands || {}, // ✅ `shorthands`가 `undefined`일 경우 기본값 제공
  fonts: {
    body: interFont,
  },
  tokens: {
    size: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      true: 16, // "true" 키 추가 (기본값 설정)
    },
    space: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      true: 16, // space에도 "true" 키 추가 (권장)
    },
    color: {
      primary: '#1E90FF',
      secondary: '#FF6347',
    },
  },
  components: {},
} as const); // ✅ `as const` 추가하여 TS가 올바르게 추론하도록 설정

export type AppTamaguiConfig = typeof tamaguiConfig;
