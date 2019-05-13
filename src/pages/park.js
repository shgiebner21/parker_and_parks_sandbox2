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

    const activityBadge = (activity, image) => {
      return (
        <TouchableOpacity key={activity.id}>
          <Link to={'/activity/' + activity.id} >
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Image style={styles.activityStyle} source={ image } />
              <View>
                <Text style={{ paddingLeft: 10 }} key={activity.name} >{activity.name}</Text>
                <Text style={{ paddingLeft: 10, fontWeight: 'bold' }} >{activity.pointValue} Park points!</Text>
              </View>
            </View>
          </Link>
        </TouchableOpacity>
      )
    }

//Thought about tucking listActivity and activityImage in a functions folder to reduce
//code, but park.js & activity.js activityBadge functions are different & increase complexity.
//I am only using twice so not worth the time / complexity.

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
            case 'Meet new people':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Find a tree with red bark':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Gazebo':
              return activityBadge(activity, Images.bandActivity)
            case 'Can you find the Horse Stables':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Bonus':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Water the community garden':
              return activityBadge(activity, Images.magnoliaGardenActivity)
            case 'Run around the field':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Run in the park':
              return activityBadge(activity, Images.marionSquareActivity)
            case 'Find a flowering plant':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Find a Palmetto tree':
              return activityBadge(activity, Images.marionSquarePalmetto)
            case 'Learn about Oyster Tabby Rock':
              return activityBadge(activity, Images.findHornWorkActivity)
            case 'Say Hi! to a Fireman (or Woman!)':
              return activityBadge(activity, Images.plymouthFireEngine)
            case 'Play in the playground':
              return activityBadge(activity, Images.plymouthParkPlayground)
            case 'Count the trees':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Find the current in the creek':
              return activityBadge(activity, Images.plymouthParkCreek)
            case 'Play some basketball':
              return activityBadge(activity, Images.basketballActivity)
            case 'Find the rain barrels':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Find the big Chimneys':
              return activityBadge(activity, Images.stacksActivity)
            case 'Walk to the Pier':
              return activityBadge(activity, Images.waterfrontPierActivity)
            case 'Find the dog park and playground':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Find the Big (really big) ship':
              return activityBadge(activity, Images.yorktownActivity)
            case 'Learn name of the bridge':
              return activityBadge(activity, Images.ravenelBridgeActivity)
            case 'Find Echo Rock':
              return activityBadge(activity, Images.echoRockActivity)
            case 'Find the fruit Fountain':
              return activityBadge(activity, Images.waterfrontFountainActivity)
            case 'Ride your bike':
              return activityBadge(activity, Images.westAshleyBiking)
            case 'Learn about the Greenway':
              return activityBadge(activity, Images.westAshleyLearn)
            case 'Find the East Coast Greenway sign':
              return activityBadge(activity, Images.westAshleySign)
            case 'How long is the Greenway':
              return activityBadge(activity, Images.placeholderActivity)
            case 'Run to the Gazebo':
              return activityBadge(activity, Images.whitePointGazebo)
            case 'Find the Fort placques':
              return activityBadge(activity, Images.whitePointPlaque)
            case 'Count the park benches':
              return activityBadge(activity, Images.whitePointBench)
            case 'Find the Fountain':
              return activityBadge(activity, Images.whitePointFountain)
            case 'Find the Oldest tree':
              return activityBadge(activity, Images.whitePointOaks)
            case 'Count the Big Oak trees':
              return activityBadge(activity, Images.whitePointOakTrees)
          }
      }


    return (
      <ScrollView>
        <Card>

          <CardSection>
            <View style={{ width: width * .70, flexDirection: 'row' }} >
              <Image style={styles.puppyImage}
                     source={require('../images/peter_puppy.jpg')} />

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
                  <Text style={styles.buttonStyle} > My Page </Text>
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
  puppyImage: {
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
