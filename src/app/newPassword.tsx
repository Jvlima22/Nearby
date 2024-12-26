import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { colors, fontFamily } from "@/styles/theme";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";

export default function NewPassword() {
    const [password, setPassword] = useState("");
    
    return (
        <View style={{ flex: 1, padding: 40}}>
            <Button style={{ width: 40, height: 40, marginTop: 40, justifyContent: "center", alignItems: "center"  }} onPress={() => router.back()}>
                <Button.Icon icon={IconArrowLeft} />
            </Button>

            <View style={{justifyContent: "center", paddingVertical: 40}}>
                <Text 
                    style={{ 
                        fontSize: 24,
                        fontFamily: fontFamily.bold,
                        color: colors.gray[600],
            
                    }}
                >
                    Criar nova senha
                </Text>           
                
                <Text 
                    style={{
                        fontSize: 16,
                        fontFamily: fontFamily.regular,
                        color: colors.gray[500],
                        marginTop: 10,
                    }}
                >
                    Sua nova senha deve ser diferente das usadas anteriormente.
                </Text>  
                
                <View style={{ marginTop: 32 }}>
                    <Input placeholder="Senha:" value={password} onChangeText={setPassword} />
                    <Input placeholder="Confirme a senha:" value={password} onChangeText={setPassword} />
                </View>    

                <Button style={{ marginTop: 32 }} buttonColor="green" onPress={() => router.navigate("/verifyEmail")}>
                    <Button.TitleWhite>Redefinir senha</Button.TitleWhite>
                </Button>

            </View>
        </View>
    );
}