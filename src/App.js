import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore"
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

  async function updatePost () {
    const hardcodedId = "CXQtsBxWb2cPfWYcp1WN"
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    const newPost = {
      ...post,
      title: "Land a $400k job"
    };
    updateDoc(postRef, newPost);
  }
  
  function deletePost() {
    const hardcodedId = "CXQtsBxWb2cPfWYcp1WN"
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid" , "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs);
  }

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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </nav>
  );
}

export default App;
