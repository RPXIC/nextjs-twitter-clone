import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDSQg5R8eYPaHS-Bt0b7cs5m8I-cW6Lbpo",
  authDomain: "devter-30ad9.firebaseapp.com",
  databaseURL: "https://devter-30ad9.firebaseio.com",
  projectId: "devter-30ad9",
  storageBucket: "devter-30ad9.appspot.com",
  messagingSenderId: "19389826688",
  appId: "1:19389826688:web:4b6e872d40586768ab4865",
  measurementId: "G-NBXZFWFSXF",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date
        )

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        }
      })
    })
}
