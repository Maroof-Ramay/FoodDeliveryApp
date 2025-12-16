import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Splash";
import Login from "../Login";
import OnBoarding from "../OnBoarding";
import ForgotPassword from "../ForgotPassword";
import Verification from "../Verification";
import ResetPassword from "../ResetPassword";
import SignUp from "../SignUp";

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    OnBoarding: undefined;
    ForgotPassword: undefined;
    Verification: { emailAddress: string };
    ResetPassword: undefined;
    SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {showSplash ? (
                    <Stack.Screen name="Splash">
                        {() => <Splash onFinish={() => setShowSplash(false)} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="OnBoarding" component={OnBoarding} />
                )}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
