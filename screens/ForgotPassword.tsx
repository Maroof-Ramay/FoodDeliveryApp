import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";
import { BASE_URL } from "../screens/config/Api";

export default function ForgotPassword() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSendOTP = async () => {
        if (!email) {
          setErrorMsg("Email is required");
          return;
        }
    
        setLoading(true);
        setErrorMsg("");
    
        try {
          const response = await fetch(`${BASE_URL}/forgot-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            setErrorMsg(data.message || "Something went wrong");
            return;
          }
    
          // ✅ OTP sent successfully, navigate to Verification screen
          navigation.navigate("Verification", { emailAddress: email, source: "forgot" });
        } catch (error) {
          console.error(error);
          setErrorMsg("Network error");
        } finally {
          setLoading(false);
        }
      };

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
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
                <TouchableOpacity style={{ marginTop: 30 }} onPress={handleSendOTP}>
                    <OrangeButton title="Send Code" />
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
    },
    errorText: {
        color: "red",
        marginTop: 10,
        fontSize: 14,
    },
});