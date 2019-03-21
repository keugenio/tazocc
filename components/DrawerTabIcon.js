import React from 'react';
import  {View, TouchableOpacity} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

class DrawerTabBarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isPressed:false
    }
    
  }
  onPress = () =>{
    this.setState({isPressed:!this.state.isPressed}); 
  }

  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.onPress}>
            <Icon.Ionicons
              name={this.props.name}
              size={26}
              style={{ marginBottom: -3 }}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          </TouchableOpacity>
        </View>
    );
  }
}

export default DrawerTabBarIcon