'use babel';

import electron from 'electron';
import { platform } from 'os';

const root = document.documentElement;

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const el = mutation.target;

    if ((!mutation.oldValue || !mutation.oldValue.match(/\batom-dock-open\b/)) && mutation.target.classList.contains('atom-dock-open')) {
      return root.classList.add('myui--has-left-dock');
    }

    return root.classList.remove('myui--has-left-dock');
  });
});

const setVibrancy = value => {
  if (platform() === 'darwin' && value) {
    electron.remote.getCurrentWindow().setVibrancy('dark');
    return root.classList.add('myui--has-vibrancy');
  }

  electron.remote.getCurrentWindow().setVibrancy();
  return root.classList.remove('myui--has-vibrancy');
}

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
    const treeView = document.querySelector('atom-dock.left > .atom-dock-inner');

    if (treeView.classList.contains('atom-dock-open')) {
      root.classList.add('myui--has-left-dock');
    }

    observer.observe(treeView, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    });

    atom.config.observe('myui-theme.vibrancy', setVibrancy)
  },

  deactivate() {
    root.classList.remove('myui--has-left-dock');
    setVibrancy(false);
    observer.disconnect();
  }
}
