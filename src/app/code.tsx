import { Button } from "@/components/button"
import { colors, fontFamily } from "@/styles/theme"
import { IconArrowLeft } from "@tabler/icons-react-native"
import { router } from "expo-router"
import { View, Text, Image } from "react-native"
import { OtpInput } from "react-native-otp-entry"


export default function Code () {

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
                Verificação de e-mail
            </Text>           
            
            <Text 
                style={{
                    fontSize: 16,
                    fontFamily: fontFamily.regular,
                    color: colors.gray[500],
                    marginTop: 10,
                }}
            >
               Digite o código de verificação que acabamos de enviar para seu endereço de e-mail.
            </Text>  
   
            <View style={{ marginTop: 32 }}>
                <OtpInput numberOfDigits={4} onTextChange={(text) => console.log(text)} />
            </View>   

            <Button style={{ marginTop: 32 }} buttonColor="green" onPress={() => router.navigate("/newPassword")}>
                <Button.TitleWhite>Verificar</Button.TitleWhite>
            </Button>

        </View>
    </View>
    )
}