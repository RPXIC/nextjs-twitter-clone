import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "devter-30ad9.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
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

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = async () => {
  const devits = await db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()

  const { docs } = devits

  return docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    return {
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    }
  })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
