import React from "react";
import firebase from "firebase/app";

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  button: {
    marginLeft: 16,
    cursor: "pointer",
  },
};

const signin = () => {
  firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Header = ({ user, signOut }) => (
  <div style={styles.container}>
    {user ? (
      <>
        <p>Signed in as {user.displayName}</p>
        <button
          type="button"
          onClick={() => {
            signOut();
          }}
          style={styles.button}
        >
          Sign out
        </button>
      </>
    ) : (
      <>
        <button
          type="button"
          onClick={() => {
            signin();
          }}
          style={styles.button}
        >
          Sign in
        </button>
      </>
    )}
  </div>
);

export default Header;
