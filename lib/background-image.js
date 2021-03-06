'use babel';

import { existsSync } from 'fs';
import electron from 'electron';

const currentWindow = electron.remote.getCurrentWindow();
const root = document.documentElement;
const isVibrancyEnabled = atom.config.get('vibrance-ui.vibrancy');

const handleMove = () => {
  const { x, y } = atom.getWindowDimensions();

  root.style.backgroundPositionX = `${-x}px`;
  root.style.backgroundPositionY = `${-y}px`;
};

const attachMoveHandler = () => {
  const background = atom.config.get('vibrance-ui.background');

  if (background && !isVibrancyEnabled) {
    currentWindow.on('move', handleMove);
  }
};

const handleChange = value => {
  if (value && existsSync(value)) {
    const { size } = electron.screen.getPrimaryDisplay();

    root.classList.add('vibranceui--has-background-image');
    root.style.backgroundSize = `${size.width}px ${size.height}px`;
    root.style.backgroundImage = `url(file://${value})`;
    attachMoveHandler();
  } else {
    destroy();
  }
};

const init = () => {
  const { size } = electron.screen.getPrimaryDisplay();
  const background = atom.config.get('vibrance-ui.background');
  root.style.backgroundSize = `${size.width}px ${size.height}px`;

  handleChange(background);
  handleMove();
};

const destroy = () => {
  root.style.backgroundSize = null;
  root.style.backgroundImage = null;
  root.style.backgroundPositionX = null;
  root.style.backgroundPositionY = null;
  root.classList.remove('vibranceui--has-background-image');
  currentWindow.removeListener('move', handleMove);
};

export default {
  attachMoveHandler,
  destroy,
  handleChange,
  init
};
