import firebase from 'firebase/app'
import 'firebase/database'

// Get a Firestore instance
export const db = firebase
    .initializeApp({
        projectId: 'fir-locations-c9e16',
        databaseURL: 'https://fir-locations-c9e16.firebaseio.com/'
    })
    .database()
