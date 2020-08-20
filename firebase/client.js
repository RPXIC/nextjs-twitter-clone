import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDSQg5R8eYPaHS-Bt0b7cs5m8I-cW6Lbpo",
    authDomain: "devter-30ad9.firebaseapp.com",
    databaseURL: "https://devter-30ad9.firebaseio.com",
    projectId: "devter-30ad9",
    storageBucket: "devter-30ad9.appspot.com",
    messagingSenderId: "19389826688",
    appId: "1:19389826688:web:4b6e872d40586768ab4865",
    measurementId: "G-NBXZFWFSXF"
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL } = user

    return {
        avatar: photoURL,
        username: displayName,
        email
    }
}

export const onAuthStateChanged = (onChange) => {
    return firebase.auth().onAuthStateChanged(user => {
        const normalizedUser = mapUserFromFirebaseAuthToUser(user)
        onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    return firebase.auth().signInWithPopup(githubProvider)
}