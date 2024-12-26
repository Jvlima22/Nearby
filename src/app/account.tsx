import { Button } from "@/components/button"
import { Navbar } from "@/components/navbar"
import { api } from "@/services/api"
import { colors, fontFamily } from "@/styles/theme"
import { IconArrowLeft, IconId, IconUserCircle, IconHeart, IconSettings, IconLogout2 } from "@tabler/icons-react-native"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from "expo-image-picker"

export default function Account() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)

  // Função de Logout
  const handleLogout = async () => {
    try {
      // Remove os dados do AsyncStorage
      await AsyncStorage.removeItem('@userId');
      await AsyncStorage.removeItem('@authToken'); // Caso tenha um token de autenticação

      // Alerta de sucesso
      Alert.alert("Logout", "Você saiu da conta com sucesso!");

      // Redireciona para a tela de login
      router.navigate("/signin"); // Substitui a rota atual pela tela de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  // Atualizar todos os dados do usuário
  const updateUserData = async (updatedData: {
    name: string;
    username: string;
    email: string;
    phone: string;
    password?: string;
    image?: string;
    cover?: string;
  }) => {
    try {
      if (!userId) {
        Alert.alert("Erro", "ID do usuário não encontrado.");
        return;
      }

      // Validação de dados básicos (exemplo)
      if (!updatedData.name || !updatedData.email || !updatedData.username || !updatedData.phone) {
        Alert.alert("Erro", "Todos os campos obrigatórios devem ser preenchidos.");
        return;
      }

      await api.put(`/profile/${userId}`, updatedData);

      Alert.alert("Sucesso", "Dados do perfil atualizados com sucesso!");
      getUserProfile(userId); // Atualiza os dados exibidos após a alteração
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados do perfil.");
    }
  };

  // Pegar userId do AsyncStorage
  const getUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('@userId')
      if (storedUserId) {
        setUserId(storedUserId)
      } else {
        console.error("userId não encontrado no AsyncStorage")
      }
    } catch (error) {
      console.error("Erro ao recuperar userId do AsyncStorage:", error)
    }
  };

  // Buscar imagem de perfil
  const getProfileImage = async (userId: string) => {
    try {
      const { data } = await api.get(`/profile/${userId}/profile-image`)
      setProfileImage(data.imageUrl)
    } catch (error) {
      console.error("Erro ao buscar imagem de perfil:", error)
    }
  }

  // Buscar dados do usuário
  const getUserProfile = async (userId: string) => {
    try {
      const { data } = await api.get(`/profile/${userId}`)
      setUserData(data.user)
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error)
    }
  }

  // Atualizar imagem de perfil
  const updateProfileImage = async (uri: string) => {
    try {
      const formData = new FormData()
      formData.append("image", {
        uri,
        type: "image/jpeg",
        name: "profile.jpg"
      } as any)

      await api.put(`/profile/${userId}/profile-image`, { image: uri })

      Alert.alert("Sucesso", "Imagem de perfil atualizada com sucesso!")
      setProfileImage(uri)
    } catch (error) {
      console.error("Erro ao atualizar imagem de perfil:", error)
      Alert.alert("Erro", "Não foi possível atualizar a imagem de perfil.")
    }
  }

  // Selecionar imagem da galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permissão Negada", "Permissão para acessar a galeria é necessária.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets?.[0]?.uri) {
      updateProfileImage(result.assets[0].uri)
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  useEffect(() => {
    if (userId) {
      getProfileImage(userId)
      getUserProfile(userId)
    }
  }, [userId])

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      {/* Botões */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 40,
          zIndex: 1,
        }}
      >
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>

      {/* Imagem de Capa */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 0 }}>
      <TouchableOpacity onPress={pickImage}>
        {userData?.cover ? (
          <Image
            source={{ uri: userData.cover }}
            style={{
              width: "100%",
              height: 250,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
            resizeMode="cover"
          />
        ) : (
          <Text>Carregando capa...</Text>
        )}
        </TouchableOpacity>
      </View>

      {/* Exibindo imagem de perfil */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require("@/assets/profile.png")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: "#ccc",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Detalhes do Usuário */}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: fontFamily.bold,
            color: colors.gray[600],
          }}
        >
          @{userData ? userData.username : "Carregando..."} 
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontFamily: fontFamily.bold,
            color: colors.gray[600],
          }}
        >
          {userData ? userData.name : "Carregando..."} 
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: fontFamily.regular,
            color: colors.gray[500],
            marginTop: 4,
          }}
        >
          {userData ? userData.email : "Carregando..."} 
        </Text>
      </View>

      <View style={{ padding: 40 }}>
        <TouchableOpacity 
          onPress={() => router.navigate("/profile")} 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            padding: 12, 
            borderWidth: 1, 
            borderColor: colors.gray[300], 
            borderRadius: 8,
            marginBottom: 20 
          }}
        >
          <IconUserCircle style={{ marginRight: 16 }} size={28} color="black" />
          <Text style={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: colors.black.base }}>
            Meu perfil
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.navigate("/")} 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            padding: 12, 
            borderWidth: 1, 
            borderColor: colors.gray[300], 
            borderRadius: 8,
            marginBottom: 20 
          }}
        >
          <IconId style={{ marginRight: 16 }} size={28} color="black" />
          <Text style={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: colors.black.base }}>
            Dados pessoais
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.navigate("/favorites")} 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            padding: 12, 
            borderWidth: 1, 
            borderColor: colors.gray[300], 
            borderRadius: 8,
            marginBottom: 20 
          }}
        >
          <IconHeart style={{ marginRight: 16 }} size={28} color="black" />
          <Text style={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: colors.black.base }}>
            Favoritos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.navigate("/settings")} 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            padding: 12, 
            borderWidth: 1, 
            borderColor: colors.gray[300], 
            borderRadius: 8,
            marginBottom: 20 
          }}
        >
          <IconSettings style={{ marginRight: 16 }} size={28} color="black" />
          <Text style={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: colors.black.base }}>
            Configurações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleLogout} 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            marginTop: 30, 
            padding: 12, 
            borderWidth: 1, 
            borderColor: colors.gray[300], 
            borderRadius: 8,
            marginBottom: 20  
          }}
        >
          <IconLogout2 style={{ marginRight: 16 }} size={28} color="black" />
          <Text style={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: colors.black.base }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Navbar />
      </View>
    </View>
  )
}
