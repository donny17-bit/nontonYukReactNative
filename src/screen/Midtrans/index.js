import React from 'react';
import {WebView} from 'react-native-webview';

export default function Midtrans(props) {
  const {redirectUrl} = props.route.params;
  console.log(redirectUrl);

  return (
    <WebView
      source={{
        uri: redirectUrl,
      }}
    />
  );
}
