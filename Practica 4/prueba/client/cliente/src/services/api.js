const API_URL = 'http://localhost:5000/api/auth';

export const login = async (registro_academico, contrasena) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ registro_academico, contrasena }),
  });

  return response.json();
};

export const register = async (registro_academico, nombre, apellido, correo, contrasena) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ registro_academico, nombre, apellido, correo, contrasena }),
  });

  return response.json();
};

