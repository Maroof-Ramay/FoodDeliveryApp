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


export default function ResetPassword() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <AuthenticationTopView
                title="Reset Password"
                subtitle="Please enter your new password"
            />
            <View style={styles.main}>
                <PasswordField
                    value={password}
                    onChangeText={setPassword}
                    label="New Password"
                />
                <PasswordField
                    value={rePassword}
                    onChangeText={setRePassword}
                    label="Re-Type New Password"
                />
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <OrangeButton title="Save"></OrangeButton>
                </TouchableOpacity>
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
    }
});