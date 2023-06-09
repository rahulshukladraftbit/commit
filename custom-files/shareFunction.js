import React from 'react';
import { Share, View, Button } from 'react-native';

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'Check out this amazing new app called Noba! If you sign up with my referral code, we both get $5!',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export { onShare as onShare };
