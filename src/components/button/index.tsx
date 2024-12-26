import React from "react";
import { TouchableOpacityProps, TouchableOpacity, Text, TextProps, ActivityIndicator, Image, View } from "react-native";
import { s } from "./styles";
import { colors } from "@/styles/theme";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
  buttonColor?: "green" | "white";
  icon?: any; 
};

function Button({ children, style, isLoading = false, buttonColor = "green", icon, ...rest }: ButtonProps) {
  const backgroundColor = buttonColor === "white" ? colors.white.base : colors.green.base;
  const textColor = buttonColor === "white" ? colors.black.base : colors.white.base; 
  const borderColor = buttonColor === "white" ? colors.gray[200] : "transparent"; 

  return (
    <TouchableOpacity
      style={[ 
        s.container, 
        style, 
        {
          backgroundColor,
          borderColor,
          borderWidth: buttonColor === "white" ? 1 : 0, 
        },
      ]}
      activeOpacity={0.10}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon && <Image source={icon} style={{ width: 20, height: 20, marginRight: 8 }} />}
          <Text style={[s.title, { color: textColor }]}>
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function TitleWhite({ children, buttonColor = "green" }: TextProps & { buttonColor?: "green" | "white" }) {
  const textColor = buttonColor === "white" ? colors.black.base : colors.white.base;

  return <Text style={[s.title, { color: textColor }]}>{children}</Text>;
}

function TitleBlack({ children, buttonColor = "white" }: TextProps & { buttonColor?: "green" | "white" }) {
  const textColor = buttonColor === "green" ? colors.white.base : colors.black.base;

  return <Text style={[s.title, { color: textColor }]}>{children}</Text>;
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>;
};

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Icon = Icon;
Button.TitleBlack = TitleBlack;
Button.TitleWhite = TitleWhite;

export { Button };
