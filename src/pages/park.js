import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, ListView, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card, CardSection } from '../components/common'
import { map, pathOr } from 'ramda'


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

    // I simply could not find a way to get around the require('string') issue below.
    // Pulling the image url in from the db simply could not get that to work.
    // and yes, I hate doing it this way.

        const listActivity = (activity) => {
          const runActivity = require('../images/Hampton-Park-track.jpg')
          const fitActivity = require('../images/fitness-course.jpg')
          const racingActivity = require('../images/horse-racing.jpg')
          const denmarkActivity = require('../images/denmark-vesey-statue.jpg')
          const bandActivity = require('../images/hampton-park-bandstand.jpg')
          const cleanActivity = require('../images/keep-clean-sign.jpg')
          const lakeActivity = require('../images/evening-over-colonial-lake.jpg')
          const learnActivity = require('../images/junior-ranger.png')
          const landmarkActivity = require('../images/StPhilips.jpg')
          const natureActivity = require('../images/Colonial-Lake-flowerbed.jpg')
          const pierActivity = require('../images/demetre-park-sunlit-dock.jpg')
          const marshActivity = require('../images/egret-demetre-park.jpg')


          switch(activity.name) {
            case 'Run around the track':
              return activityBadge(activity, runActivity)
            case 'Fitness course':
              return activityBadge(activity, fitActivity)
            case 'Horse racing track':
              return activityBadge(activity, racingActivity)
            case 'Denmark Vesey Statue':
              return activityBadge(activity, denmarkActivity)
            case 'Band Stand':
              return activityBadge(activity, bandActivity)
            case 'Keep the park clean':
              return activityBadge(activity, cleanActivity)
            case 'Run around the lake':
              return activityBadge(activity, lakeActivity)
            case 'Learn about nature':
              return activityBadge(activity, natureActivity)
            case 'Learn about the plants':
              return activityBadge(activity, learnActivity)
            case 'Go to the Pier':
              return activityBadge(activity, pierActivity)
            case 'Find Charleston landmarks':
              return activityBadge(activity, landmarkActivity)
            case 'Learn about the plants, animals and marsh':
              return activityBadge(activity, marshActivity)
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
