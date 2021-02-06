// self.addEventListener('push', event => {

//     const data = event.data.json()
//     console.log('New notification', data)
//     const options = {
//       body: data.body,
//     }
//     event.waitUntil(
//       self.registration.showNotification(data.title, options)
//     );
//   })

importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyDBgs0opwmRJRCl6-MsQ2b-5Jt8QgJQkTw",
    authDomain: "web-database-600a9.firebaseapp.com",
    projectId: "web-database-600a9",
    storageBucket: "web-database-600a9.appspot.com",
    messagingSenderId: "773209156761",
    appId: "1:773209156761:web:070955b95162990f1b9c08",
    measurementId: "G-3BHTRRBRK1"
  })

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload){
    console.log(payload)
})