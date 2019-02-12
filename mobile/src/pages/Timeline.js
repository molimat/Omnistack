import React, { Component } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../services/api";
import socket from "socket.io-client";

import Tweet from "../components/Tweet";
export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    //Aqui é importante verificar que é preciso colocar como funcao esse navigationOption para que consigamos acessar as propriedaes do navigation
    title: "Início",
    headerRight: (
      //A propriedade headerRight permite colocarmos um JSX dentro do nosso header.
      <TouchableOpacity onPress={() => navigation.navigate("New")}>
        <Icon
          name="add-circle-outline"
          size={24}
          color="#4BB0BB"
          style={{ paddingRight: 20 }}
        />
      </TouchableOpacity>
    )
  });
  state = {
    tweets: []
  };

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get("tweets");
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://192.168.100.4:3000");

    io.on("tweet", data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on("like", data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id} // é uma property que precisa retornar cada id unique para evitar problemas.
          renderItem={({ item }) => <Tweet tweet={item} />} //Aqui é o item que vai ser de fato mostrado
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
