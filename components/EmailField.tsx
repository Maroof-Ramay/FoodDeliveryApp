import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Colors } from "../constants/Colors";

interface EmailFieldProps {
    value: string;
    onChangeText: (text: string) => void;
    label?: string;
    placeholder?: string;
}

export default function EmailField({
    value,
    onChangeText,
    label = "Email",
    placeholder = "example@gmail.com",
}: EmailFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.placeholderText}
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry={false}
                cursorColor={Colors.boldGrey}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: Colors.boldGrey,
        marginBottom: 8,
    },
    input: {
        height: 50,                 
        paddingHorizontal: 20,
        paddingVertical: 12,        
        borderRadius: 10,
        backgroundColor: Colors.textFieldBackground,
        color: Colors.boldGrey,
        fontSize: 16,
    },
})
