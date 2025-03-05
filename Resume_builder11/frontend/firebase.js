import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8l9sa4L4H6dcoVMlreFAcoDjo2SHQW44",
  authDomain: "resumesbyhirely-c83b4.firebaseapp.com",
  projectId: "resumesbyhirely-c83b4",
  storageBucket: "resumesbyhirely-c83b4.firebasestorage.app",
  messagingSenderId: "169341197880",
  appId: "1:169341197880:web:0457f4895bca624e9190cd",
  measurementId: "G-KK47EXQ6QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export { auth, googleProvider, githubProvider, signInWithPopup };
// const analytics = getAnalytics(app);