import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, ListView, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import NativeTachyons, { wrap } from 'react-native-style-tachyons'
import firebase from 'firebase'
import { map, lensProp, view } from 'ramda'
import { Card, CardSection } from '../components/common'
import ListChild from '../components/listChild'


class Family extends Component {
  
  componentDidMount() {
    this.props.familyFetch(this.props.family.user.uid)
  }


  render() {
    const props = this.props

    const loginFamily = (props.loginFamily.parentLast === ''
      ? <Card style={styles.cardStyle} >
          <View style={styles.textBlock}>
            <View>
            <Text style={{ fontSize: 20, paddingLeft: 10 }}>Loading...</Text>
            </View>
          </View>
          <View>
          <Image style={styles.cpcImage}
                  source={require('../images/evening-over-colonial-lake.jpg')} />
          </View>

        </Card>

      : <Card style={styles.cardStyle} >
          <View style={styles.textBlock}>
            <Image style={styles.puppyImage}
                  source={require('../images/peter_puppy.jpg')} />

            <View>
            <Text style={{ fontSize: 20, paddingLeft: 10 }}>
              Hi { view(lensProp('parentLast'), props.loginFamily) } family!</Text>
            </View>
          </View>
          <View cls='ma2 h4 bb' >
            <Text cls='f5'>Welcome to your very own family page!</Text>
            <Text cls='f5'>Who wants to play first today?</Text>
            <Text cls='f5'>Go to YOUR very own page and let's have some fun!</Text>
          </View>
          <CardSection>
            <ScrollView>
              <ListView enableEmptySections
                        dataSource={this.props.childrenDataSource}
                        renderRow={ (rowData, sectionID, rowID) =>
                          <ListChild child={rowData} sectionID={sectionID} childID={rowID}/> }
              />
            </ScrollView>
          </CardSection>
          <CardSection>
            <Link to='/children' style={styles.buttonStyle} >
              <Text style={styles.buttonText} >Enter another child</Text>
            </Link>
          </CardSection>
          <View>
            <Image style={styles.cpcImage}
                    source={require('../images/evening-over-colonial-lake.jpg')} />
          </View>
        </Card>
    )

    return (
      <ScrollView>
        {loginFamily}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  puppyImage: {
    width: 80,
    height: 80,
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 40
  },
  cpcImage: {
    width: 180,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20

  },
  textBlock: {
    paddingTop: 10,
    paddingBottom: 3,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderBottomWidth: 3
  },
  buttonStyle: {
    backgroundColor: '#e7937d',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e7937d',
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
})

const mapStateToProps = (state) => ({
  family: state.family,
  children: state.children,
  loginFamily: state.loginFamily,
  childrenDataSource: state.childrenDataSource
})
const mapActionsToProps = (dispatch) => ({
  familyFetch: (id) => {
    firebase.database().ref(`/family/${id}`)
      .on('value', snapshot => {
        dispatch({ type: 'FAMILY_FETCH_SUCCESS', payload: snapshot.val() })
    firebase.database().ref(`/children/${id}`)
      .on('value', snapshot => {
        dispatch({ type: 'CHILDREN_FETCH', payload: snapshot.val() })
      })
    })
  }
})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(wrap(Family))
