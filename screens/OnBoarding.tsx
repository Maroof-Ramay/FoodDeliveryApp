import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import PagerView from "react-native-pager-view";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/navigation/MainNavigator";

export default function OnBoarding() {
    const pagerRef = useRef<PagerView>(null);
    const [page, setPage] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const pages = [
        {
            title: "All your favorites",
            subtitle:
                "Get all your loved foods in one once place, you just place the order we do the rest",
            image: require("../assets/onboard1.png"), // change your image
        },
        {
            title: "Order from choosen chef",
            subtitle:
                "Your order will be delivered quickly and safely to your home.",
            image: require("../assets/onboard2.png"),
        },
        {
            title: "Free delivery offers",
            subtitle:
                "Track your food delivery live on the map from start to finish.",
            image: require("../assets/onboard3.png"),
        },
    ];

    const handleNext = () => {
        if (page < 2 && pagerRef.current) {
            pagerRef.current.setPage(page + 1);
        } else {
            navigation.replace("Login");
        }
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={(e) => setPage(e.nativeEvent.position)}
                ref={pagerRef}
                scrollEnabled = {false}
                onPageScroll={() => {}}
            >
                {pages.map((item, index) => (
                    <View key={index} style={styles.page}>
                        <View style={styles.imageBox}>
                            <Image
                                source={item.image}
                                style={{ width: "100%", height: "100%", borderRadius: 16 }}
                                resizeMode="cover"
                            />
                        </View>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                ))}
            </PagerView>

            <View style={styles.dotsContainer}>
                {pages.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            page === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextText}>
                        {page === 2 ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>

                {page !== 2 ? (
                    <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                ) : null}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        paddingTop: 114,
    },
    imageBox: {
        width: 240,
        height: 292,
        borderRadius: 12,
        marginBottom: 65,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.boldGrey,
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: Colors.regularTextGrey,
        textAlign: "center",
        fontWeight: "300",
    },

    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 200,
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#f2d3c2",
    },
    activeDot: {
        backgroundColor: Colors.orangeColor,
    },

    buttonContainer: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: "center",
        gap: 16,
    },
    nextButton: {
        width: "85%",
        paddingVertical: 22,
        backgroundColor: Colors.orangeColor,
        alignItems: "center",
        borderRadius: 12,
    },
    nextText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    skipText: {
        fontSize: 16,
        color: Colors.regularTextGrey,
    },
});
