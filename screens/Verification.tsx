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

    const sendOTP = async () => {
        // Simulate sending OTP and start timer
        setSecondsLeft(60);
        setTimerActive(true);
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


                <TouchableOpacity style={{ marginTop: 30 }}
                    onPress={() => navigation.navigate("ResetPassword")}
                >
                    <OrangeButton title="Verify">

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