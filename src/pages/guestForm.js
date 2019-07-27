import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card, CardSection, Button,
         Spinner } from '../components/common'

import { GUEST_EMAIL, GUEST_PASSWORD } from 'react-native-dotenv'


class GuestForm extends Component {

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button  onPress={this.props.onLogin(GUEST_EMAIL,
        GUEST_PASSWORD, this.props.history)} >
        Enter as Guest
      </Button>
    )
  }


  render() {
    const props = this.props
    const { width } = Dimensions.get('window')

    return (

      <Card>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            Please enter as a Guest here.
          </Text>
        </View>

      <CardSection>
      <View style={{ width: width * .4, flexDirection: 'row' }} >
      { this.renderButton() }

      <Link to='/' style={styles.buttonStyle} >
        <Text style={styles.buttonText} >   Back   </Text>
      </Link>

      </View>
    </CardSection>

      <View>
        <Image style={styles.cpcImage}
                source={require('../images/evening-over-colonial-lake.jpg')} />
      </View>

      </Card>

    )
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#e7937d',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    marginTop: 10
  },
  cpcImage: {
    width: 300,
    height: 210,
    alignSelf: 'center',
    marginTop: 20,

  },
  textStyle: {
    fontSize: 20
  },
  errorText: {
  fontSize: 14,
  alignItems: 'center',
  color: 'red'
  },
  buttonStyle: {
    backgroundColor: '#87bfdb',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#87bfdb',
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
}

const mapStateToProps = (state) => ({
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

export default connector(GuestForm)