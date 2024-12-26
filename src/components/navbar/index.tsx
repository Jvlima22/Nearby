import { IconHome, IconMap, IconTicket, IconUserCircle } from "@tabler/icons-react-native";
import { View, TouchableOpacity } from "react-native";
import { s } from "./styles";
import { router } from "expo-router";

export function Navbar() {

  return (
    <View style={s.navbar}>
        <TouchableOpacity style={s.navItem} onPress={() => router.navigate("/home")}>
            <IconHome style={{ marginTop: -20}} size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.navigate("/map")}>
            <IconMap style={{ marginTop: -20}} size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.navigate("/coupons")}>
            <IconTicket style={{ marginTop: -20}} size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.navigate("/account")}>
            <IconUserCircle style={{ marginTop: -20}} size={28} color="white" />
        </TouchableOpacity>
    </View>
  );
}

