import { React, useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const generateToast = () => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  if (Variables.TOAST_VISIBLE === false) {
    try {
      clearInterval(Variables.thisIntervalID);
    } catch {}
    return <></>;
  }

  try {
    clearInterval(Variables.thisIntervalID);
  } catch {}

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    toastContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 65,
      left: 15,
      right: 15,
      padding: 10,
      backgroundColor:
        Variables.TOAST_TYPE === 'error'
          ? '#FF5C5C'
          : Variables.TOAST_TYPE === 'success'
          ? '#16BF3B'
          : '#E5ECEE',
      borderRadius: 6,
      zIndex: 20,
    },
    textContent: {
      color: Variables.TOAST_TYPE === 'neutral' ? '#000000' : '#FFFFFF',
      textAlign: 'left',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3500,
      }),
    ]).start();
  }, [Variables.TOAST_VISIBLE]);

  useEffect(() => {
    const thisIntervalID = setTimeout(() => {
      setGlobalVariableValue({ key: 'TOAST_VISIBLE', value: false });
    }, 3750);

    setGlobalVariableValue({ key: 'toastIntervalID', value: thisIntervalID });
  }, [Variables.TOAST_VISIBLE]);

  return (
    <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
      <View style={styles.toastContainer}>
        <Text style={styles.textContent}>{Variables.TOAST_TEXT}</Text>
      </View>
    </Animated.View>
  );
};
