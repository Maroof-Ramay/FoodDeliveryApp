import { View, TextInput, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../constants/Colors";

interface CodeInputProps {
    code: string;
    setCode: (value: string) => void;
    length?: number; // default 4
}

export default function CodeInput({ code, setCode, length = 4 }: CodeInputProps) {
    const [focusedIndex, setFocusedIndex] = useState(0);

    const inputsRef = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    let newCode = code.split("");
    newCode[index] = text;
    setCode(newCode.join(""));

    if (!text && index > 0) {
        inputsRef.current[index - 1].focus(); 
    } else if (text && index < length - 1) {
        inputsRef.current[index + 1].focus(); 
    }
};


    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(length)
                .fill(0)
                .map((_, index) => (
                    <TextInput
                        key={index}
                        ref={ref => { inputsRef.current[index] = ref! }}
                        style={[
                            styles.input,
                            focusedIndex === index && { borderColor: Colors.orangeColor }
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={code[index] || ""}
                        onChangeText={text => handleChange(text, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(-1)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        textAlign="center"
                    />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        gap: 10,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.textFieldBackground,
        borderRadius: 10,
        fontSize: 24,
        color: Colors.boldGrey,
        backgroundColor: Colors.textFieldBackground,
    },
});
