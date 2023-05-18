import { View } from "react-native";

const LineDivider = (props: any) => {
  return (
    <View style={[{ width: 1 }, props.style]}>
      <View
        style={{
          flex: 1,
          borderLeftColor: "#64676D",
          borderLeftWidth: 1,
        }}
      />
    </View>
  );
};

export default LineDivider;
