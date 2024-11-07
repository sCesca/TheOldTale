import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";

import { auth } from './FirebaseConfig.js';

import { ref, set, get, update } from 'firebase/database';

import { db } from "./FirebaseConfig.js";

class AuthServices {
  constructor() {
    this.auth = auth;
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      console.error("Error logging in: ", error);
      return { success: false, error };
    }
  }

  async register(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      console.error("Error registering: ", error);
      
      return { success: false, error };
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { success: true };
    } catch (error) {
      console.error("Error resetting password: ", error);
      return { success: false, error };
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error("Error logging out: ", error);
      return { success: false, error };
    }
  }
  
  async updateAuthProfile(user) {
    try {
      await updateProfile(user, { displayName: user.displayName });
      console.log('Perfil de autenticação atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar perfil de autenticação:', error);
      throw error;
    }
  }

  async setUserInDatabase(user) {
    try {
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        displayName: user.displayName,
        theme: user.theme
      });
      console.log('Dados atualizados no Realtime Database com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar dados no Realtime Database:', error);
      throw error;
    }
  }

  async updateUserInDatabase(user) {
    try {
        const userRef = ref(db, `users/${user.uid}`);
        await update(userRef, {
            theme: user.theme
        });
        console.log('Dados atualizados no Realtime Database com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar dados no Realtime Database:', error);
        throw error;
    }
}

  async buscarTheme(userId) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('Theme-buscar:', userData.theme);
      return userData.theme;
    }
    return '';
  }

  async buscarColor(userId) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('Color-buscar:', userData.color);
      return userData.color;
    }
    return '';
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
}

export default new AuthServices();