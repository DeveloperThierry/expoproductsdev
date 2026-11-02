import { Stack } from "expo-router";
import "../../global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/auth/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown:false}}/>
    </AuthProvider>
  );
}
