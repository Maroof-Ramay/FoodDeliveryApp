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
    const handleSignUp = async () => {
        // Basic validation
        if (!name || !email || !password || !rePassword) {
            setErrorMsg("All fields are required");
            return;
        }
    
        if (password !== rePassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
    
        setLoading(true);
        setErrorMsg("");
    
        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setErrorMsg(data.message || "Something went wrong");
            } else {
                console.log("Token:", data.token);
                // Optionally navigate to login or home screen
                navigation.navigate("Login"); 
            }
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
                    {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={handleSignUp} >
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
