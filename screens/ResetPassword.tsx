import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import AuthenticationTopView from "../components/AuthenticationTopView";
import PasswordField from "../components/PasswordField";
import OrangeButton from "../components/OrangeButton";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation/MainNavigator";
import { BASE_URL } from "../screens/config/Api";

type ResetPasswordRouteProp = RouteProp<RootStackParamList, "ResetPassword">;

export default function ResetPassword({ route }: { route: ResetPasswordRouteProp }) {
    const { emailAddress } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!password || !rePassword) {
      setErrorMsg("Both fields are required");
      return;
    }

    if (password !== rePassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailAddress, // ✅ backend expects `email`
            newPassword: password,
          }),          
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Something went wrong");
        return;
      }

      // ✅ Password updated successfully
      navigation.replace("Login");
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
        title="Reset Password"
        subtitle="Please enter your new password"
      />
      <View style={styles.main}>
        <PasswordField value={password} onChangeText={setPassword} label="New Password" />
        <PasswordField value={rePassword} onChangeText={setRePassword} label="Re-Type New Password" />
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        <TouchableOpacity style={{ marginTop: 30 }} onPress={handleSave} disabled={loading}>
          <OrangeButton title={loading ? "Saving..." : "Save"} />
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
