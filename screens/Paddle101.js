import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, Image , Modal, TouchableHighlight} from 'react-native';
import Olelo from '../src/components/Olelo';
import Waa from '../src/components/Waa';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('screen');

class Paddle101 extends Component{
    constructor(props){
      super(props);
      this.state = {
        modalVisible: false,
      }
    }

  setModalVisible(status){
    this.setState({modalVisible:status});
  }
  static navigationOptions = {
    title: 'Paddling 101',
    headerStyle: {
      backgroundColor: '#f4511e',
      marginTop:500,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render(){
    const {container, p, lineSpacer, bold} = styles;
    return(        
      <View style={container}>
        <ScrollView contentContainerStyle={{width:.9*width}}>
          <View style={[lineSpacer]}>
            <Text style={[p, {textAlign:'center', fontSize:FontSize.FONTSIZE+5, fontWeight:'700'}]}>
              ‘Olelo O Ka Wa`a
            </Text>
            <Text style={[p, {textAlign:'center', fontSize:FontSize.FONTSIZE, fontWeight:'600'}]}>
              Hawaiian Language{'\n'}paddling terms
            </Text>
          </View>
          <View>
            <Text style={p}>
              In every sport or job there is a special language. Words are used in this specialty like no other.
              For example, Navy terms. This also works for paddling the Hawaiian canoe.{'\n'}{'\n'}

              If Na Ho‘okele (steerers) use the same language for commands universally, there will be little or
              no confusion on the part of the paddlers. These commands can and should be used to familiarize
              the crew with the language. The same language used consistently also gives Ho‘okele (steerer)
              control of the canoe and used to the idea of giving commands.{'\n'}{'\n'}
            </Text>
            <View>
              <Olelo />
            </View>
            <Text style={p}>  
              All of the following terms are from either Hawaiian Dictionary by Pukui & Elbert or The
              Hawaiian Canoe by Tommy Holmes{'\n'}
              Many of these terms have other meaning as well as allegorical meanings or Kaona (the hidden
              meaning) other than used here.{'\n'}
            </Text>

          </View>
          <View>
              <Waa />
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button
              style={{width:.5*width}}
              title="More"
              onPress={()=>{
                this.setModalVisible(true);
              }}
            />
          </View>
        </ScrollView> 
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >

            <ScrollView contentContainerStyle={{flex:1, marginTop:FONTSIZE, width:'150%'}}>
              <View style={{alignItems:'flex-end'}}>
                <Button
                  icon={<Icon 
                    name="times-circle"
                    size={20}
                    color='#000000' 
                  />}
                  type="clear"
                  onPress={()=>{
                    this.setModalVisible(false);
                  }}
                />
              </View> 
              <View style={{flex:1}}>
                  <Image source={require('../src/images/waa_image.jpg')}/>
              </View>    
                       
            </ScrollView>

        </Modal>
      </View>
    )
  }
}
export default Paddle101

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:Colors.mainBg,
    alignItems:'center',
    justifyContent:'center',
  },
  p:{
    fontSize:FontSize.FONTSIZE,
    color:'#FFFFFF',
    textAlign:'center',

  },
  lineSpacer:{
    margin:FontSize.FONTSIZE-10,
  },
  bold:{
    fontWeight:'700'
  },
  buttonClose:{
    position:'absolute',
    top: 100,
    right:100,
  }
})