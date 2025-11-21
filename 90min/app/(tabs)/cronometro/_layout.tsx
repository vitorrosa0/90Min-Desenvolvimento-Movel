import { Stack } from "expo-router";
import { Image } from "react-native";

export default function CronometroLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#000",
        },
        headerShadowVisible: true,
        headerTitle: () => (
          <Image
            source={require("@/assets/images/icon-removebg-preview.png")}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
          />
        ),
        headerTitleAlign: "center",
      }}
    />
  );
}
