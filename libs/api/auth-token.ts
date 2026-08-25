import AsyncStorage from "@react-native-async-storage/async-storage";

let accessToken: string | null = null;

export const accessTokenManager = {
  async get() {
    const accessToken = await AsyncStorage.getItem("access_token");
    console.log({ accessToken });
    return accessToken;
  },

  set(token: string) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },
};
