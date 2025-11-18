
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../style";

// Novo componente com nomes e textos diferentes
export default function SaudeIndice() {
  const [massa, setMassa] = useState("");
  const [alturaMetros, setAlturaMetros] = useState("");
  const [indice, setIndice] = useState(null);

  function calcularIndice() {
    const m = parseFloat(massa);
    const h = parseFloat(alturaMetros);
    if (m > 0 && h > 0) {
      const resultado = m / (h * h);
      setIndice(resultado.toFixed(2));
    } else {
      setIndice("Preencha corretamente!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Índice de Saúde</Text>
      <TextInput
        placeholder="Massa corporal (kg)"
        keyboardType="numeric"
        style={styles.input}
        value={massa}
        onChangeText={setMassa}
      />
      <TextInput
        placeholder="Altura (metros)"
        keyboardType="numeric"
        style={styles.input}
        value={alturaMetros}
        onChangeText={setAlturaMetros}
      />
      <TouchableOpacity style={styles.botao} onPress={calcularIndice}>
        <Text style={styles.botaoTexto}>Calcular índice</Text>
      </TouchableOpacity>
      {indice && <Text style={styles.resultado}>Resultado: {indice}</Text>}
    </View>
  );
}

