'use babel';

const root = document.documentElement;
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const el = mutation.target;

    if ((!mutation.oldValue || !mutation.oldValue.match(/\batom-dock-open\b/)) && mutation.target.classList.contains('atom-dock-open')) {
      return root.classList.add('vibranceui--has-left-dock');
    }

    return root.classList.remove('vibranceui--has-left-dock');
  });
});


export default {
  init() {
    const treeView = document.querySelector('atom-dock.left > .atom-dock-inner');

    if (treeView.classList.contains('atom-dock-open')) {
      root.classList.add('vibranceui--has-left-dock');
    }

    observer.observe(treeView, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    });
  },

  disconnect() {
    root.classList.remove('vibranceui--has-left-dock');
    observer.disconnect();
  }
};
