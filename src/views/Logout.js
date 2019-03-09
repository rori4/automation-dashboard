import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    componentWillUnmount() {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('auth_token')
    }
    
  render() {
    return (
        <Redirect to="/" />
    )
  }
}
