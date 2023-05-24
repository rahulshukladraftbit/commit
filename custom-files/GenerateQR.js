import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import QRCodeStyling from 'qr-code-styling';

export const QR = () => {
  const qrCode = new QRCodeStyling({
    width: 230,
    height: 230,
    image:
      'https://res.cloudinary.com/altos/image/fetch/w_auto,h_128,f_auto,q_80/https://apps-draftbit-com.s3.amazonaws.com/apps/Ba9f7gCn/assets/VifUNf6nS-LDOjIWGnzLN',
    dotsOptions: {
      color: '#004252',
      type: 'dots',
    },
    // cornersSquareOptions:{
    //     type: "dot"
    // },
    // cornersDotOptions: {
    //   type: "dot"
    // },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 20,
    },
  });

  const [url, setUrl] = useState('https://www.noba.com/dolares');
  const [fileExt, setFileExt] = useState('png');
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  const styles = {
    inputWrapper: {
      margin: '20px 0',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    inputBox: {
      flexGrow: 1,
      marginRight: 20,
    },
  };

  return (
    //   <div style={styles.inputWrapper}>
    <View ref={ref} />
  );
};
