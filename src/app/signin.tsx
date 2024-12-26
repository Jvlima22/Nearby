import { View, Text, Image, Alert } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Separator } from "@/components/separator";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const storeUserId = async (userId: string) => {
        try {
            await AsyncStorage.setItem('@userId', userId);
            console.log("userId armazenado com sucesso:", userId); 
        } catch (error) {
            console.error("Erro ao armazenar userId:", error);
        }
    };

    async function handleLogin() {
        try {
            console.log("Tentando fazer login com:", { email, password });

            const { data } = await api.post("/users/signin", { email, password });

            console.log("Resposta do login:", data);

            if (data.message === "Login bem-sucedido") {
                // Verificar se o userId foi recebido
                const userId = data.userId;
                if (userId) {
                    // Armazenando o userId após o login bem-sucedido
                    storeUserId(userId);

                    Alert.alert("Login", "Autenticação bem-sucedida!", [
                        { text: "OK", onPress: () => router.push("/map") },
                    ]);
                } else {
                    Alert.alert("Erro", "ID de usuário não encontrado na resposta.");
                }
            } else {
                Alert.alert("Erro", "Credenciais inválidas, tente novamente.");
            }
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);

            if (error.response) {
                const errorMessage = error.response.data.message;

                if (errorMessage === "Usuário não encontrado") {
                    Alert.alert("Erro", "O email fornecido não está registrado.");
                } else if (errorMessage === "Senha incorreta") {
                    Alert.alert("Erro", "A senha fornecida está incorreta.");
                } else {
                    Alert.alert("Erro", "Houve um problema ao tentar fazer login.");
                }
            } else {
                Alert.alert("Erro", "Houve um problema ao tentar fazer login.");
            }
        }
    }

    return (
        <View style={{ flex: 1, padding: 40 }}>
            <Image
                source={require("@/assets/logo.png")}
                style={{
                    width: 48,
                    height: 48,
                    marginTop: 24,
                    marginBottom: 28,
                }}
            />

            <Text
                style={{
                    fontSize: 24,
                    fontFamily: fontFamily.bold,
                    color: colors.gray[600],
                    marginTop: 20,
                }}
            >
                Entre na sua conta
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: fontFamily.regular,
                    color: colors.gray[500],
                    marginTop: 10,
                }}
            >
                Digite seu e-mail e senha para efetuar login
            </Text>

            <View style={{ flex: 1, justifyContent: "center", marginTop: 60 }}>
                <Input placeholder="E-mail:" value={email} onChangeText={setEmail} />
                <Input placeholder="Senha:" value={password} onChangeText={setPassword} isPassword />

                <Text
                    onPress={() => router.navigate("/recovery")}
                    style={{ color: colors.green.base, marginTop: -4 }}
                >
                    Esqueceu a senha?
                </Text>

                <Button
                    buttonColor="green"
                    style={{ marginTop: 40 }}
                    onPress={handleLogin} // Chama a função handleLogin ao pressionar o botão
                >
                    <Button.TitleWhite>Sign in</Button.TitleWhite>
                </Button>

                <Separator />

                <Button buttonColor="white" icon={require('@/assets/google.png')}>
                    <Button.TitleBlack>Continue com o Google</Button.TitleBlack>
                </Button>

                <Button buttonColor="white" style={{ marginTop: 10 }} icon={require('@/assets/mac.png')}>
                    <Button.TitleBlack>Continue com a Apple</Button.TitleBlack>
                </Button>

                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray[400] }}>
                        Não tem conta?{" "}
                        <Text
                            onPress={() => router.navigate("/signup")}
                            style={{ color: colors.green.base }}
                        >
                            Crie aqui!
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}
