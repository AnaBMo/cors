const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3003;

const cors = require('cors'); // middleware que permite acceso a la información del fetch
app.use(cors());

// Esta ruta devuelve todos los personajes disponibles en la API de Rick and Morty.
app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results;
        
        res.json(characters);
        console.log(characters);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la obtención de personajes');
    }
});

// Obtener un personaje por nombre.
app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;
  
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
        const character = response.data.results[0];
  
        if (character) {
            res.json(character);
        } else {
            res.status(404).send('Personaje no encontrado');
        }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el personaje');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/characters`);
});