import React from 'react'
import { View, TextInput, Text } from 'react-native'



const InputField = (props) => {
  return (
    <View style={styles.containerStyle} >
      <Text style={styles.labelStyle} >{props.label}</Text>
      <TextInput style={styles.inputFieldStyles}
                 value={props.value}
                 onChangeText={props.onChangeText}
                 placeholder={props.placeholder}
                 secureTextEntry={props.secureTextEntry}
                 keyboardType={props.keyboardType}
                 autoCorrect={props.autoCorrect}
                 underlineColorAndroid={'transparent'}
                 allowFontScaling
      />
    </View>
  )

}

const styles = {
  inputFieldStyles: {
    width: 100,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 3
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export {InputField}
