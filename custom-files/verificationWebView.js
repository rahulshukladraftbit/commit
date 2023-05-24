import React from 'react';
import { View } from 'react-native';
import { WebView } from '@draftbit/ui';

export const verificationWebView = ({
  verificationLink,
  navigation,
  setLoading,
}) => {
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: verificationLink }}
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabled={true}
      useWebKit={true}
      allowsInlineMediaPlayback={true}
      javaScriptEnabledAndroid={true}
      onMessage={data => {
        const dataArray = JSON.parse(data.nativeEvent.data);
        if (dataArray.payload) {
          const payload = dataArray.payload;
          console.log('IDV Data: ', payload);
          if (payload.value === 'Secure.me loaded successfully') {
            setLoading(false);
          } else if (payload.value === '/success') {
            console.log('The session completed successfully');
            setTimeout(
              () => navigation.navigate('AuthenticatedPrimaryScreen'),
              3000
            );
          } else if (payload.value === 'fail' || payload.value === 4004) {
            console.log('The session has failed');
          }
        }
      }}
    />
  );
};
