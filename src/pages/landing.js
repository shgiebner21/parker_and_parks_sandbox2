import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import { connect  } from 'react-redux'
import firebase from 'firebase'
import { Card, CardSection, Spinner } from '../components/common'

import { GUEST_EMAIL, GUEST_PASSWORD } from 'react-native-dotenv'


class LandingPage extends Component {

  render() {
  
    const props = this.props

    const { width, height } = Dimensions.get('window')

    return (
      <ScrollView>
        <Card style={{ width: width * .95, height: height * .95 }} >
          <CardSection>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

              <Image style={styles.cpcImage}
                  source={require('../images/evening-over-colonial-lake.jpg')} />

                <Image style={styles.puppyImage}
                  source={require('../images/peter_puppy.jpg')} />

                <Text style={{ fontSize: 20, alignSelf: 'center' }} >Hi!  I'm Petey the Puppy and I love to play in the parks in Charleston.</Text>
                <Text style={{ fontSize: 20, marginBottom: 20, alignSelf: 'center' }} >There are TEN great parks to play in so let's get started!</Text>

              <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 30 }}>
                <Link to='/signup'
                      style={styles.signupButtonStyle} >
                    <Text style={styles.buttonText}>  Signup  </Text>
                </Link>
                <Link to='/login'
                      style={styles.loginButtonStyle} >
                    <Text style={styles.buttonText}>   Login   </Text>
                </Link>
                <Link 
                onPress={this.props.onLogin(GUEST_EMAIL,
                  GUEST_PASSWORD, this.props.history)}
                      style={styles.signupButtonStyle} >
                    <Text style={styles.buttonText}>   Guest   </Text>
                </Link>
              </View>

                {props.family.loading
                  ?  <Spinner size='large' />
                  : null
                }

            </View>
          </CardSection>
        </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  puppyImage: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 55,
    marginBottom: 30,
  },
  cpcImage: {
    width: 300,
    height: 210,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 30
  },
  signupButtonStyle: {
    backgroundColor: '#87bfdb',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#87bfdb',
    marginLeft: 5,
    marginRight: 5
  },
  loginButtonStyle: {
    backgroundColor: '#e7937d',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e7937d',
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
})


const mapStateToProps = (state) => ({
  family: state.family
})

const mapActionsToProps = (dispatch) => ({

  onLogin: (email, password, history) => (e) => {
    dispatch({ type: 'LOGGING_IN' })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, history))
      .catch( () => loginUserFail(dispatch) )
  }
})

{/*********  Helper functions  *********/}

const loginUserSuccess = (dispatch, user, history) => {
  dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    history.push('/family')
}
const loginUserFail = (dispatch) => {
  dispatch({ type: 'LOGIN_FAIL' })
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(LandingPage)
