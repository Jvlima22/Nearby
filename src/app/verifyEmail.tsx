import { Button } from "@/components/button";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";

export default function VerifyEmail() {

    return (
        <View style={{ flex: 1, padding: 40, justifyContent: "center"}}>
            <View style={{ justifyContent: "center", alignItems: "center"}}>
                <Image style={{ height: 138, width: 138}} source={require("@/assets/check-green.gif")} />
            </View>
            
            <View style={{ justifyContent: "center", alignItems: "center"}}>    
                <Text 
                    style={{
                        fontSize: 24,
                        fontFamily: fontFamily.bold,
                        color: colors.gray[600],
                    }}
                >
                    Senha alterada
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: fontFamily.regular,
                        color: colors.gray[500],
                        marginTop: 10,
                    }}
                >
                    Sua senha foi alterada com sucesso.
                </Text>
            </View>
            
            <View>
            <Button style={{ marginTop: 32 }} buttonColor="green" onPress={() => router.navigate("/signin")}>
                <Button.TitleWhite>Voltar para o Login</Button.TitleWhite>
            </Button>
            </View>
        </View>
    );
}