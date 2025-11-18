
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../style";

// Novo componente com nomes e textos diferentes
export default function ConversorClima() {
  const [entrada, setEntrada] = useState("");
  const [resposta, setResposta] = useState(null);
  const [origem, setOrigem] = useState("celsius");
  const [destino, setDestino] = useState("kelvin");

  function transformarTemperatura() {
    const valorNum = parseFloat(entrada);
    if (isNaN(valorNum)) {
      setResposta("Digite um número válido");
      return;
    }

    let tempBase;
    switch (origem) {
      case "celsius":
        tempBase = valorNum;
        break;
      case "kelvin":
        tempBase = valorNum - 273.15;
        break;
      case "fahrenheit":
        tempBase = (valorNum - 32) * 5/9;
        break;
    }

    let resultadoFinal;
    switch (destino) {
      case "celsius":
        resultadoFinal = tempBase;
        break;
      case "kelvin":
        resultadoFinal = tempBase + 273.15;
        break;
      case "fahrenheit":
        resultadoFinal = tempBase * 9/5 + 32;
        break;
    }

    setResposta(resultadoFinal.toFixed(2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Transformador de Clima</Text>
      <Text style={styles.label}>Origem:</Text>
      <Picker
        selectedValue={origem}
        onValueChange={setOrigem}
        style={styles.picker}
      >
        <Picker.Item label="Celsius (°C)" value="celsius" />
        <Picker.Item label="Kelvin (K)" value="kelvin" />
        <Picker.Item label="Fahrenheit (°F)" value="fahrenheit" />
      </Picker>
      <Text style={styles.label}>Destino:</Text>
      <Picker
        selectedValue={destino}
        onValueChange={setDestino}
        style={styles.picker}
      >
        <Picker.Item label="Celsius (°C)" value="celsius" />
        <Picker.Item label="Kelvin (K)" value="kelvin" />
        <Picker.Item label="Fahrenheit (°F)" value="fahrenheit" />
      </Picker>
      <TextInput
        placeholder="Temperatura"
        keyboardType="numeric"
        value={entrada}
        onChangeText={setEntrada}
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={transformarTemperatura}>
        <Text style={styles.botaoTexto}>Transformar</Text>
      </TouchableOpacity>
      {resposta && (
        <Text style={styles.resultado}>
          Valor convertido: {resposta}
        </Text>
      )}
    </View>
  );
}
