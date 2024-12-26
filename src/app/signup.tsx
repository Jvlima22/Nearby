import { View, Text, Image, Alert, ScrollView } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Separator } from "@/components/separator";
import { api } from "@/services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  async function handleSignup() {
    // Validação básica no frontend
    if (!name || !username || !email || !password) {
      Alert.alert("Erro", "Nome, email e senha são obrigatórios.");
      return;
    }
  
    try {
      console.log("Tentando criar novo usuário com:", { name, username, email, password });
  
      // Enviando somente os campos necessários (name, email e password)
      const { data } = await api.post("/users/signup", {
        name,
        username,
        email,
        password,
      });
  
      // Se o cadastro for bem-sucedido
      if (data) {
        Alert.alert("Cadastro", "Usuário criado com sucesso!", [
          { text: "OK", onPress: () => router.push("/signin") },
        ]);
      }
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
  
      // Tratamento de erros com base na resposta do backend
      if (error.response) {
        const errorMessage = error.response.data.message;
  
        // Erro de e-mail já registrado
        if (errorMessage === "Email já registrado") {
          Alert.alert("Erro", "O email fornecido já está em uso.");
        } else {
          // Outros erros do backend
          Alert.alert("Erro", errorMessage || "Houve um problema ao tentar criar a conta.");
        }
      } else {
        // Erro de rede ou outros problemas
        Alert.alert("Erro", "Houve um problema ao tentar criar a conta.");
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
          marginTop: 20
        }}
      >
        Crie aqui sua conta
      </Text>           
      <Text 
        style={{
          fontSize: 16,
          fontFamily: fontFamily.regular,
          color: colors.gray[500],
          marginTop: 10
        }}
      >
        Insira seu e-mail e crie uma senha para acessar sua conta
      </Text>  

      <View style={{ flex: 1, justifyContent: "center", marginTop: 60 }}>
        <Input placeholder="Nome e sobrenome:" value={name} onChangeText={setName} />
        <Input placeholder="Nome de usuário:" value={username} onChangeText={setUsername} />
        <Input placeholder="E-mail:" value={email} onChangeText={setEmail} />
        <Input placeholder="Senha:" value={password} onChangeText={setPassword} secureTextEntry />

        <Button
          buttonColor="green"
          onPress={handleSignup}
          style={{ marginTop: 8 }}
        >
          <Button.TitleWhite>Sign up</Button.TitleWhite>
        </Button>

        <Separator />

        <Button buttonColor="white" icon={require('@/assets/google.png')}>
          <Button.TitleBlack>Continue com o Google</Button.TitleBlack>
        </Button>

        <Button buttonColor="white" style={{ marginTop: 10}} icon={require('@/assets/mac.png')}>
          <Button.TitleBlack>Continue com a Apple</Button.TitleBlack>
        </Button>

        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontFamily: fontFamily.regular, color: colors.gray[400] }}>
            Já tem conta?{" "}
            <Text
              onPress={() => router.navigate("/signin")}
              style={{ color: colors.green.base }}
            >
              Entre aqui!
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
