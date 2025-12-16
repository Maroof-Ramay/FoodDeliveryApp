import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

type SplashProps = {
    onFinish: () => void;
};

const { width, height } = Dimensions.get("window");

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish(); // hide splash after 1.5s
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/splashScreen/greySplash.png")}
                style={[styles.image, styles.topLeft]}
                resizeMode="contain"
            />
            <Image
                source={require("../assets/splashScreen/Logo.png")}
                style={[styles.imageLogo, styles.center]}
                resizeMode="contain"
            />
            <Image
                source={require("../assets/splashScreen/orangeSplash.png")}
                style={[styles.image, styles.bottomRight]}
                resizeMode="contain"
            />
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    imageLogo: {
        width: 120,
        height: 60,
        position: "absolute",
    },
    image: {
        width: 150,
        height: 150,
        position: "absolute",
    },
    topLeft: {
        top: 1,
        left: 1,
    },
    center: {
        top: height / 2 - 75,
        left: width / 2 - 75,
    },
    bottomRight: {
        bottom: 1,
        right: 1,
    },
});
