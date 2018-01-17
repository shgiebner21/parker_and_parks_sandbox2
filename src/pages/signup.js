import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import NativeTachyons from 'react-native-style-tachyons'
import firebase from 'firebase'
import { pathOr, map, none } from 'ramda'
import { Card, CardSection, InputField, Button, Spinner } from '../components/common'


const emailCheck = (email, families) => {
  const famEmail = map(family => family.email, families)
  const emailList = Object.values(famEmail)

  if (none(enteredEmail => enteredEmail === email, emailList)) {
    return
  } else
    return alert('That e-mail is already in use.')
}


class SignupForm extends Component {
  componentDidMount() {
    this.props.getFamilies()
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button  onPress={this.props.onSignup(this.props.family.eMail,
                        this.props.family.password,
                        this.props.history,
                        this.props.family.parentFirst,
                        this.props.family.parentLast,
                        this.props.family.cellPhone,
                        this.props.family.city,
                        this.props.family.state,
                        this.props.familiesDS._dataBlob.s1,
                        this.props.families.state)} >
        Signup</Button>
    )
  }

  passwordText() {
    if (this.props.family.password.length < 6) {
          return <Text style={styles.errorText}>(password must have six or more characters)</Text>
    }
        return <Text style={{ color: 'grey' }}  >(password meets signup requirements)</Text>
  }


  render() {
    const props = this.props
    const { width, height } = Dimensions.get('window')


    return (
      <ScrollView>
        <Card>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>
              Please enter your information.
            </Text>
          </View>

          <CardSection>
            <InputField label={'First Name'}
                        placeholder={'your first name here'}
                        value={pathOr('', ['family', 'parentFirst'], props) }
                        onChangeText={ txt => props.changeParentFirst(txt) }
                        autoCorrect={false}
            />
          </CardSection>
          <CardSection>
            <InputField label={'Last Name'}
                        placeholder={'your last name here'}
                        value={pathOr('', ['family', 'parentLast'], props) }
                        onChangeText={ txt => props.changeParentLast(txt) }
                        autoCorrect={false}
            />
          </CardSection>
          <CardSection>
            <InputField label={'Cell Phone'}
                        placeholder={'843-555-5555'}
                        value={pathOr('', ['family', 'cellPhone'], props) }
                        onChangeText={ txt => props.changeCell(txt) }
                        keyboardType={'phone-pad'}
            />
          </CardSection>
          <CardSection>
            <InputField label={'City'}
                        placeholder={'Charleston'}
                        value={pathOr('', ['family', 'city'], props) }
                        onChangeText={ txt => props.changeCity(txt) }
            />
          </CardSection>
          <CardSection>
            <InputField label={'State'}
                        placeholder={'SC'}
                        value={pathOr('', ['family', 'state'], props) }
                        onChangeText={ txt => props.changeState(txt) }
            />
          </CardSection>
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
                    source={require('../images/CPC-small-logo.png')} />
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
    width: 90,
    height: 130,
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
  family: state.family,
  families: state.families,
  familiesDS: state.familiesDS
})
const mapActionsToProps = (dispatch) => ({
  getFamilies: () => {
    firebase.database().ref('/family/').on('value', snapshot => {
        dispatch({ type: 'ALL_FAMILIES', payload: snapshot.val() })
      })
  },
  changeParentFirst: (txt) => dispatch({ type: 'SET_PARENT_FIRST', payload: txt }),
  changeParentLast: (txt) => dispatch({ type: 'SET_PARENT_LAST', payload: txt }),
  changeCell: (txt) => dispatch({ type: 'SET_CELL', payload: txt }),
  changeCity: (txt) => dispatch({ type: 'SET_CITY', payload: txt }),
  changeState: (txt) => dispatch({ type: 'SET_STATE', payload: txt }),
  changeEmail: (txt) => dispatch({ type: 'SET_EMAIL', payload: txt }),
  changePassword: (txt) => dispatch({ type: 'SET_PASSWORD', payload: txt }),
  onSignup: (email, password, history, parentFirst, parentLast, cellPhone, city, state, famList, families) => (e) => {
    dispatch({ type: 'LOGGING_IN' })

      if ( parentFirst.length === 0 || parentLast.length === 0 ) {
        return alert('Required data is missing!')
      }

      if ( email === emailCheck(email, famList)) {

      }

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then( user => loginUserSuccess(dispatch, user, history, parentFirst, parentLast, cellPhone, city, state, email) )
          .catch( () => loginUserFail(dispatch) )
  }
})

{/*********  Helper functions  *********/}

const loginUserSuccess = (dispatch, user, history, parentFirst, parentLast, cellPhone, city, state, email) => {
  const familyId = parentLast + '_' + cellPhone + '_' + email
  dispatch({ type: 'LOGIN_SUCCESS', payload: user })

    firebase.database().ref(`/family/${user.uid}`)
      .update({ parentFirst, parentLast, cellPhone, city, state, email, familyId })
    history.push(`/children`)

}
const loginUserFail = (dispatch) => {
  dispatch({ type: 'LOGIN_FAIL' })
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(SignupForm)
