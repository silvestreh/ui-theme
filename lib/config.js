'use babel';

import { platform } from 'os';

const darwin = {
  vibrancy: {
    title: 'Enable Vibrancy',
    description: 'Makes your atom window transparent. It\'s only for macOS and kinda buggy.',
    type: 'boolean',
    default: false
  }
};

const notDarwin = {
  background: {
    title: 'Background Image',
    description: 'Simulates vibrancy in unsupported platforms',
    type: 'string',
    default: ''
  }
};

export default {
  ...(platform() === 'darwin' ? darwin : {}),
  ...notDarwin
};
