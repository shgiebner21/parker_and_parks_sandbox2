import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, List, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card, CardSection } from '../components/common'
import { filter, map, reduce, compose } from 'ramda'


class Activity extends Component {

  render() {
    const props = this.props
    const { width, height } = Dimensions.get('window')
    console.log('activity props are, ', props)

    const selActivity = filter(act => act.id === Number(props.location.pathname.replace('/activity/', '')),
                   props.park.activity).pop()

   const activityBadge = (activity, image) => {
     return (
         <View style={{ alignItems: 'center', paddingTop: 5 }} >
           <Image style={styles.badgeStyle} source={image}/>

            <Text style={styles.activityText} >{activity.story}</Text>
          </View>
     )
   }

    const activityImage = (activity) => {
      const runActivity = require('../images/Hampton-Park-track.jpg')
      const fitActivity = require('../images/fitness-course.jpg')
      const racingActivity = require('../images/horse-racing.jpg')
      const denmarkActivity = require('../images/denmark-vesey-statue.jpg')
      const bandActivity = require('../images/hampton-park-bandstand.jpg')
      const cleanActivity = require('../images/keep-clean-sign.jpg')
      const lakeActivity = require('../images/wooden-sailing-boat.jpg')
      const appActivity = require('../images/junior-ranger.png')


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
        case 'Keep the park clean!':
          return activityBadge(activity, cleanActivity)
        case 'Lake':
          return activityBadge(activity, lakeActivity)
        case 'Make the flowers pretty!':
          return activityBadge(activity, cleanActivity)
        case 'Write a great app!':
          return activityBadge(activity, appActivity)
      }
    }

    return(
      <ScrollView>
        <Card>
          <View style={styles.viewStyle} >
            <Text style={{ fontSize: 16, marginBottom: 5 }} >{props.park.parkName} Scavenger Hunt</Text>
          </View>

          <View style={styles.textBlock}>
            <Image style={styles.parkerImage}
                   source={require('../images/parker-bear-original-painting.jpg')} />
            <View>
              <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 20 }} >
                Lets {selActivity.header} {props.selectedChild.name}!</Text>
            </View>
          </View>


            <View style={{ borderBottomWidth: 3 }} >{ activityImage(selActivity) }</View>




            <View style={{ paddingBottom: 20, width: width * .8 }} >
              <Text style={{ fontSize: 16, paddingLeft: 10, paddingTop: 10 }}>
                Did you {selActivity.body}? </Text>

              <TouchableOpacity onPress={ e => this.props.appendActivity(
                                  selActivity,
                                  props.selectedChild,
                                  props.currActivitiesDS,
                                  props.park,
                                  props.badges,
                                  props.history )} >
                    <View style={styles.innerTextBlock} >
                      <Image style={styles.pawStyle}
                             source={require('../images/parker-paw-2.png')} />
                      <Text style={{ marginLeft: 5 }}>Yes, I did! I just earned {selActivity.pointValue} Parker points!</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Link to={'/park/'} >
                      <View style={styles.textBlock} >
                        <Image style={styles.pawStyle}
                               source={require('../images/parker-paw-2.png')} />
                        <Text  style={{ marginLeft: 5 }}>I changed my mind, lets do something else!</Text>
                      </View>
                    </Link>
                  </TouchableOpacity>
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
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    marginTop: 5
  },
  parkerImage: {
    width: 80,
    height: 80,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 40
  },
  textBlock: {
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: 'row'
  },
  innerTextBlock: {
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  },
  pawStyle: {
    width: 50,
    height: 50,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 20
  },
  badgeStyle: {
    width: 90,
    height: 90,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 20,
    paddingBottom: 5
  },
  activityText: {
    paddingLeft: 5,
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state) => ({
  selectedChild: state.selectedChild,
  park: state.park,
  badges: state.badges,
  currActivitiesDS: state.currActivitiesDS
})
const mapActionsToProps = (dispatch) => ({
  appendActivity: (activity, child, currActs, park, badges, history) => {
    firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
        .push({ activity })
    let points = child.points + activity.pointValue
    const badgeObj = (!activity.type) ? {} : filter(badge => badge.name === activity.type, badges)
    const badgeObjTwo = Object.values(badgeObj)
    const badgePtsReq = badgeObjTwo[0].pointsRequired
    const badge = badgeObjTwo[0]

    const rangerBadgeObj = filter(badge => badge.name === 'ranger', badges)
    const rangerObjTwo = Object.values(rangerBadgeObj)
    const rangerBadge = rangerObjTwo[0]

    const allActivities = compose(
      filter(act => act !== undefined),
      map(act => act.activity)
    )(child)

    const badgeActivities = compose(
      filter(act => act.type === activity.type),
      filter(act => act !== undefined),
      map(act => act.activity)
    )(child)

    const priorBadgePtsObj = map(activity => activity.pointValue, badgeActivities)
    const pointList = Object.values(priorBadgePtsObj)
    const badgePts = reduce( (acc, pts) => acc + pts, 0, pointList) + activity.pointValue

    const priorAllPtsObj = map(activity => activity.pointValue, allActivities)
    const allPointList = Object.values(priorAllPtsObj)
    const allPoints = reduce( (acc, pts) => acc + pts, 0, allPointList) + activity.pointValue

    switch (activity.type) {
      case 'learning':
        const learning = badgePts
        const scholarBadge = badge
        if (learning >= badgePtsReq) {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, learning, scholarBadge })
        } else {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, learning })
        }
          break
      case 'fitness':
        const fitness = badgePts
        const fitnessBadge = badge
        if (fitness >= badgePtsReq) {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, fitness, fitnessBadge })
        } else {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, fitness })
        }
          break
      case 'samaritan':
        const samaritan = badgePts
        const samaritanBadge = badge
        if (samaritan >= badgePtsReq) {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, samaritan, samaritanBadge })
        } else {
          firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
            .update({ points, samaritan })
        }
          break
    }
    if (allPoints >= rangerBadge.pointsRequired) {
      firebase.database().ref(`/children/${child.familyId}/${child.childId}`)
        .update({ rangerBadge })
    }
        history.push('/park/' )
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Activity)
