import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation/MainNavigator";

export default function SignUp() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [name, setName] = useState("maroof");
    const [email, setEmail] = useState("marooframay@gmail.com");
    const [password, setPassword] = useState("devil890");
    const [rePassword, setRePassword] = useState("devil890");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>

            <AuthenticationTopView
                title="Sign Up"
                subtitle="Please sign up to get started"
            />

            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <EmailField
                        value={name}
                        onChangeText={setName}
                        label="Name"
                        placeholder="John Doe"
                    />
                    <EmailField
                        value={email}
                        onChangeText={setEmail}
                    />
                    <PasswordField
                        value={password}
                        onChangeText={setPassword}
                    />
                    <PasswordField
                        value={rePassword}
                        onChangeText={setRePassword}
                        label="Re-Type Password"
                    />
                    <TouchableOpacity style={{ marginTop: 30 }} >
                        <OrangeButton title="Sign Up"></OrangeButton>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 24,
        paddingHorizontal: 24,
    },
    socialIcons: {
        width: 62,
        height: 62
    },
    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    rememberText: {
        marginLeft: 10,
        fontSize: 16,
        color: Colors.darkGrey,
    },
    errorText: {
        color: "red",
        marginTop: 10,
        fontSize: 14,
    },
});
