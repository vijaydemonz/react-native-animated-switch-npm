
import React, { useEffect, useRef } from "react";
import { Easing, View, Animated, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import MaskedView from "@react-native-community/masked-view";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export function YesNoSwitch({
  value,
  onChange,
  size,
  animationSpeed,
  elevation,
  activeColor,
  inActiveColor = "white",
  backgroundColor = "white",
  iconSize,
}) {
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
      backgroundColor,
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
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.4],
          }),
        },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.4,
      height: SIZE * 0.4,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [inActiveColor, activeColor],
      }),
      borderRadius: SIZE * 0.2,
    },
    close: {
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [1, 0],
      }),
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    knobRotation: {
      width: SIZE * 0.22,
      height: SIZE * 0.22,
      borderRadius: SIZE * 0.1,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        {
          rotate: translateX.interpolate({
            inputRange: [0, SIZE * 1.05],
            outputRange: ["0deg", "360deg"],
          }),
        },
      ],
    },
    tick: {
      position: "absolute",
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [0, 1],
      }),
    },
  };
  return (
    <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
      <Animated.View style={styles.container}>
        <Animated.View style={styles.knob}>
          <Animated.View style={styles.knobRotation}>
            <Animated.View style={styles.tick}>
              <Feather name={"check"} size={size * 0.24} color="white" />
            </Animated.View>
            <Animated.View style={styles.close}>
              <Ionicons name={"close"} size={size * 0.24} color={"white"} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
}

YesNoSwitch.propTypes = {
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

YesNoSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  lightModeBg: "white",
  darkModeBg: "black",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};

export function Switcher({
  value,
  onChange,
  size,
  animationSpeed,
  elevation,
  inActiveColor,
  activeColor,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 0 : -SIZE * 1,
      duration:
        animationSpeed === "fast"
          ? 200
          : animationSpeed === "medium"
            ? 300
            : 400,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    wrapper: {
      width: SIZE * 1,
      backgroundColor: inActiveColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
      transform: [
        {
          scale: translateX.interpolate({
            inputRange: [-SIZE * 1, -SIZE * 0.5, 0],
            outputRange: [1, 1.11, 1],
          }),
        },
      ],
    },
    container: {
      width: SIZE * 1,
      backgroundColor: inActiveColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: SIZE * 0.05,
    },
    darkKnob: {
      width: SIZE * 0.34,
      height: SIZE * 0.34,
      backgroundColor: inActiveColor,
      borderRadius: SIZE * 0.17,
    },
    lightKnob: {
      width: SIZE * 0.34,
      height: SIZE * 0.34,
      backgroundColor: activeColor,
      borderRadius: SIZE * 0.17,
    },
    maskedLayer: {
      transform: [
        {
          translateX,
        },
      ],
      position: "absolute",
      width: SIZE * 1,
      backgroundColor: activeColor,
      height: SIZE * 0.6,
      top: -(SIZE * 0.05),
      borderRadius: SIZE * 0.5,
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.wrapper}>
          <MaskedView maskElement={<Animated.View style={styles.container} />}>
            <View style={styles.container}>
              <Animated.View style={styles.lightKnob} />
              <Animated.View style={styles.maskedLayer} />
              <Animated.View style={styles.darkKnob} />
            </View>
          </MaskedView>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

Switcher.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
  inActiveColor: PropTypes.string,
  activeColor: PropTypes.string,
};

Switcher.defaultProps = {
  value: false,
  onChange: () => {
    console.log("Please provide onChange prop");
  },
  size: 100,
  animationSpeed: "fast",
  elevation: 5,
  inActiveColor: "white",
  activeColor: "black",
};


export function DarkModeSwitch({
  value,
  onChange,
  size,
  borderColor,
  borderWidth,
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
      toValue: value ? SIZE * 0.9 : 0,
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

  const backgroundColor = translateX.interpolate({
    inputRange: [0, 90],
    outputRange: [activeColor, inActiveColor],
  });

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
      borderColor,
      borderWidth,
    },
    moonLayer: {
      transform: [
        { translateX: translateX },
        {
          rotate: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: ["0deg", "-45deg"],
          }),
        },
      ],
      opacity: translateX.interpolate({
        inputRange: [SIZE * 0.4, SIZE * 0.5, SIZE * 0.7],
        outputRange: [0, 0, 1],
      }),
      width: SIZE * 0.4,
      height: SIZE * 0.25,
      backgroundColor,
      borderBottomLeftRadius: SIZE * 0.2,
      borderBottomRightRadius: SIZE * 0.2,
      borderTopRightRadius: SIZE * 0.05,
      zIndex: 10,
      top: SIZE * 0.09,
      marginLeft: SIZE * -0.45,
      position: "absolute",
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.51],
          }),
        },
      ],
      width: SIZE * 0.36,
      height: SIZE * 0.36,
      backgroundColor: knobColor,
      borderRadius: SIZE * 0.18,
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <Animated.View style={styles.moonLayer} />
          <Animated.View style={styles.knob} />
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

