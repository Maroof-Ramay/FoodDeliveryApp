import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";


export default function ForgotPassword() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <AuthenticationTopView
                title="Forgot Password"
                subtitle="Please sign in to your existing account"
            />
            <View style={styles.main}>
                <EmailField
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity style={{ marginTop: 30 }}
               onPress={() => navigation.navigate("Verification", { emailAddress: email === "" ? "test@test.com" : email})}
                >
                    <OrangeButton title = "Send Code">

                    </OrangeButton>
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