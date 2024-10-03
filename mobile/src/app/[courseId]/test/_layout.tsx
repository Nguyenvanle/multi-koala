import { Colors } from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";

const TestLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Test Exam",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.teal_dark,
          },
          headerLeft: () => (
            <View style={{ marginBottom: 8 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};
