import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Platform, Image, TouchableOpacity, ListView, ScrollView, Dimensions } from 'react-native'
import { Link } from 'react-router-native'
import firebase from 'firebase'
import { Card, CardSection } from '../components/common'
import { map, filter, compose, sort, take } from 'ramda'
import MapView from 'react-native-maps'
import CPCMapMarker from '../images/small_pineapple_Icon.png'


const updateChildId = (child, id) => {
  firebase.database().ref(`/children/${child.familyId}/${id}`)
    .push({ childId: id })
}
const findBadges = child => {
  const earnedBadgesObj = compose(
    filter(key => key.type === "badge")
  )(child)
  const earnedBadges = Object.values(earnedBadgesObj)

  return ( earnedBadges )
}
const showBadges = badge => {

  const fitImage = require('../images/sport-1320602_1920.jpg')
  const goodyImage = require('../images/volunteer_gift_to_community.jpg')
  const rangerImage = require('../images/junior-ranger.png')
  const scholarImage = require('../images/child-education.png')

  switch(badge.name) {
    case 'fitness':  return ( <Image style={styles.badgeImage} key={badge.name}
                                           source={ fitImage } /> )
    case 'samaritan':  return ( <Image style={styles.badgeImage} key={badge.name}
                                     source={ goodyImage } /> )
    case 'ranger':  return ( <Image style={styles.badgeImage} key={badge.name}
                                     source={ rangerImage } /> )
    case 'learning':  return ( <Image style={styles.badgeImage} key={badge.name}
                                       source={ scholarImage } /> )
  }
}


class Child extends Component {
  componentWillMount() {
    this.props.childFetch(this.props.location.pathname.replace('child', 'children'))
  }

