
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../style";

// Novo componente com nomes e frases diferentes
export default function InspiraMensagem() {
  const mensagens = [
    "A inovação começa na coragem.",
    "Transforme desafios em oportunidades.",
    "A jornada é tão importante quanto o destino.",
    "Aprender é evoluir sempre.",
    "Seu esforço constrói o futuro."
  ];

  const [mensagem, setMensagem] = useState(null);

  function sortearMensagem() {
    const indice = Math.floor(Math.random() * mensagens.length);
    setMensagem(mensagens[indice]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Inspire-se!</Text>
      <TouchableOpacity style={styles.botao} onPress={sortearMensagem}>
        <Text style={styles.botaoTexto}>Sortear mensagem</Text>
      </TouchableOpacity>
      {mensagem && (
        <View style={styles.mensagemBox}>
          <Text style={styles.frase}>{mensagem}</Text>
        </View>
      )}
    </View>
  );
}

