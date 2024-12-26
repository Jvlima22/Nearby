import { View, Text, Image, Modal } from "react-native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { colors, fontFamily } from "@/styles/theme";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function Recovery() {
    const [email, setEmail] = useState("");

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
                    Esqueceu sua senha?
                </Text>           
                
                <Text 
                    style={{
                        fontSize: 16,
                        fontFamily: fontFamily.regular,
                        color: colors.gray[500],
                        marginTop: 10,
                    }}
                >
                    Não se preocupe! Isso acontece. Insira o endereço de e-mail vinculado à sua conta.
                </Text>  
                
                <View style={{ marginTop: 32 }}>
                    <Input  title="E-mail:" value={email} onChangeText={setEmail} />
                </View>    

                <Button style={{ marginTop: 32 }} buttonColor="green" onPress={() => router.navigate("/code")}>
                    <Button.TitleWhite>Enviar código</Button.TitleWhite>
                </Button>
                
            </View>
        </View>
    );
}