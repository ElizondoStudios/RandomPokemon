import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

export default function App() {

  const [currentPokemon, setCurrentPokemon] = useState({name:'ditto', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'});
  const PokemonCount = useRef(1020);

  useEffect(() => {
    const randomPokemon = Math.floor(Math.random() * PokemonCount.current);
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then(response => response.json())
    .then(data => {
      setCurrentPokemon({name: data.name, img: data.sprites.front_default});
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pokemon_info}>
        <View style={styles.img_container}>
          <Image
            source={{
              uri: currentPokemon.img,
            }}
            style={styles.img}
          ></Image>
        </View>
        <Text style={styles.pokemon_name}>{currentPokemon.name}</Text>
      </View>
      <View>
        <Button
          title="Random Pokemon"
          onPress={() => {
            const randomPokemon = Math.floor(Math.random() * PokemonCount.current);
            fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
            .then(response => response.json())
            .then(data => {
              setCurrentPokemon({name: data.name, img: data.sprites.front_default});
            })
          }}
        ></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#454545',
  },
  img:{
    width: 200,
    height: 200,
  },
  img_container:{
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pokemon_name:{
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  pokemon_info:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
