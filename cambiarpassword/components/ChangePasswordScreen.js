import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import useAuth from '../hooks/useAuth';

const ChangePasswordScreen = () => {
  const { changePassword, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleContinue = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
      return;
    }
    setShowForm(true);
  };

  const handleChangePassword = async () => {
    console.log('Iniciando el proceso de cambio de contraseña...'); // Declaración de consola para depuración
    if (newPassword !== confirmNewPassword) {
      console.log('Las contraseñas no coinciden'); // Declaración de consola para depuración
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Simulación de búsqueda en la base de datos para la cédula y validación de la contraseña vieja
    const mockDatabase = { '12345678': 'oldpassword123' }; // Contraseña vieja simulada
    if (!mockDatabase[id]) {
      console.log('Cédula no encontrada en la base de datos.'); // Declaración de consola para depuración
      Alert.alert('Error', 'Cédula no encontrada en la base de datos.');
      return;
    }

    if (mockDatabase[id] !== oldPassword) {
      console.log('Contraseña vieja incorrecta.'); // Declaración de consola para depuración
      Alert.alert('Error', 'Contraseña vieja incorrecta.');
      return;
    }

    try {
      console.log('Enviando solicitud para cambiar la contraseña...'); // Declaración de consola para depuración
      await changePassword({ email, id, oldPassword, newPassword });
      setShowSuccessMessage(true);
    } catch (err) {
      console.log('Error al cambiar la contraseña:', err); // Declaración de consola para depuración
      Alert.alert('Error', error || 'Ocurrió un error');
    }
  };

  const handleContinueAfterSuccess = () => {
    setEmail('');
    setId('');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowForm(false);
    setShowSuccessMessage(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      {!showSuccessMessage && (
        <>
          <TextInput
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={handleEmailChange}
            style={[styles.input, !isEmailValid && { borderColor: 'red' }]}
          />
          {!showForm && (
            <Button
              title="Continuar"
              onPress={handleContinue}
            />
          )}
          {showForm && (
            <>
              <TextInput
                placeholder="Cédula"
                value={id}
                onChangeText={setId}
                style={styles.input}
              />
              <TextInput
                placeholder="Contraseña Vieja"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Confirmar Nueva Contraseña"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry
                style={styles.input}
              />
              <Button
                title={loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                onPress={handleChangePassword}
              />
            </>
          )}
        </>
      )}
      {showSuccessMessage && (
        <>
          <Text style={styles.successMessage}>Contraseña cambiada con éxito</Text>
          <Button
            title="Continuar"
            onPress={handleContinueAfterSuccess}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    marginVertical: 20,
  },
});

export default ChangePasswordScreen;







