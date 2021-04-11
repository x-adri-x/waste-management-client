import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {authState} from '../atoms/Atoms.js'


function ProtectedRoute ({children, rest}) {
    const auth = useRecoilValue(authState)

    return(
      <Route 
      {...rest}
      render = {({location}) => 
      sessionStorage.getItem('isAuth')?
        (children) 
        : (
          <Redirect 
            to = {{
              pathname: '/',
              state: {from:location}
            }}
          />
        )
      }
      />
    )
  }

export default ProtectedRoute
