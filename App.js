
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import SaudeIndice from "./features/imc/imc.jsx";
import ConversorClima from "./features/clima/clima.jsx";
import InspiraMensagem from "./features/frases/frases.jsx";
import ListaNotas from "./features/fazerlista/fazerlista.jsx";
import { styles } from "./features/style.js";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [componenteAtivo, setComponenteAtivo] = useState(null);

  const microApps = [
    { nome: "IMC", componente: SaudeIndice },
    { nome: "Temperatura", componente: ConversorClima },
    { nome: "Sortear frases", componente: InspiraMensagem },
    { nome: "Lista Notas", componente: ListaNotas },
  ];

  const abrirMicroApp = (Componente) => {
    setComponenteAtivo(() => Componente);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setComponenteAtivo(null);
  };

  const ComponenteAtivo = componenteAtivo;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Apps</Text>
      <View style={localStyles.painelCards}>
        {microApps.map((app, index) => (
          <TouchableOpacity
            key={index}
            style={localStyles.card}
            onPress={() => abrirMicroApp(app.componente)}
          >
            <Text style={localStyles.cardTitulo}>{app.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={fecharModal}
      >
        <View style={localStyles.janelaModalFundo}>
          <View style={localStyles.janelaModal}>
            <TouchableOpacity style={styles.fecharBotao} onPress={fecharModal}>
              <Text style={styles.fecharTexto}>Fechar</Text>
            </TouchableOpacity>
            {ComponenteAtivo && <ComponenteAtivo />}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  painelCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#eebbc3",
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 22,
    margin: 8,
    minWidth: 140,
    alignItems: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitulo: {
    color: "#232946",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  janelaModalFundo: {
    flex: 1,
    backgroundColor: "rgba(35,41,70,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  janelaModal: {
    backgroundColor: "#121629",
    borderRadius: 24,
    padding: 24,
    minWidth: "80%",
    shadowColor: "#eebbc3",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
});


