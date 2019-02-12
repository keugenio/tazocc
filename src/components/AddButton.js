import React, {Component} from 'react';
import {Animated, TouchableHighlight, View, Text, Image, Modal} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';
const SIZE = 80;
import Colors from '../../constants/Colors';
import Events from '../../screens/Events';
import Practices from '../../screens/Practices';
import AboutTAZ from '../../screens/AboutTAZ';

class AddButton extends Component {
    state = {
        modalVisible: false,
        screen:''
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    mode = new Animated.Value(0);
    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };
    _openModal(screen){
        this.setState({screen})
        this.setModalVisible(true);
    }
    render() {
        const firstX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -40]
        });
        const firstY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20]
        });
        const secondX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 20]
        });
        const secondY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -55]
        });
        const thirdX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 80]
        });
        const thirdY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20]
        });

        const fourthX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -80]
        });
        const fourthY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60]
        });

        const fifthX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -30]
        });
        const fifthY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -90]
        });  
        
        const sixthX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 70]
        });
        const sixthY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -90]
        }); 

        const seventhX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 120]
        });
        const seventhY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -60]
        });                

        const opacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
        });
        return (
            <View style={{
                position: 'absolute',
                alignItems: 'center'
            }}>
                <Animated.View style={{
                    position: 'absolute',
                    left: fourthX,
                    top: fourthY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('practices')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                        <Image source={require('../images/paddling101.png')} style={{height:40, width:40, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View> 
                <Animated.View style={{
                    position: 'absolute',
                    left: fifthX,
                    top: fifthY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('aboutTAZ')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                    <Image source={require('../images/hibiscus.png')} style={{height:SIZE/2, width:SIZE/2, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View> 
                
                <Animated.View style={{
                    position: 'absolute',
                    left: sixthX,
                    top: sixthY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('myScoraInfo')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                        <Icon name="user" size={30} color="#F8F8F8"/>
                    </TouchableHighlight>
                </Animated.View> 
                
                <Animated.View style={{
                    position: 'absolute',
                    left: seventhX,
                    top: seventhY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('waivers')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                    <Image source={require('../images/smart_waiver.png')} style={{height:SIZE/3, width:SIZE/3, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View>                 
                
                <Animated.View style={{
                    position: 'absolute',
                    left: firstX,
                    top: firstY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('shopTAZ')
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                    <Image source={require('../images/shopping-cart.png')} style={{height:SIZE/3, width:SIZE/3, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    left: secondX,
                    top: secondY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => {this._openModal('events');
                        }}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                    <Image source={require('../images/events.png')} style={{height:SIZE/3, width:SIZE/3, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    left: thirdX,
                    top: thirdY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('sponsors')
                        }}
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }}
                    >
                    <Image source={require('../images/sponsors.png')} style={{height:SIZE/3, width:SIZE/3, tintColor:'#F8F8F8'}}/>
                    </TouchableHighlight>
                </Animated.View>

                <TouchableHighlight
                    onPress={this.toggleView}
                    underlayColor="#2882D8"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: Colors.primary,
                        borderColor:'#FFFFFF',
                        borderWidth:1
                    }}
                >
                    <Animated.View style={{
                        transform: [
                            {rotate: rotation}
                        ]
                    }}>
                        <Icon name="plus" size={24} color="#F8F8F8"/>
                    </Animated.View>
                </TouchableHighlight>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                    <View>
                        <Text>{this.state.screen}</Text>
                        <View style={{position:'absolute', right:5, top:5}}>
                            <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Icon name="times-circle" size={40} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    </View>
                </Modal>                
            </View>
        );
    }
}
export {AddButton};