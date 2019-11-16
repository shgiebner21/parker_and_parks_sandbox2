import { StyleSheet, Image } from 'react-native'


export default StyleSheet.create({
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
})