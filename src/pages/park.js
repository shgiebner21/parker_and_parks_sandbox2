import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, ListView, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card, CardSection } from '../components/common'
import { map, pathOr } from 'ramda'
import Images from '../resources/images'

class Park extends Component {
  componentWillMount() {
    if (this.props.location.pathname !== '/park/')
    this.props.parkSet(this.props.location.pathname.replace('/park/', '/parks/'))
  }

  render() {
    const props = this.props
    const { width, height } = Dimensions.get('window')
    console.log('park props are, ', props)


    const activityBadge = (activity, image) => {
      return (
        <TouchableOpacity key={activity.id}>
          <Link to={'/activity/' + activity.id} >
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Image style={styles.activityStyle} source={ image } />
              <View>
                <Text style={{ paddingLeft: 10 }} key={activity.name} >{activity.name}</Text>
                <Text style={{ paddingLeft: 10, fontWeight: 'bold' }} >{activity.pointValue} Parker points!</Text>
              </View>
            </View>
          </Link>
        </TouchableOpacity>
      )
    }

//Thought about tucking listActivity and activityImage in a functions folder to reduce
//code, but park.js & activity.js activityBadge functions are different & increase complexity.
//I am only using twice so not worth the tiem / complexity.

        const listActivity = (activity) => {
          switch(activity.name) {
            case 'Run around the track':
              return activityBadge(activity, Images.runActivity)
            case 'Fitness course':
              return activityBadge(activity, Images.fitActivity)
            case 'Horse racing track':
              return activityBadge(activity, Images.racingActivity)
            case 'Denmark Vesey Statue':
              return activityBadge(activity, Images.denmarkActivity)
            case 'Band Stand':
              return activityBadge(activity, Images.bandActivity)
            case 'Keep the park clean':
              return activityBadge(activity, Images.cleanActivity)
            case 'Run around the lake':
              return activityBadge(activity, Images.lakeActivity)
            case 'Learn about nature':
              return activityBadge(activity, Images.natureActivity)
            case 'Learn about the plants':
              return activityBadge(activity, Images.learnActivity)
            case 'Go to the Pier':
              return activityBadge(activity, Images.pierActivity)
            case 'Find Charleston landmarks':
              return activityBadge(activity, Images.landmarkActivity)
            case 'Learn about the plants, animals and marsh':
              return activityBadge(activity, Images.marshActivity)
          }
      }


    return (
      <ScrollView>
        <Card>

          <CardSection>
            <View style={{ width: width * .70, flexDirection: 'row' }} >
              <Image style={styles.parkerImage}
                     source={require('../images/parker-bear-original-painting.jpg')} />

               <View style={{ flexDirection: 'column' }} >

                 <Text style={{ fontSize: 20, paddingLeft: 10 }} >
                   Welcome to {props.park.parkName}, {props.selectedChild.name}!</Text>

                 <Text style={{ paddingLeft: 10 }} >Lets go play in the Park!</Text>
               </View>

            </View>
          </CardSection>

          <CardSection>
            <View>
              { map(listActivity, pathOr([], ['park', 'activity'], props)) }
            </View>
          </CardSection>

          <CardSection>
            <TouchableOpacity>
              <Link to={'/child/' + props.selectedChild.familyId + '/' + props.selectedChild.childId }>
                <View>
                  <Text style={styles.buttonStyle} >My Page</Text>
                </View>
              </Link>
            </TouchableOpacity>
          </CardSection>

        </Card>
      </ScrollView>
    )
  }
}

const styles = {
  parkerImage: {
    width: 80,
    height: 80,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 40
  },
  pawStyle: {
    width: 50,
    height: 50,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 20
  },
  activityStyle: {
    width: 50,
    height: 50,
    borderColor: '#87bfdb',
    borderWidth: 3,
    borderRadius: 20
  },
  buttonStyle: {
    backgroundColor: '#e6917d',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16
  }
}

const mapStateToProps = (state) => ({
  selectedChild: state.selectedChild,
  park: state.park
})
const mapActionsToProps = (dispatch) => ({
  parkSet: (park) => {
    firebase.database().ref(park)
      .on('value', snapshot => {
        dispatch({ type: 'SET_PARK', payload: snapshot.val() })
      })
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Park)
