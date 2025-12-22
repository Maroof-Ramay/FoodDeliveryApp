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
type VerificationRouteProp = RouteProp<RootStackParamList, "Verification">;



export default function Verification({ route }: { route: VerificationRouteProp }) {

    const { emailAddress } = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [code, setCode] = useState("");

    const [secondsLeft, setSecondsLeft] = useState(0); // start at 0
    const [timerActive, setTimerActive] = useState(false); // control interval
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const sendOTP = async () => {
        // Simulate sending OTP and start timer
        setSecondsLeft(60);
        setTimerActive(true);
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
            const response = await fetch("http://192.168.13.101:3000/verify-otp", {
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

            // On success, go to ResetPassword (or wherever you want)
            navigation.navigate("ResetPassword");
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
        sendOTP();
    }, [emailAddress]);


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
                        <TouchableOpacity disabled={secondsLeft > 0}
                            onPress={sendOTP}>
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