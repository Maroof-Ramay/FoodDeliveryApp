import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";

export default function Login() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const rememberImage = remember
        ? require("../assets/checkBox.png")
        : require("../assets/uncheckBox.png");

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
                    <TouchableOpacity style={{ marginTop: 30 }}
                    // onPress={() => setRemember(!remember)}
                    >
                        <OrangeButton title="Login">

                        </OrangeButton>
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
    }
});
