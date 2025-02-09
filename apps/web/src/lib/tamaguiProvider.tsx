'use client';

import { TamaguiProvider as OGTamaguiProvider, TamaguiProviderProps, tamaguiConfig } from '@repo/ui/theme';

export function TamaguiProvider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  if (!tamaguiConfig) {
    console.error('❌ Tamagui config is missing!');
    return null;
  }

  return (
    <OGTamaguiProvider config={tamaguiConfig} disableInjectCSS {...rest}>
      {children}
    </OGTamaguiProvider>
  );
}
