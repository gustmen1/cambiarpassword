import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://example.com/api', // Esto simula la URL de una API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
