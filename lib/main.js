'use babel';

import { platform } from 'os';
import setVibrancy from './set-vibrancy';
import dockObserver from './dock-observer';

export default {
  config: platform() === 'darwin'
    ? {
      vibrancy: {
        title: 'Enable Vibrancy',
        description: 'Makes your atom window transparent. It\'s only for macOS and kinda buggy.',
        type: 'boolean',
        default: false
      }
    }
    : null,

  activate() {
    dockObserver.init();
    atom.config.observe('myui-theme.vibrancy', () => setVibrancy('dark'));
  },

  deactivate() {
    setVibrancy(null);
    dockObserver.disconnect();
  }
}
