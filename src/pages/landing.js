import React from 'react'
import { Dimensions, View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Router } from 'react-router-native'
import { connect  } from 'react-redux'
import { Link } from 'react-router-native'
import { Card, CardSection } from '../components/common'


const LandingPage = () => {

  const { width, height } = Dimensions.get('window')

  return (
    <ScrollView>
      <Card style={{ width: width * .9 }} >
        <CardSection>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

            <Image style={styles.cpcImage}
                source={require('../images/CPC-small-logo.png')} />

              <Image style={styles.parkerImage}
                 source={require('../images/parker-bear-original-painting.jpg')} />

              <Text style={{ fontSize: 20, alignSelf: 'center' }} >Hi!  I'm Parker Bear.</Text>
              <Text style={{ fontSize: 20, alignSelf: 'center' }} >Welcome to my Playground!</Text>
              <Text style={{ fontSize: 20, marginBottom: 20, alignSelf: 'center' }} >
                There are TEN great parks to play in so let's get started!</Text>

              <View style={{ alignSelf: 'center', marginBottom: 30 }}>
              <Link to='/signup'
                    style={styles.signupButtonStyle} >
                  <Text style={styles.buttonText}>  Signup  </Text>
              </Link>
              <Link to='/login'
                    style={styles.loginButtonStyle} >
                  <Text style={styles.buttonText}>   Login   </Text>
              </Link>
            </View>

          </View>
        </CardSection>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  parkerImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderColor: '#e6917d',
    borderWidth: 3,
    borderRadius: 55,
    marginBottom: 30
  },
  cpcImage: {
    width: 150,
    height: 210,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 30
  },
  signupButtonStyle: {
    backgroundColor: '#87bfdb',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#87bfdb',
    marginLeft: 5,
    marginRight: 5
  },
  loginButtonStyle: {
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


const mapStateToProps = (state => state)
const connector = connect(mapStateToProps)

export default connector(LandingPage)
