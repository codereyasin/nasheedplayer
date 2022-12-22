import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDY-Zi65fQwAoHszxErQbgZZGxRiUFhBuc",
  authDomain: "music-app-ebae3.firebaseapp.com",
  projectId: "music-app-ebae3",
  storageBucket: "music-app-ebae3.appspot.com",
  messagingSenderId: "875298120728",
  appId: "1:875298120728:web:379f850629521008908f6d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };