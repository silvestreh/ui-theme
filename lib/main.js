'use babel';

import config from './config';
import setVibrancy from './set-vibrancy';
import dockObserver from './dock-observer';
import backgroundImage from './background-image';

export default {
  config,

  activate() {
    dockObserver.init();
    backgroundImage.init();

    atom.config.observe('myui-theme.background', backgroundImage.handleChange);
    atom.config.observe('myui-theme.vibrancy', value => {
      if (value) {
        backgroundImage.destroy();
        return setVibrancy('dark');
      }

      setVibrancy(null);
    });
  },

  deactivate() {
    setVibrancy(null);
    backgroundImage.destroy();
    dockObserver.disconnect();
  }
}
