import { View, Text } from "react-native";

const Category = (item: any) => {
  return (
    <>
      {item.genero.includes("ficcao") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkGreen",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Ficção
          </Text>
        </View>
      )}
      {item.genero.includes("religioso") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkRed",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Religioso
          </Text>
        </View>
      )}
      {item.genero.includes("Drama") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Drama
          </Text>
        </View>
      )}
      {item.genero.includes("autoajuda") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Autoajuda
          </Text>
        </View>
      )}
      {item.genero.includes("biografia") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Biografia
          </Text>
        </View>
      )}
      {item.genero.includes("crime") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Crime
          </Text>
        </View>
      )}
      {item.genero.includes("educacao") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Educação
          </Text>
        </View>
      )}
      {item.genero.includes("fantasia") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Fantasia
          </Text>
        </View>
      )}
      {item.genero.includes("gastronomia") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Gastronomia
          </Text>
        </View>
      )}
      {item.genero.includes("historia") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            História
          </Text>
        </View>
      )}
      {item.genero.includes("hq") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            HQ'S
          </Text>
        </View>
      )}
      {item.genero.includes("infantil") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Infantil
          </Text>
        </View>
      )}
      {item.genero.includes("literatura") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Literatura
          </Text>
        </View>
      )}
      {item.genero.includes("profissional") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Profissional
          </Text>
        </View>
      )}
      {item.genero.includes("religiao") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Religião
          </Text>
        </View>
      )}
      {item.genero.includes("romance") && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            marginRight: 8,
            backgroundColor: "darkBlue",
            height: 40,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}>
            Romance
          </Text>
        </View>
      )}
    </>
  );
};

export default Category;
