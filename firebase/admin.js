const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter-30ad9.firebaseio.com",
  })
} catch (e) {}

export const firestore = admin.firestore()
