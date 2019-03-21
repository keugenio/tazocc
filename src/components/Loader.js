import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image source = {require('../images/loader.gif')} style={{width:150, height:150}}/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,.15)'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(255,255,255,.15)',
    height: height,
    width: width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;