import AsyncStorage from "@react-native-async-storage/async-storage"
export const getAsyncUser = async () => {
    try {
        const res = await AsyncStorage.getItem("User")
        if(!res) return null
        const jsonValue = await JSON.parse(res)
        return jsonValue
    } catch (e) {
        console.log(e)
    }
}

export const setAsyncUser = async (username:string, password:string) => {
    try {
        const newUser = {username, password}
        const jsonValue = JSON.stringify(newUser)
        await AsyncStorage.setItem("User", jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const removeAsyncUser = async () => {
    try {
        await AsyncStorage.removeItem("User")
    } catch (e) {
        console.log(e)
    }
}