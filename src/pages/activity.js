import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card } from '../components/common'
import { filter, map, reduce, compose } from 'ramda'
import Images from '../resources/images'


class Activity extends Component {

  render() {
    const props = this.props
    const { width } = Dimensions.get('window')

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


    return(
      <ScrollView>
        <Card>
          <View style={styles.viewStyle} >
            <Text style={{ fontSize: 16, marginBottom: 5 }} >{props.park.parkName} Scavenger Hunt</Text>
          </View>

          <View style={styles.textBlock}>
            <Image style={styles.puppyImage}
                   source={require('../images/peter_puppy.jpg')} />
            <View style={{ width: width * .8 }} >
              <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 20 }} >
                Lets {selActivity.header} {props.selectedChild.name}!</Text>
            </View>
          </View>


            <View style={{ borderBottomWidth: 3 }} >{ activityImage(selActivity) }</View>




            <View style={{ paddingBottom: 20, width: width * .8 }} >
              <Text style={{ fontSize: 16, paddingLeft: 10, paddingTop: 10 }}>
                Did you {selActivity.body}? </Text>

              {props.family.user.email === 'guest@email.com'                   // guest users are not allowed to keep score
                ?  <TouchableOpacity>
                    <Link to={'/park/'} >
                        <View style={styles.textBlock} >
                          <Image style={styles.pawStyle}
                                source={require('../images/parker-paw-2.png')} />
                          <Text  style={{ marginLeft: 5 }}>Yes, I did!</Text>
                        </View>
                      </Link>
                    </TouchableOpacity>

                : <TouchableOpacity onPress={ e => this.props.appendActivity(
                                  selActivity,
                                  props.selectedChild,
                                  props.currActivitiesDS,
                                  props.park,
                                  props.badges,
                                  props.history )} >
                    <View style={styles.innerTextBlock} >
                      <Image style={styles.pawStyle}
                            source={require('../images/parker-paw-2.png')} />
                      <Text style={{ marginLeft: 5 }}>Yes, I did! I just earned {selActivity.pointValue} Park points!</Text>
                    </View>
                </TouchableOpacity>
              }

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
  puppyImage: {
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
  currActivitiesDS: state.currActivitiesDS,
  family: state.family
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
