import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        height: 56,
        maxHeight: 56,
        backgroundColor: colors.green.base,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 14
    },
    title: {
        color: colors.black.base,
        fontFamily: fontFamily.semiBold,
        fontSize: 16
    },
    image: {
        width: 24,
        height: 24,
    }
})