import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { set, lensProp } from 'ramda'
import { ListView } from 'react-native'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2 })


const families = (state={}, action) => {
  switch (action.type) {
    case 'ALL_FAMILIES':
      return action.payload
    default:
      return state
  }
}
const familiesDS = (state=ds.cloneWithRows([]), action) => {
  switch (action.type) {
    case 'ALL_FAMILIES':
      return ds.cloneWithRows(action.payload)
    default:
      return state
  }
}

const initialFamily = {
  parentFirst: '',
  parentLast: '',
  cellPhone: '', 
  city: '',
  state: '',
  eMail: '',
  password: '',
  error: '',
  loading: false
}

const family = (state=initialFamily, action) => {
  switch (action.type) {
    case 'SET_PARENT_FIRST':
  return set(lensProp('parentFirst'), action.payload, state)
  case 'SET_PARENT_LAST':
    return set(lensProp('parentLast'), action.payload, state)
  case 'SET_CELL':
    return set(lensProp('cellPhone'), action.payload, state)
  case 'SET_CITY':
    return set(lensProp('city'), action.payload, state)
  case 'SET_STATE':
    return set(lensProp('state'), action.payload, state)
  case 'SET_EMAIL':
    return set(lensProp('eMail'), action.payload, state)
  case 'SET_PASSWORD':
    return set(lensProp('password'), action.payload, state)
  case 'SET_FAMILY':
    return action.payload
  case 'LOGGING_IN':
    return { loading: true, error: '' }
  case 'LOGIN_SUCCESS':
    return { user: action.payload, loading: false, error: '', ...state }
  case 'LOGIN_FAIL':
    return { error: 'Login failed', loading: false, password: '' }
default:
  return state
  }
}

const initialChild = {
    name: '',
    age: '',
    gender: '',
    notes: '',
    fitness: 0,
    samaritan: 0,
    learning: 0
  }

const children = (state=initialChild, action) => {
  switch (action.type) {
    case 'SET_CHILD_NAME':
      return set(lensProp('childFirst'), action.payload, state)
    case 'SET_CHILD_AGE':
      return set(lensProp('age'), action.payload, state)
    case 'SET_CHILD_GENDER':
      return set(lensProp('gender'), action.payload, state)
    case 'SET_CHILD_NOTES':
      return set(lensProp('notes'), action.payload, state)
    case 'SET_CHILDREN':
      return action.payload
    case 'CLEAR_CHILDREN':
      return initialChild
    case 'CHILDREN_FETCH':
      return action.payload
    default:
      return state
  }
}
const childrenDataSource = (state=ds.cloneWithRows( [] ), action) => {
  switch (action.type) {
    case 'CHILDREN_FETCH':
      return ds.cloneWithRows(action.payload)
    default:
      return state
  }
}

const allChildren = (state=[], action) => {
  switch (action.type) {
    case 'ALL_CHILDREN_FETCH':
      return action.payload
    default:
      return state
  }
}
const allChildrenDS = (state=ds.cloneWithRows( [] ), action) => {
  switch (action.type) {
    case 'ALL_CHILDREN_FETCH':
      return ds.cloneWithRows(action.payload)
    default:
      return state
  }
}

const loginFamily = (state=initialFamily, action) => {
  switch (action.type) {
    case 'FAMILY_FETCH_SUCCESS':
      return action.payload
    default:
      return state
  }
}

const selectedChild = (state=initialChild, action) => {
  switch (action.type) {
    case 'CHILD_FETCH':
      return action.payload
    default:
      return state
  }
}
const currActivitiesDS = (state=ds.cloneWithRows( [] ), action) => {
  switch (action.type) {
    case 'CHILD_FETCH':
      return (action.payload.activity) ? ds.cloneWithRows(action.payload.activity)
                                       : ds.cloneWithRows(action.payload)
    default:
      return state
  }
}

const parks = (state=[], action) => {
  switch (action.type) {
    case 'SET_PARKS':
      return action.payload
    default:
      return state
  }
}
const parksDS = (state=ds.cloneWithRows( [] ), action) => {
    switch (action.type) {
      case 'SET_PARKS':
        return ds.cloneWithRows(action.payload)
      default:
        return state
    }
  }
const park = (state=[], action) => {
  switch (action.type) {
    case 'SET_PARK':
      return action.payload
    default:
      return state
  }
}
const badges = (state=[], action) => {
  switch (action.type) {
    case 'SET_BADGES':
      return action.payload
    default:
      return state
  }
}
const badgesDS = (state=ds.cloneWithRows( [] ), action) => {
  switch (action.type) {
    case 'SET_BADGES':
      return ds.cloneWithRows(action.payload)
    default:
      return state
  }
}


const store = createStore(
  combineReducers({
    families,
    familiesDS,
    family,
    children,
    allChildren,
    allChildrenDS,
    loginFamily,
    childrenDataSource,
    selectedChild,
    parks,
    parksDS,
    park,
    badges,
    badgesDS,
    currActivitiesDS
  }),
  applyMiddleware(thunk)
)

export default store
