import { View, Text, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme"; 
import { s } from "./styles";

type Props = TextInputProps & {
  title?: string;
  isPassword?: boolean;
  value: string;  // Adicionando a propriedade value
  onChangeText: (text: string) => void; // Passando a função onChangeText
};

export function Input({
  title,
  isPassword = false,
  value,
  onChangeText,
  ...rest
}: Props) {
  const [isSecure, setIsSecure] = useState(true);  // Não precisa mais do estado de 'text', pois o valor será controlado externamente

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={{ marginBottom: 14 }}>
      {title && <Text style={s.title}>{title}</Text>}

      <View style={s.inputContainer}>
        <TextInput
          {...rest}
          style={s.input}
          value={value}  // Usando o valor passado como propriedade
          onChangeText={onChangeText}  // Usando a função onChangeText passada como propriedade
          secureTextEntry={isPassword && isSecure} 
        />
        
        {isPassword && (
          <TouchableOpacity onPress={toggleSecureText}>
            {isSecure ? (
              <IconEyeOff size={24} color={colors.gray[400]} />
            ) : (
              <IconEye size={24} color={colors.gray[400]} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
