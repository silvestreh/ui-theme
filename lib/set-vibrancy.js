'use babel';

import electron from 'electron';
import { platform } from 'os';

const root = document.documentElement;

export default (type = 'dark') => {
  if (platform() === 'darwin' && type) {
    electron.remote
      .getCurrentWindow()
      .setVibrancy(type);

    return root.classList.add('myui--has-vibrancy');
  }

  electron.remote.getCurrentWindow().setVibrancy();
  return root.classList.remove('myui--has-vibrancy');
};
