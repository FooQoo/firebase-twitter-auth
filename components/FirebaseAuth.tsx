import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const loginWithTwitter = () => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then((result) => {
      const credential: firebase.auth.OAuthCredential = result.credential;

      const db = firebase.firestore();

      db.collection("secrets")
        .doc(result.user.uid)
        .set({
          accessToken: credential.accessToken,
          accessTokenSecret: credential.secret,
        })
        .then();
    })
    .catch((error) => {
      console.log(error);
    });
};

const FirebaseAuth: React.FC = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? <button onClick={loginWithTwitter}> login </button> : null}
    </div>
  );
};

export default FirebaseAuth;
