import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import NativeTachyons from 'react-native-style-tachyons'
import { NativeRouter, Route, Switch } from 'react-router-native'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import store from '../../store'
import LandingPage from './landing'
import SignupForm from './signup'
import LoginForm from './loginForm'
import AddChildren from './addChildren'
import Family from './family'
import Child from './child'
import Park from './park'
import Activity from './activity'

NativeTachyons.build({ rem: 16 }, StyleSheet)

class App extends Component {
  componentWillMount() {
    firebase.initializeApp( {
      apiKey: "AIzaSyBK848H63omCPzO4yoOLYkE245zLHKb5Qk",
      authDomain: "parker-and-parks.firebaseapp.com",
      databaseURL: "https://parker-and-parks.firebaseio.com",
      projectId: "parker-and-parks",
      storageBucket: "parker-and-parks.appspot.com",
      messagingSenderId: "451581979277"
    })
  }


  render() {
    return (
      <NativeRouter>
        <View>
          <Route exact path='/' component={LandingPage} />
          <Switch>
            <Route path='/signup' component={SignupForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/children' component={AddChildren} />
            <Route path='/family' component={Family} />
            <Route path='/child' component={Child} />
            <Route path='/park' component={Park} />
            <Route path='/activity' component={Activity}  />

          </Switch>
        </View>
      </NativeRouter>
    )
  }
}


export default() => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}
