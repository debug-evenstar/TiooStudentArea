export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      document.body.removeChild(textArea);
      return false;
    }
  } else {
    return navigator.clipboard.writeText(text).then(
      () => true,
      (err) => {
        console.error('Failed to copy: ', err);
        return false;
      }
    );
  }
};
