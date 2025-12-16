import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from "../constants/Colors";

interface OrangeButtonProps {
    title: string;
}

export default function OrangeButton({
    title = "Button"
}) {
    return (
        <View>
            <Text style = {styles.orangerButton}>
                {title}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create ({
        orangerButton: {
            fontSize: 14, 
            fontWeight: "bold", 
            color: "white", 
            paddingVertical: 22, 
            backgroundColor: Colors.orangeColor, 
            textAlign: "center", 
            borderRadius: 12,
            width: "100%"
        }
    })