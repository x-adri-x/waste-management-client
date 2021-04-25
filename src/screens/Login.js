import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from '../firebase.js'
import {authState, emailState, passwordState} from '../atoms/Atoms.js'
import {useRecoilState} from 'recoil'

function Login() {
    const [email, setEmail] = useRecoilState(emailState)
    const [password, setPassword] = useRecoilState(passwordState)
    const [auth, setAuth] = useRecoilState(authState)

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            setEmail('')
            setPassword('')
            setAuth(true)
            sessionStorage.setItem('isAuth', 'true')
            askForNotificationPermission()
        })
        .catch(function(error){
            if (error.code === 'auth/user-not-found'){
              alert('User not found.')
            } else if (error.code === 'auth/wrong-password'){
              alert('Wrong password.')
            }
        })
    }

    const askForNotificationPermission = () => {
        const messaging = firebase.messaging()

        if(Notification.permission === 'granted') {
            messaging.getToken({vapidKey: process.env.REACT_APP_MESSAGING_VAPID_KEY}).then(function(token){console.log('Token: ' + token)})
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission()
            .then(function(permission){
                if(permission === 'granted') {
                    const notification = new Notification('It is granted now.')
                    if(process.env.NODE_ENV === 'development') console.log(notification)
                }
            })
        }
        messaging.onMessage(function(payload){
            console.log('onMessage: ' + payload)
        })
    }
  
    const handleChange = (e) => {
        e.target.type === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
    }
    
    return (
        <div className = 'login'>
            {!auth ? (
                <div>
                <h3>Login to the Admin Page</h3>
                <input type = 'email' value = {email} onChange = {e => {handleChange(e)}}></input>
                <input type = 'password' value = {password} onChange = {e => {handleChange(e)}}></input>
                <button onClick = {login} className = 'smallbutton'>Login</button>
                </div>
            ): null}
            
        </div>
    )
  }
  
  export default Login;
