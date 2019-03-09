import React, {Component} from 'react';
import {Animated, TouchableHighlight, View, Text, Image, Modal, StyleSheet} from "react-native";
import Icon from '@expo/vector-icons/FontAwesome';
import {WebBrowser} from 'expo';
import Colors from '../../constants/Colors';
import Events from '../../screens/Events';
import Practices from '../../screens/Practices';
import AboutTAZ from '../../screens/AboutTAZ';
import Sponsors from '../../screens/Sponsors';

const SIZE = 80;
class AddButton extends Component {
    state = {
        modalVisible: false,
        activeScreen:''
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
    _openModal(activeScreen){
        this.setState({activeScreen})
        this.setModalVisible(true);
        this.toggleView();
    }
    _getScreen(){
        switch(this.state.activeScreen){
            case 'practices':
                return <Practices />;
                break;
            case 'events':
                return <Events />; 
                break;
            case 'aboutTAZ':
                return <AboutTAZ />;    
                break; 
            case 'sponsors':
                return <Sponsors />;    
                break;
            
            default:
                return (<View><Text>no screen available</Text></View>)
        }
    }
    
    render() {
        const {shadow}=styles;
        
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
            outputRange: [0, 20]
        });
        const seventhY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -120]
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
                alignItems: 'center',
                backgroundColor:'rgba(0,0,0,0)'
            }}>
                <Animated.View style={{
                    position: 'absolute',
                    left: fifthX,
                    top: fifthY,
                    opacity
                }}>
                    <TouchableHighlight
                        onPress={() => { this._openModal('aboutTAZ')
                        }}
                        style={[shadow,{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }]}
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
                        onPress={() => { WebBrowser.openBrowserAsync('https://www.scoraregistration.com/paddler_login');; this.toggleView()
                        }}
                        style={[shadow,{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }]}
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
                        onPress={() => { WebBrowser.openBrowserAsync('https://waiver.smartwaiver.com/w/5bfc43ae42c8a/web/');; this.toggleView()
                        }}
                        style={[shadow,{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }]}
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
                        onPress={() => { WebBrowser.openBrowserAsync('http://tazocc.com/store/'); this.toggleView()
                        }}
                        style={[shadow,{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }]}
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
                        style={[shadow,{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'
                        }]}
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
                        style={[shadow,{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8'                        
                        }]}
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
                    transparent={true}
                    visible={this.state.modalVisible}
                    
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        {this._getScreen(this.state.activeScreen)}
                        <View style={{position:'absolute', right:5, top:5}}>
                            <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Icon name="times-circle" size={40} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>                
            </View>
        );
    }
}
export {AddButton};

const styles=StyleSheet.create({
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,     
        borderWidth:1,  
        borderColor:'#F8F8F8'  
    }

})