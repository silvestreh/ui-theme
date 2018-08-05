'use babel';

import electron from 'electron';
import { platform } from 'os';

const root = document.documentElement;
const { appVersion } = atom;
const atomMinor = parseInt(appVersion.split('.')[1], 10);
const seenWarning = localStorage.getItem('myui-seenwarning');

export default (type = 'dark') => {
  const currentWindow = electron.remote.getCurrentWindow();

  if (platform() === 'darwin' && type) {
    if (atomMinor <= 30 && !seenWarning) {
      atom.notifications.addWarning('Vibrancy has known issues when using a custom title bar. These are known Electron issues.', { dismissable: true })
      localStorage.setItem('myui-seenwarning', true);
    }
    currentWindow.setVibrancy(type);
    return root.classList.add('myui--has-vibrancy');
  }

  currentWindow.setVibrancy(null);
  return root.classList.remove('myui--has-vibrancy');
};
