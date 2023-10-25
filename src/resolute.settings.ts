import { ResoluteSettings } from '@blinkorb/resolute';

const settings = {
  helmet: {
    defaultTitle: 'Destiny 2 Pattern Tracker',
  },
} as const satisfies ResoluteSettings;

export default settings;
