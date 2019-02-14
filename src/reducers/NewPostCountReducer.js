import {AsyncStorage } from 'react-native';

newPostCount = AsyncStorage.getItem('newPostCount');

export default() =>  newPostCount;