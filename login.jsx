import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "./App";

export default function LoginWithRegister() {
  const [logado, setLogado] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  // verifica se já existe user logado
  useEffect(() => {
    const verificarLogin = async () => {
      // Use o mesmo nome de chave para o usuário logado
      const user = await AsyncStorage.getItem("logado");
      if (user) setLogado(true);
    };
    verificarLogin();
  }, []);

  // cadastrar um novo usuário
  const registrar = async () => {
    if (!usuario || !senha) {
      alert("Preencha usuário e senha");
      return;
    }

    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    if (lista.find((u) => u.usuario === usuario)) {
      alert("Usuário já existe!");
      return;
    }

    const novoUser = [...lista, { usuario, senha }];
    await AsyncStorage.setItem("usuarios", JSON.stringify(novoUser));

    alert("Usuário cadastrado com sucesso!");
    setModoCadastro(false);
    setUsuario("");
    setSenha("");
  };

  // login
  const fazerLogin = async () => {
    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const lista = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const existe = lista.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (!existe) {
      alert("Usuário ou senha incorretos");
      return;
    }

    await AsyncStorage.setItem("logado", usuario); // Salva o nome de usuário como logado
    setLogado(true);
  };

  // logout
  const sair = async () => {
    await AsyncStorage.removeItem("logado");
    setLogado(false);
    setUsuario(""); // Limpa o estado após o logout
    setSenha("");
  };

  // ------------------
  // UI não logado
  // ------------------
  if (!logado) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>{modoCadastro ? "Criar Conta" : "Entrar"}</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          {!modoCadastro && (
            <TouchableOpacity style={styles.button} onPress={fazerLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          )}

          {modoCadastro && (
            <TouchableOpacity style={styles.button} onPress={registrar}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.switchButton} onPress={() => setModoCadastro(!modoCadastro)}>
            <Text style={styles.switchButtonText}>
              {modoCadastro ? "Já tem conta? Faça login" : "Criar nova conta"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ------------------
  // UI logado
  // ------------------
  return (
    <View style={styles.loggedContainer}>
      <App />
      <TouchableOpacity style={styles.logoutButton} onPress={sair}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232946", // fundo padrão do site
    justifyContent: "center",
  },

  content: {
    padding: 30,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#121629",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 30,
    color: "#eebbc3",
    letterSpacing: 1.5,
    textShadowColor: "#121629",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#eebbc3",
    borderRadius: 12,
    backgroundColor: "#393e6a",
    fontSize: 16,
    color: "#eebbc3",
    textAlign: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  button: {
    width: "100%",
    padding: 15,
    borderRadius: 14,
    backgroundColor: "#eebbc3",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#121629",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  buttonText: {
    color: "#232946",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  switchButton: {
    marginTop: 20,
    padding: 10,
  },

  switchButtonText: {
    color: "#f6c90e",
    fontSize: 14,
    fontWeight: "bold",
  },

  loggedContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#121629",
  },

  logoutButton: {
    padding: 15,
    backgroundColor: "#f6c90e",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  logoutButtonText: {
    color: "#232946",
    fontSize: 16,
    fontWeight: "900",
  },
});