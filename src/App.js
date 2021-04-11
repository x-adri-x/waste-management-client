import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {RecoilRoot} from 'recoil'
import Navbar from './components/Navbar.js'

 

function App (){

      return (
        <RecoilRoot>
            <Navbar />
        </RecoilRoot>
      )
}


export default App;
