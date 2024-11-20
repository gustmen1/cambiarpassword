import { useState } from 'react';
import axios from '../axiosConfig'; // Asegúrate de que esta ruta sea correcta

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulación de llamada a la base de datos
      const response = await axios.post('/change-password', userData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return { changePassword, loading, error };
};

export default useAuth;
