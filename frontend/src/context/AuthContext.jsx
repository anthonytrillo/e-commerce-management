// import React, { createContext, useReducer, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   loading: true,
//   user: null,
//   error: null
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'USER_LOADED':
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: action.payload
//       };
//     case 'LOGIN_SUCCESS':
//     case 'REGISTER_SUCCESS':
//       localStorage.setItem('token', action.payload.token);
//       return {
//         ...state,
//         token: action.payload.token,
//         isAuthenticated: true,
//         loading: false,
//         error: null
//       };
//     case 'AUTH_ERROR':
//     case 'LOGIN_FAIL':
//     case 'REGISTER_FAIL':
//     case 'LOGOUT':
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//         user: null,
//         error: action.payload
//       };
//     case 'CLEAR_ERROR':
//       return {
//         ...state,
//         error: null
//       };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Cargar usuario
//   useEffect(() => {
//     const loadUser = async () => {
//       if (!state.token) {
//         dispatch({ type: 'AUTH_ERROR' });
//         return;
//       }

//       try {
//         // Configura axios para incluir el token en cada petición
//         const config = {
//           headers: {
//             'x-auth-token': state.token
//           }
//         };

//         const res = await axios.get('/api/users/me', config);
//         dispatch({
//           type: 'USER_LOADED',
//           payload: res.data
//         });
//       } catch (err) {
//         dispatch({ type: 'AUTH_ERROR' });
//       }
//     };

//     loadUser();
//   }, [state.token]);

//   // Registrar usuario
//   const register = async (formData) => {
//     try {
//       const res = await axios.post('/api/auth/register', formData);
//       dispatch({
//         type: 'REGISTER_SUCCESS',
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({
//         type: 'REGISTER_FAIL',
//         payload: err.response?.data?.message || 'Error al registrarse'
//       });
//     }
//   };

//   // Login usuario
//   const login = async (formData) => {
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({
//         type: 'LOGIN_FAIL',
//         payload: err.response?.data?.message || 'Error al iniciar sesión'
//       });
//     }
//   };

//   // Logout
//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//   };

//   // Limpiar errores
//   const clearError = () => {
//     dispatch({ type: 'CLEAR_ERROR' });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//         loading: state.loading,
//         user: state.user,
//         error: state.error,
//         register,
//         login,
//         logout,
//         clearError
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Configurar axios para incluir el token en cada petición
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['x-auth-token'] = state.token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [state.token]);

  // Cargar usuario
  useEffect(() => {
    const loadUser = async () => {
      if (!state.token) {
        dispatch({ type: 'AUTH_ERROR' });
        return;
      }

      try {
        const res = await axios.get('/api/users/me');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
      } catch (err) {
        dispatch({ 
          type: 'AUTH_ERROR',
          payload: err.response?.data?.message || 'Error de autenticación'
        });
      }
    };

    loadUser();
  }, [state.token]);

  // Registrar usuario
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
      return true;
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.message || 'Error al registrarse'
      });
      return false;
    }
  };

  // Login usuario
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      return true;
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.message || 'Error al iniciar sesión'
      });
      return false;
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Limpiar errores
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar el uso del contexto
export const useAuth = () => useContext(AuthContext);