import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Link } from 'react-router-native'
import { CardSection } from './common'


const ListChild = (props) => {

  return (
    <TouchableOpacity>
      <Link to={`/child/` + props.child.familyId + '/' + props.childID } >
        <View>
          <CardSection>
            <Image style={styles.pawStyle}
                   source={require('../images/parker-paw-2.png')} />
            <Text style={styles.titleStyle}>{props.child.name}</Text>
          </CardSection>
        </View>
      </Link>
    </TouchableOpacity>
  )
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  pawStyle: {
    width: 40,
    height: 40,
    borderColor: '#e7937d',
    borderWidth: 3,
    borderRadius: 20
  }
}

export default ListChild
