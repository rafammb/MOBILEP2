
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { styles } from "../style";

// Novo componente com nomes e textos diferentes
export default function ListaNotas() {
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([]);

  function adicionarNota() {
    if (nota.trim() === "") return;
    setNotas([...notas, { id: Date.now().toString(), conteudo: nota }]);
    setNota("");
  }

  function apagarNota(id) {
    setNotas(notas.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Notas</Text>
      <TextInput
        placeholder="Digite uma nota ou lembrete"
        value={nota}
        onChangeText={setNota}
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={adicionarNota}>
        <Text style={styles.botaoTexto}>Salvar nota</Text>
      </TouchableOpacity>
      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => apagarNota(item.id)}>
            <Text style={styles.item}>📝 {item.conteudo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
