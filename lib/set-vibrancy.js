'use babel';

import electron from 'electron';
import { platform } from 'os';

const root = document.documentElement;

export default (type = 'dark') => {
  const currentWindow = electron.remote.getCurrentWindow();

  if (platform() === 'darwin' && type) {
    currentWindow.setVibrancy(type);
    return root.classList.add('myui--has-vibrancy');
  }

  currentWindow.setVibrancy(null);
  return root.classList.remove('myui--has-vibrancy');
};
