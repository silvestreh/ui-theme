'use babel';

import electron from 'electron';
import { platform } from 'os';

const root = document.documentElement;
const { appVersion } = atom;
const atomMinor = parseInt(appVersion.split('.')[1], 10);
const seenWarning = localStorage.getItem('vibrance-ui-seenwarning');

export default shouldEnable => {
  const currentWindow = electron.remote.getCurrentWindow();
  const type = atom.config.get('vibrance-ui.vibrancyStyle');

  if (platform() === 'darwin' && shouldEnable) {
    if (atomMinor <= 30 && !seenWarning) {
      atom.notifications.addWarning('Vibrancy has known issues when using a custom title bar. These are known Electron issues.', { dismissable: true })
      localStorage.setItem('vibrance-ui-seenwarning', true);
    }
    currentWindow.setVibrancy(type);
    return root.classList.add('vibranceui--has-vibrancy');
  }

  currentWindow.setVibrancy(null);
  return root.classList.remove('vibranceui--has-vibrancy');
};
