import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";

interface AuthenticationTopViewProps {
    title: string;
    subtitle?: string;
    subtitle2?: string;
    showBackButton?: Boolean;
}

export default function AuthenticationTopView({ title, subtitle, subtitle2 = undefined, showBackButton = true }: AuthenticationTopViewProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.main}>

            <Image
                source={require("../assets/splashScreen/greySplash.png")}
                style={[styles.imageLeft]}
                resizeMode="contain"
            />

            <Image
                source={require("../assets/splashScreen/zigzagLine.png")}
                style={[styles.imageRight]}
                resizeMode="contain"
            />

            <View style={styles.textView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                {subtitle2 !== undefined && (
                    <Text style={styles.subtitle2}>{subtitle2}</Text>
                )}
            </View>
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backButton}
                        source={require("../assets/backButton.png")}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "30%",
        backgroundColor: Colors.backgroundColor,
        position: "relative",
        overflow: "hidden",
    },

    imageLeft: {
        position: "absolute",
        width: 150,
        height: 150,
        top: 20,
        left: 0,
    },

    imageRight: {
        position: "absolute",
        width: 177,
        height: 444,
        top: 20,
        right: -35,
    },

    textView: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 10,
        gap: 10
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontWeight: "100",
    },
    subtitle2: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    backButton: {
        width: 45,
        height: 45,
        marginTop: 50,
        marginLeft: 24,
    }
});
