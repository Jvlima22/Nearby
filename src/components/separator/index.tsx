import { View, Text } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export function Separator (){
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.gray[300] }} />
            <Text style={{ marginHorizontal: 10, color: colors.gray[400], fontFamily: fontFamily.regular }}>
                Ou
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.gray[300] }} />
        </View>
    )
}