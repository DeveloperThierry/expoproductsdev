import { useAuth } from "@/auth/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface IUser {
  username: string;
  password: string;
}
const SignUpScreen = () => {
  const { user, signUp } = useAuth();
  const router = useRouter();
  const [newUser, setNewUser] = useState<IUser>({ username: "", password: "" });
  useEffect(() => {
    if (user !== null) router.replace("/");
  }, [user]);
  const handleSubmit = () => {
    if (newUser.username.trim() == "" || newUser.password.trim() == "") {
      alert("username and password required");
      return;
    }
    signUp(newUser.username, newUser.password);
    router.push("/")
  };
  return (
    <SafeAreaView style={{padding:10, gap:10}} >

      <Text style={{marginBottom:20}}>Sign Up</Text>
      <Text>username</Text>
      <TextInput
        value={newUser.username}
        style={{ borderWidth: 1, padding: 10 }}
        onChangeText={(text) => setNewUser((prev) => ({...prev, username:text}))}
        />
      <Text>password</Text>
      <TextInput
        value={newUser.password}
        secureTextEntry={true}
        style={{ borderWidth: 1, padding: 10 }}
        onChangeText={(text) => setNewUser((prev) => ({...prev, password:text}))}
        
        />
      <Pressable style={{ backgroundColor: "lightgrey", padding: 10 }} onPress={handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
        </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
