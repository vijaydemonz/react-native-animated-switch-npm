import React, { useEffect, useRef } from "react";
import { Easing, View, Animated, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import MaskedView from "@react-native-community/masked-view";

export default function SliderSwitch({
  value,
  onChange,
  size,
  knobColor,
  animationSpeed,
  elevation,
  inActiveColor,
  activeColor,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? -SIZE * 0.27 : -SIZE * 0.8,
      duration:
        animationSpeed === "fast"
          ? 100
          : animationSpeed === "medium"
          ? 300
          : 400,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor: "white",
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: SIZE * 0.05,
    },
    darkKnob: {
      width: SIZE * 0.36,
      height: SIZE * 0.36,
      backgroundColor: "white",
      borderRadius: SIZE * 0.18,
    },
    lightKnob: {
      width: SIZE * 0.36,
      height: SIZE * 0.36,
      backgroundColor: knobColor,
      borderRadius: SIZE * 0.18,
    },
    textContainer: {
      transform: [
        {
          translateX,
        },
      ],
      position: "absolute",
      width: SIZE * 2,
      backgroundColor: translateX.interpolate({
        inputRange: [-SIZE * 0.75, -SIZE * 0.26],
        outputRange: [inActiveColor, activeColor],
      }),
      height: SIZE * 0.6,
      top: -(SIZE * 0.05),
      borderRadius: SIZE * 0.5,
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: SIZE * 0.3,
    },
    text: { color: "white", fontFamily: "monospace", fontWeight: "bold" },
    wrapper: {
      width: SIZE * 1,
      backgroundColor: "white",
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
    },
  };
  return (
    <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
      <Animated.View style={styles.wapper}>
        <MaskedView maskElement={<Animated.View style={styles.container} />}>
          <View style={styles.container}>
            <Animated.View style={styles.textContainer}>
              <Text style={styles.text}>{`ON `} </Text>
              <Animated.View style={styles.darkKnob} />
              <Text style={styles.text}>{"OFF"}</Text>
            </Animated.View>
          </View>
        </MaskedView>
      </Animated.View>
    </TapGestureHandler>
  );
}

SliderSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  knobColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderWidth: PropTypes.number,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
};

SliderSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  activeColor: "white",
  inActiveColor: "black",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};
