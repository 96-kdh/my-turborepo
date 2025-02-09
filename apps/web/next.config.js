import { withTamagui } from '@tamagui/next-plugin';
import path from 'path';

/** @type {import('next').NextConfig} */
const defaultConfig = {};

console.log(process.cwd());

const tamaguiPlugin = withTamagui({
  config: path.join(process.cwd(), 'packages/ui/src/theme/tamagui.config.ts'),
  components: ['tamagui'],
  appDir: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultConfig,
  ...tamaguiPlugin(defaultConfig),
};

export default nextConfig;
