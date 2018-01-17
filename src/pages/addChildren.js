import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { pathOr } from 'ramda'
import moment from 'moment'
moment().format()
import firebase from 'firebase'
import { Card, CardSection, InputField, Button } from '../components/common'


const updateChildren = (children, id) => {

  return ( children.totalPoints = 0,
           children.type = 'children',
           children.timeStamp = moment().format('MMMM Do YYYY, h:mm a') )
}
const postChild = (name, nameLast, age, gender, notes, type, points, fitness, samaritan, learning, timeStamp, familyId) => {

  return (
    firebase.database().ref(`/children/${familyId}`)
      .push({ name, nameLast, age, gender, notes, type, points, fitness, samaritan, learning, timeStamp, familyId })
    )
}
const postChildId = (childId, famID, kidID) => {

  return (
    firebase.database().ref(`/children/${famID}/${kidID}`)
      .update({ childId })
  )
}

const initialChild = {
    name: '',
    age: '',
    gender: '',
    notes: '',
    fitness: 0,
    samaritan: 0,
    learning: 0
  }



class AddChildren extends Component {

  render() {
    const props = this.props
    console.log('addChildren props are, ', props)

    return (
      <Card>

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            Tell us about your family!
          </Text>
        </View>

        <CardSection>
          <InputField label={'First Name'}
                      placeholder={'child name here'}
                      value={pathOr('', ['children', 'childFirst'], props) }
                      onChangeText={ txt => props.changeChildFirst(txt) }
                      autoCorrect={false}
          />
        </CardSection>
        <CardSection>
          <InputField label={'Age'}
                      placeholder={'10'}
                      value={pathOr('', ['children', 'age'], props) }
                      onChangeText={ txt => props.changeAge(txt) }
                      keyboardType={'phone-pad'}
          />
        </CardSection>
        <CardSection>
          <InputField label={'Gender'}
                      placeholder={'F'}
                      value={pathOr('', ['children', 'gender'], props) }
                      onChangeText={ txt => props.changeGender(txt) }
          />
        </CardSection>
        <CardSection>
          <InputField label={'Notes'}
                      placeholder={'Johnny loves Hampton Park'}
                      value={pathOr('', ['children', 'notes'], props) }
                      onChangeText={ txt => props.changeNotes(txt) }
          />
        </CardSection>


        <CardSection>
          <Button  onPress={props.submitAgain( props.children,
                                               props.family,
                                               props.history )} >
            Enter another child
          </Button>
        </CardSection>
        <CardSection>
          <Button  onPress={props.submit( props.children,
                                          props.family,
                                          props.history )} >
            Done!
          </Button>
        </CardSection>




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
  textStyle: {
    fontSize: 20
  }
}

const mapStateToProps = (state) => ({
  family: state.family,
  children: state.children
})
const mapActionsToProps = (dispatch) => ({
  changeChildFirst: (txt) => dispatch({ type: 'SET_CHILD_NAME', payload: txt }),
  changeAge: (txt) => dispatch({ type: 'SET_CHILD_AGE', payload: txt }),
  changeGender: (txt) => dispatch({ type: 'SET_CHILD_GENDER', payload: txt }),
  changeNotes: (txt) => dispatch({ type: 'SET_CHILD_NOTES', payload: txt }),
  submit: (children, family, history) => (e) => {

    if ( !children.childFirst || !children.age ) {
      return alert('Required data is missing!')
    }
    if (!children.notes) {
      children.notes = ''
    }
    if (!children.fitness) {
      children.fitness = 0
      children.samaritan = 0
      children.learning = 0
    }
    updateChildren(children, family.user.uid)

// just wanted to post children object but firebase insists on adding uid/children
// to the database, so this approach yields cleaner data
    postChild(children.childFirst, family.parentLast, children.age, children.gender, children.notes,
              children.type, children.totalPoints, children.fitness, children.samaritan, children.learning, children.timeStamp, family.user.uid)
                .then(child => postChildId(children.childId = child.path.o[2], child.path.o[1], child.path.o[2]) )
                history.push('/family')
  },
  submitAgain: (children, family, history) => (e) => {
    if ( !children.childFirst || !children.age ) {
      return alert('Required data is missing!')
    }
    updateChildren(children, family.user.uid)
    postChild(children.childFirst, family.parentLast, children.age, children.gender, children.notes,
              children.type, children.totalPoints, children.fitness, children.samaritan, children.learning, children.timeStamp, family.user.uid)
                .then(child => postChildId(children.childId = child.path.o[2], child.path.o[1], child.path.o[2]) )

      dispatch({ type: 'CLEAR_CHILDREN' })
      history.push('/children')
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(AddChildren)