  render() {
    const props = this.props
    const { width, height } = Dimensions.get('window')

    const familyChildren = map(child => child, Object.values(props.children))
    const familyRank = (children) => {
      const child = compose(
            map(child => <View key={child.name}>
                <Text>{child.name}: {child.points}</Text>
              </View>),
            sort( (a, b) => b.points - a.points)
          )(children)

      return ( child )
    }

    const allChildrenObj = Object.values(props.allChildren)

    const allChildrenRank = (allChildrenObj) => {
      const childrenList = []

      const childArr = map(allChildren =>
        map(child => childrenList.push(child), allChildren), allChildrenObj)

      const child = childrenList === [] 
          ? <View><Text>No children</Text></View>
          : compose(
              map(child => <View key={child.name}>
                             <Text>{child.name} { take(1, child.nameLast) }: {child.points}</Text>
                           </View>),
              sort( (a, b) => b.points - a.points)
            )(childrenList)

        return ( take(5, child) )
    }

    const allParkObj = Object.values(props.parks)

    const allParksMarkers = (allParkObj, history) => {
      const parkList = []

      const parkArr = map(park => parkList.push(park), allParkObj)

      const park = parkList === [] 
        ? <View><Text>No Parks</Text></View>

        : map( park => <MapView.Marker coordinate={ park.region }
                                 onPress={e => history.push('/park/' + park.parkId) }
                                 key={park.parkName}
                                 title={park.parkName}
                                 image={CPCMapMarker}
                       />, parkList)
       return park
    }


    const renderSiblings = (sibling, childID) => {
      return (
        (sibling.name !== props.selectedChild.name)
            ? <TouchableOpacity style={styles.sibButton}  title={sibling.name}
                  onPress={ e => this.props.newChild(`/children/` + sibling.familyId + `/` + childID, sibling.familyId) }>
                  <Text style={{ marginTop: 5, marginBottom: 5, paddingBottom: 5, marginLeft: 5, fontSize: 16 }} >{sibling.name}</Text>
              </TouchableOpacity>

            : <View></View>
      )
    }
    const renderActs = (acts) => {
      return (
        (acts.activity !== undefined) ? <Text>{acts.activity.name}</Text> : <View></View>
      )
    }



    return (
      <ScrollView>
        <Card>

          <CardSection>
            <View style={{ width: width * .80, paddingTop: 10, flexDirection: 'row' }} >

              <Image style={styles.puppyImage}
                     source={require('../images/peter_puppy.jpg')} />

              <View style={{ flexDirection: 'column' }} >

                  <Text style={{ fontSize: 20, paddingLeft: 10 }} >
                    Hi { props.selectedChild.name }!</Text>

                  <Text style={{ paddingLeft: 10}} >
                    Welcome to your very own home page!</Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <Text style={{ fontWeight: 'bold' }} >Activities completed:</Text>
            <View style={{ marginLeft: 5 }} >
              <ListView enableEmptySections
                        dataSource={this.props.currActivitiesDS}
                        renderRow={rowData => renderActs(rowData) }
                 />
             </View>
          </CardSection>

          <CardSection>
            <View style={{ flexDirection: 'row' }} >
              <Text style={{ fontWeight: 'bold' }} >Badges:</Text>

              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                { map(showBadges, findBadges(props.selectedChild)) }
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View style={styles.otherPts}>
              <Text style={styles.parkPts}>Park points: {props.selectedChild.points}</Text>
              <Text>Fitness points: {props.selectedChild.fitness}</Text>
              <Text>Scholar points: {props.selectedChild.learning}</Text>
              <Text>Volunteer points: {props.selectedChild.samaritan}</Text>
            </View>
          </CardSection>

          <CardSection>
            <View>
              <Text style={{ fontWeight: 'bold' }} >Family rank: </Text>
            </View>
            <View>
              { familyRank(familyChildren) }
            </View>
          </CardSection>

          <CardSection>
            <View>
              <Text style={{ fontWeight: 'bold' }} >Top 5 High scores: </Text>
            </View>
            <View>
              { allChildrenRank(allChildrenObj) }
            </View>
          </CardSection>

          {/* Map section of page  */}
          <CardSection>
            <View style={{ width: width * .95, flexDirection: 'column' }} >
              <Text style={{ fontWeight: 'bold', paddingBottom: 5 }} >Which Park do I want to go to? </Text>

              <View style={{ flex: 1 }} >
                <MapView
                  style={{ flex: 1, height: 250 }}
                  initialRegion={{
                    latitude: 32.7791211,
                    longitude: -79.949042,
                    latitudeDelta: 0.0700,
                    longitudeDelta: 0.0400
                  }}
                  mapType={Platform.OS === 'ios'
                    ? "mutedStandard"
                    : "standard"}
                  scrollEnabled={false}
                >
                  { allParksMarkers(allParkObj, props.history) }
                </MapView>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <View style={{ width: width * .4, flexDirection: 'row' }} >
              <ListView enableEmptySections
                        dataSource={this.props.childrenDataSource}
                        renderRow={ (rowData, sectionID, rowID) =>
                        renderSiblings(rowData, rowID) }
                        />

              <View style={{ height: height * .25 }} >
                <Link to='/family' style={styles.buttonStyle} >
                  <Text style={styles.buttonText} >   Family   </Text>
                </Link>
              </View>

            </View>

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
  badgeImage: {
    width: 60,
    height: 60,
    borderColor: '#e6917d',
    borderWidth: 3,
    resizeMode: Image.resizeMode.contain
  },
  sibButton: {
    backgroundColor: '#e6917d',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff'
  },
  parkPts: {
    fontSize: 16,
    fontWeight: '600'
  },
  parkStyle: {
    fontSize: 16,
    paddingBottom: 5
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
  },
  otherPts: {
    flexDirection: 'column'
  },
  padding: {
    flex: 0.1
  }
}

const mapStateToProps = (state) => ({
  selectedChild: state.selectedChild,
  parks: state.parks,
  parksDS: state.parksDS,
  children: state.children,
  childrenDataSource: state.childrenDataSource,
  allChildren: state.allChildren,
  allChildrenDS: state.allChildrenDS,
  badges: state.badges,
  badgesDS: state.badgesDS,
  currActivitiesDS: state.currActivitiesDS
})
const mapActionsToProps = (dispatch) => ({
  childFetch: (id) => {
    firebase.database().ref(id)
      .on('value', snapshot => {
        dispatch({ type: 'CHILD_FETCH', payload: snapshot.val() })
    firebase.database().ref(`/parks`)
      .on('value', snapshot => {
        dispatch({ type: 'SET_PARKS', payload: snapshot.val() })
      })
    firebase.database().ref(`/badges`)
      .on('value', snapshot => {
        dispatch({ type: 'SET_BADGES', payload: snapshot.val() })
      })
    firebase.database().ref(`/children`)
      .on('value', snapshot => {
        dispatch({ type: 'ALL_CHILDREN_FETCH', payload: snapshot.val() })
      })
    })
  },
  newChild: (id, famId) => {
    firebase.database().ref(id)
      .on('value', snapshot => {
        dispatch({ type: 'CHILD_FETCH', payload: snapshot.val() })
    firebase.database().ref(`/children/${famId}`)
      .on('value', snapshot => {
        dispatch({ type: 'CHILDREN_FETCH', payload: snapshot.val() })
      })
    })
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Child)
