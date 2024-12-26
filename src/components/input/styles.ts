import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EDF1F3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 46,
    color: '#000',
    paddingVertical: 0,
    paddingLeft: 10,
  },
});
