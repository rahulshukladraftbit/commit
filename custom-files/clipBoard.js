import * as Clipboard from 'expo-clipboard';

const copyToClipboard = async inputString => {
  await Clipboard.setStringAsync(inputString);
};

export { copyToClipboard as copyToClipboard };
