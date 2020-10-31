import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** AUTH API ***

  doCreateUserWithEmailAndPassword = (shopName, email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.db.collection('users').doc(this.auth.currentUser.uid)
          .set({
            shopName: shopName
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  doSignInWithEmailAndPassword = async (email, password) => {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );

      return null;
    } catch (error) {
      return error;
    }
  };

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = async (email) => {
    try {
      const result = await this.auth.sendPasswordResetEmail(email);
      return null;
    } catch (error) {
      return error;
    }
  };

  doPasswordUpdate = async (password) => {
    try {
      const result = await this.auth.currentUser.updatePassword(password);
      return null;
    } catch (error) {
      return error;
    }
  };
}

export default Firebase;