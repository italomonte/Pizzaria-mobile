import { Text, View, StatusBar } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="1d1d2r" barStyle="light-content" translucent={false}/>
    </View>
  );
}
