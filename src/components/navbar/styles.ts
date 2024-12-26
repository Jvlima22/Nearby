import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme"

export const s = StyleSheet.create({
    calloutTitle: {
        fontSize: 14,
        color: colors.gray[600],
        fontFamily: fontFamily.regular,
    },
    calloutSubtitle: {
        fontSize: 12,
        color: colors.gray[600],
        fontFamily: fontFamily.regular,
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 80,
        backgroundColor: colors.green.base,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: "white",
        fontFamily: fontFamily.regular,
    },
})