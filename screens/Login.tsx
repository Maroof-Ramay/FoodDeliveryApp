import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";

import { BASE_URL } from "./config/Api";

export default function Login() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("marooframay@gmail.com");
    const [password, setPassword] = useState("devil890");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [remember, setRemember] = useState(false);
    const rememberImage = remember
        ? require("../assets/checkBox.png")
        : require("../assets/uncheckBox.png");

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg("Email and password are required");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            const response = await fetch(`${BASE_URL}/login`, {
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
                setErrorMsg(data.message || "Invalid email or password");
                return;
            } else {
                console.log("Token:", data.token);
                // Optionally navigate to login or home screen
                navigation.navigate("SignUp"); 
            }

            // TODO: navigate to your main/home screen when it's ready
            // navigation.replace("OnBoarding");
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
                title="Log In"
                subtitle="Please sign in to your existing account"
                showBackButton={false}
            />

            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <EmailField
                        value={email}
                        onChangeText={setEmail}
                    />
                    <PasswordField
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errorMsg ? (
                        <Text style={styles.errorText}>{errorMsg}</Text>
                    ) : null}
                    <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => setRemember(!remember)}>
                                <Image
                                    source={rememberImage}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, fontWeight: "regular", color: Colors.darkGrey, marginLeft: 10 }}>
                                Remember me
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                            <Text style={{ fontSize: 14, fontWeight: "regular", color: Colors.orangeColor }}>
                                Forget Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.orangeColor} />
                        ) : (
                            <OrangeButton title="Login" />
                        )}
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", flexDirection: "row", gap: 11, marginVertical: 30 }}>
                        <Text style={{ fontSize: 16, fontWeight: "200", color: Colors.regularTextGrey }}>
                            Don’t have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.orangeColor }}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: "300", color: Colors.regularTextGrey, textAlign: "center" }}>
                        Or
                    </Text>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 30, marginVertical: 20 }}>
                        <TouchableOpacity>
                            <Image style={styles.socialIcons}
                                source={require("../assets/facebook.png")}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.socialIcons}
                                source={require("../assets/twitter.png")}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.socialIcons}
                                source={require("../assets/apple.png")}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
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
    errorText: {
        color: "red",
        marginTop: 10,
        fontSize: 14,
    },
});
