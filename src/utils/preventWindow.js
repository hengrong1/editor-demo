export const preventKeys = (event) => {
    const forbiddenKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    const isFnKey = forbiddenKeys.includes(event.key);
    const notAllowedShortcuts = [
        {key: 'u', ctrlKey: true},
        {key: 'r', ctrlKey: true},
        {key: 'f', ctrlKey: true},
    ]
    const isBrowserShortcut = notAllowedShortcuts.some(shortcut => {
        return event.key === shortcut.key &&
            (
                event.ctrlKey === shortcut.ctrlKey
                && event.shiftKey === (shortcut.shiftKey)
                && event.altKey === (shortcut.altKey)
            );
    });
    console.log(isBrowserShortcut);
    if (isFnKey || isBrowserShortcut) {
        event.preventDefault();
    }
}