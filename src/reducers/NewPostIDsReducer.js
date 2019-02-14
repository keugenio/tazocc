import { AsyncStorage } from 'react-native';

const newPostIDs = AsyncStorage.getItem('newPostIDs');

export default newPostIDs