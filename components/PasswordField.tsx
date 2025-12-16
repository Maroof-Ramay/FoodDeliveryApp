import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from "../constants/Colors";

interface PasswordFieldProps {
    value: string;
    onChangeText: (text: string) => void;
    label?: string;
    placeholder?: string;
}

export default function PasswordField({
    value,
    onChangeText,
    label = "Password",
    placeholder = "* * * * * * * *",
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const eyeImage = showPassword
        ? require("../assets/eye.png")
        : require("../assets/eye-off.png");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholderText}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    cursorColor={Colors.boldGrey}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.icon}
                >
                    <Image
                        source={eyeImage}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: Colors.boldGrey,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.textFieldBackground,
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: Colors.boldGrey,
        paddingVertical: 12,
    },
    icon: {
        marginRight: 20,
        marginBottom: 18
    },
    image: {
        width: 20,
        height: 20,
        position: "absolute",
    },
})
