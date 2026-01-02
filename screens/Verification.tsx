import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import OrangeButton from "../components/OrangeButton";
import CodeInput from "../components/CodeInput";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";
import { RouteProp } from "@react-navigation/native";

import { BASE_URL } from "./config/Api";

type VerificationRouteProp = RouteProp<RootStackParamList, "Verification">;



export default function Verification({ route }: { route: VerificationRouteProp }) {

    const { emailAddress, source } = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [code, setCode] = useState("");

    const [secondsLeft, setSecondsLeft] = useState(0); // start at 0
    const [timerActive, setTimerActive] = useState(false); // control interval
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const sendOTP = async () => {
        try {
            setLoading(true);
            setErrorMsg("");
    
            console.log("Resending OTP to:", emailAddress);
    
            const response = await fetch(`${BASE_URL}/resend-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailAddress,
                }),
            });
    
            const rawText = await response.text();
            console.log("Raw resend-otp response:", rawText);
    
            let data: any = {};
            try {
                data = rawText ? JSON.parse(rawText) : {};
            } catch (e) {
                console.warn("Failed to parse resend-otp JSON:", e, rawText);
            }
    
            if (!response.ok) {
                setErrorMsg(data.message || "Failed to resend code");
                return;
            }
    
            // ✅ Restart timer ONLY on success
            setSecondsLeft(60);
            setTimerActive(true);
    
        } catch (error) {
            console.error(error);
            setErrorMsg("Network error");
        } finally {
            setLoading(false);
        }
    };
    

    const handleVerify = async () => {
        if (code.length !== 4) {
            setErrorMsg("Please enter the 4-digit code");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            console.log("Verifying OTP with:", { email: emailAddress, otp: code });
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailAddress,
                    otp: code,
                }),
            });

            const rawText = await response.text();  // <-- get the raw response
            console.log("Raw verify-otp response:", rawText);

            let data: any = {};
            try {
            data = rawText ? JSON.parse(rawText) : {};
            } catch (e) {
            console.warn("Failed to parse verify-otp JSON:", e, "Raw response:", rawText);
            }
            if (!response.ok) {
                setErrorMsg(data.message || "Invalid code");
                return;
            }
            console.log("Source:", source);
            if (source === "signup") {
                navigation.replace("Login");
            } else if (source === "forgot") {
                navigation.navigate("ResetPassword", {emailAddress: emailAddress});
            } else {
                navigation.navigate("SignUp");
            }
        } catch (error) {
            console.error(error);
            setErrorMsg("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!timerActive) return; // only run if timer is active
        if (secondsLeft === 0) {
            setTimerActive(false); // stop the timer when it reaches 0
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, timerActive]);

    useEffect(() => {
        // Only start timer when screen mounts
        setSecondsLeft(60);   // start countdown
        setTimerActive(true); // activate timer
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <AuthenticationTopView
                title="Verification"
                subtitle="We have sent a code to your email"
                subtitle2={emailAddress}
            />
            <View style={styles.main}>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "200", color: Colors.boldGrey }}>
                        Code
                    </Text>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                        <TouchableOpacity disabled={secondsLeft > 0 || loading}
                                    onPress={() => sendOTP()}>
                            <Text style={{ fontSize: 14, fontWeight: "400", color: Colors.boldGrey, textDecorationLine: "underline" }}>
                                Resend
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: "200", color: Colors.boldGrey }}>
                            in {secondsLeft} sec
                        </Text>
                    </View>
                </View>
                <CodeInput code={code} setCode={setCode} length={4} />
                {errorMsg ? (
                    <Text style={styles.errorText}>{errorMsg}</Text>
                ) : null}

                <TouchableOpacity
                    style={{ marginTop: 30 }}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    <OrangeButton title={loading ? "Verifying..." : "Verify"} />
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