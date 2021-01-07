import React, { useEffect, useRef } from "react";
import { Easing, View, Animated, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientSwitch({
  value,
  onChange,
  size,
  knobColor,
  animationSpeed,
  elevation,
  inActiveGradientColors,
  activeGradientColors,
  fontSize,
}) {
  const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? SIZE * 1.05 : 0,
      duration:
        animationSpeed === "fast"
          ? 100
          : animationSpeed === "medium"
          ? 200
          : 500,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 1.05],
            outputRange: [0, SIZE * 0.5],
          }),
        },
        {
          scaleX: translateX.interpolate({
            inputRange: [0, SIZE * 0.5, SIZE * 1.05],
            outputRange: [1, 2, 1],
          }),
        },
      ],
      elevation: 11,
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.4,
      height: SIZE * 0.4,
      backgroundColor: knobColor,
      borderRadius: SIZE * 0.2,
    },
    text: {
      color: knobColor,
      fontFamily: "monospace",
      fontWeight: "bold",
      fontSize: fontSize ? fontSize : 15,
    },
    activeGradient: {
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 1],
        outputRange: [0, 1],
      }),
      padding: SIZE * 0.15,
      position: "absolute",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    inActiveGradient: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "flex-end",
      padding: SIZE * 0.15,
      alignSelf: "flex-end",
    },
  };
  return (
    <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
      <AnimatedGradient
        colors={inActiveGradientColors}
        style={styles.container}
      >
        <Animated.View style={styles.knob} />
        <View style={styles.inActiveGradient}>
          <Text style={styles.text}>{"OFF"}</Text>
        </View>
        <AnimatedGradient
          colors={activeGradientColors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.container, styles.activeGradient]}
        >
          <Text style={styles.text}>{"ON "}</Text>
        </AnimatedGradient>
      </AnimatedGradient>
    </TapGestureHandler>
  );
}

GradientSwitch.propTypes = {
  activeGradientColors: PropTypes.array,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
  inActiveGradientColors: PropTypes.array,
  knobColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.bool.isRequired,
};

GradientSwitch.defaultProps = {
  size: 100,
  value: false,
  onChange: () => {
    console.log("Please pass onChangeProp");
  },
  animationSpeed: "fast",
  elevation: 10,
  knobColor: "white",
  activeGradientColors: ["#38ef7d", "#11998e"],
  inActiveGradientColors: ["#777", "#434343"],
};