DarkModeSwitch.propTypes = {
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

DarkModeSwitch.defaultProps = {
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

export function GradientSwitch({
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

export function SliderSwitch({
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


export function SpringSwitch({
  value,
  onChange,
  size,
  activeColor,
  inActiveColor,
}) {
  const backgroundColor = "#fff";
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? SIZE * 1.2 : 0,
      bounciness: 15,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
    },
    knobLayer: {
      alignSelf: "center",
      width: size - size * 0.3,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [activeColor, inActiveColor],
      }),
      position: "absolute",
      height: SIZE * 0.08,
      borderRadius: SIZE * 0.05,
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.4],
          }),
        },
        {
          scaleX: translateX.interpolate({
            inputRange: [0, SIZE * 0.5, SIZE * 1.05],
            outputRange: [1, 1.4, 1],
          }),
        },
        { rotate: "-45deg" },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.3,
      height: SIZE * 0.3,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 0.9],
        outputRange: [activeColor, inActiveColor],
      }),
      borderRadius: SIZE * 0.15,
      borderBottomRightRadius: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [SIZE * 0.03, SIZE * 0.15],
      }),
      borderTopLeftRadius: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [SIZE * 0.15, SIZE * 0.03],
      }),
    },
  };
  return (
    <>
      <TouchableOpacity onPress={() => onChange()}>
        <Animated.View style={styles.container}>
          <Animated.View style={styles.knobLayer} />
          <Animated.View style={styles.knob} />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

SpringSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  inActiveColor: PropTypes.string,
};

SpringSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  activeColor: "white",
  inActiveColor: "#11998e",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};


export function SwitcherFullStrech({
  value,
  onChange,
  size,
  animationSpeed,
  elevation,
  inActiveColor,
  activeColor,
}) {
  const translateX = useRef(new Animated.Value(0)).current;

  const SIZE = size;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? SIZE * 1 : 0,
      duration:
        animationSpeed === "fast"
          ? 150
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
      backgroundColor: activeColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
      transform: [
        {
          scale: translateX.interpolate({
            inputRange: [0, SIZE * 0.5, SIZE * 1],
            outputRange: [1, 1.11, 1],
          }),
        },
      ],
    },
    absoluteLayer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      width: SIZE * 1,
      height: (SIZE * 1) / 2,
      paddingHorizontal: SIZE * 0.2,
    },
    smallZero: {
      width: SIZE * 0.1,
      height: SIZE * 0.1,
      borderRadius: SIZE * 0.05,
      backgroundColor: inActiveColor,
    },
    smallOne: {
      width: SIZE * 0.05,
      height: SIZE * 0.15,
      borderRadius: SIZE * 0.05,
      backgroundColor: inActiveColor,
    },
    overLay: [
      {
        height: SIZE * 0.5,
        backgroundColor: inActiveColor,
        borderRadius: SIZE * 0.25,
        justifyContent: "center",
        alignItems: "center",
      },
      {
        width: translateX.interpolate({
          inputRange: [0, SIZE * 0.5, SIZE * 1],
          outputRange: [SIZE * 0.5, SIZE * 1, SIZE * 0.5],
        }),
        transform: [
          {
            translateX: translateX.interpolate({
              inputRange: [0, SIZE * 0.5, SIZE * 1],
              outputRange: [0, 0, SIZE * 0.5],
            }),
          },
        ],
      },
    ],
    overLayOne: {
      width: SIZE * 0.05,
      height: SIZE * 0.15,
      borderRadius: SIZE * 0.5,
      position: "absolute",
      backgroundColor: activeColor,
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 0.5, SIZE * 1],
        outputRange: [0, 0, 1],
      }),
    },
    overLayZero: {
      width: SIZE * 0.1,
      height: SIZE * 0.1,
      borderRadius: SIZE * 0.05,
      backgroundColor: activeColor,
      position: "absolute",
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 0.5, SIZE * 1],
        outputRange: [1, 0, 0],
      }),
    },
  };

  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <View style={styles.absoluteLayer}>
            <Animated.View style={styles.smallZero} />
            <Animated.View style={styles.smallOne} />
          </View>
          <Animated.View style={styles.overLay}>
            <Animated.View style={styles.overLayOne} />
            <Animated.View style={styles.overLayZero} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

SwitcherFullStrech.propTypes = {
  activeColor: PropTypes.string,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
  inActiveColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.bool.isRequired,
};
SwitcherFullStrech.defaultProps = {
  size: 100,
  value: false,
  inActiveColor: "white",
  activeColor: "black",
  animationSpeed: "fast",
  elevation: 10,
};


export function ZeroOneSwitch({
  value,
  onChange,
  size,
  borderColor,
  borderWidth,
  knobColor,
  animationSpeed,
  elevation,
  indicatorColor = "white",
  backgroundColor = "white",
}) {
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
      backgroundColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
      borderColor,
      borderWidth,
    },
    moonLayer: {
      transform: [
        { translateX: translateX },
        {
          rotate: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: ["0deg", "-45deg"],
          }),
        },
      ],
      opacity: translateX.interpolate({
        inputRange: [SIZE * 0.4, SIZE * 0.5, SIZE * 0.7],
        outputRange: [0, 0, 1],
      }),
      width: SIZE * 0.4,
      height: SIZE * 0.25,
      backgroundColor,
      borderBottomLeftRadius: SIZE * 0.2,
      borderBottomRightRadius: SIZE * 0.2,
      borderTopRightRadius: SIZE * 0.05,
      zIndex: 10,
      top: SIZE * 0.09,
      marginLeft: SIZE * -0.45,
      position: "absolute",
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.4],
          }),
        },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.4,
      height: SIZE * 0.4,
      backgroundColor: knobColor,
      borderRadius: SIZE * 0.2,
    },
    indicator: {
      width: translateX.interpolate({
        inputRange: [0, SIZE * 0.9],
        outputRange: [SIZE * 0.22, 0],
        extrapolate: "clamp",
      }),
      height: SIZE * 0.22,
      borderRadius: (SIZE * 0.9) / 2,
      borderWidth: SIZE * 0.03,
      borderColor: indicatorColor,
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <Animated.View style={styles.knob}>
            <Animated.View style={styles.indicator} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

ZeroOneSwitch.propTypes = {
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

ZeroOneSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  activeColor: "white",
  darkModeBg: "black",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};
