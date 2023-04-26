import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { auth } from "./firebase/init";
import companyLogo from "./Assets/Frontend Simplified Logo.853fbda.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "password")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "password")
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <nav className="nav__bar">
      <figure className="bars__logo">
        <button className="bars">
          <FontAwesomeIcon icon="bars" />
        </button>
        <img src={companyLogo} className="logo" alt="" />
      </figure>
      <div className="user__info">
        {loading ? (
          <>
            <div className="skeleton skeleton__button"></div>
            <div className="skeleton skeleton__icon"></div>
          </>
        ) : (
          <>
            {user.email ? (
              <>
                <button onClick={logout} className="user__icon">
                  {user.email[0].toUpperCase()}
                </button>
              </>
            ) : (
              <>
                <button onClick={login} className="btn nav__sign-in">
                  Login
                </button>
                <button onClick={register} className="btn nav__sign-out">
                  Register
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default App;
