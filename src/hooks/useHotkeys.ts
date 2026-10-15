import { useEffect } from 'react';

export function useHotkeys(
  keyCombo: string,
  callback: (e: KeyboardEvent) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      // Don't fire hotkeys if user is currently typing in an input/textarea (unless it's Escape or ⌘K)
      const target = e.target as HTMLElement;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isEscape = e.key === 'Escape';

      if (isInput && !isCmdK && !isEscape) {
        return;
      }

      if (keyCombo === 'cmd+k' || keyCombo === 'ctrl+k') {
        if (isCmdK) {
          e.preventDefault();
          callback(e);
        }
      } else if (keyCombo.toLowerCase() === e.key.toLowerCase()) {
        callback(e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyCombo, callback, enabled]);
}
