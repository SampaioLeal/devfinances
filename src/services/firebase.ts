import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class FirebaseServices {
  db: firebase.firestore.Firestore;

  private auth;
  private config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  constructor() {
    firebase.initializeApp(this.config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return this.auth.signInWithPopup(provider);
  }

  generateUserInfo(uid: string) {
    return this.db.collection("users").doc(uid).set({
      inputs: 0,
      outputs: 0,
    });
  }

  listenAuth(
    callback:
      | firebase.Observer<any, Error>
      | ((a: firebase.User | null) => any),
    error?: ((a: firebase.auth.Error) => any) | undefined
  ) {
    return this.auth.onAuthStateChanged(callback);
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }
}

const firebaseServices = new FirebaseServices();
export default firebaseServices;
