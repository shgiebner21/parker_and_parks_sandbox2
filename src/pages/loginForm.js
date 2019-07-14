import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { pathOr } from 'ramda'
import { Card, CardSection, Button,
         InputField, Spinner } from '../components/common'


class LoginForm extends Component {

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button  onPress={this.props.onLogin(this.props.family.eMail,
                        this.props.family.password,
                        this.props.history)} >
        Login</Button>
    )
  }

  passwordText() {
    if (this.props.family.password.length < 6) {
          return <Text style={styles.errorText}>(password must have six or more characters)</Text>
    }
        return <Text style={{ color: 'grey' }}  >(password meets login requirements)</Text>
  }

  render() {
    const props = this.props
    const { width, height } = Dimensions.get('window')

    return (
      <ScrollView>
        <Card>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Please login here.
            </Text>
          </View>


          <CardSection>
            <InputField label={'E-mail'}
                        placeholder={'email@email.com'}
                        value={pathOr('', ['family', 'eMail'], props) }
                        onChangeText={ txt => props.changeEmail(txt) }
                        keyboardType={'email-address'}
                        autoCorrect={false}
            />
          </CardSection>
          <CardSection>
            <InputField label={'Password'}
                        placeholder={'p@ssWord'}
                        secureTextEntry={true}
                        value={pathOr('', ['family', 'password'], props) }
                        onChangeText={ txt => props.changePassword(txt) }
                        autoCorrect={false}
            />
          </CardSection>

          <CardSection>
            { this.passwordText() }
          </CardSection>
          <Text style={styles.errorText} >{this.props.family.error}</Text>

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
      </ScrollView>
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
  family: state.family
})
const mapActionsToProps = (dispatch) => ({
  changeEmail: txt => dispatch({ type: 'SET_EMAIL', payload: txt }),
  changePassword: txt => dispatch({ type: 'SET_PASSWORD', payload: txt }),
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

export default connector(LoginForm)


