import {AsyncStorage } from 'react-native';

// let localDataSource = [];
// const localStorage = AsyncStorage.getItem('localDataStorage');
// localDataSource = JSON.parse(localStorage);

import localPosts from './localPosts.json';

export default () => localPosts;
