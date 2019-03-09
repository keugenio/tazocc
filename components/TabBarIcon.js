import React from 'react';
import  {View, TouchableWithoutFeedback} from 'react-native';
import {Badge} from 'react-native-elements';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import * as Actions from '../src/actions';

import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed:false
    }
  }

  // _getBadge = function () {
  //   if ((this.props.name == 'ios-notifications' || this.props.name == 'md-notifications') && this.props.newPostCount>0 && !this.state.isPressed)
  //     return (
  //       <Badge 
  //         value={this.props.newPostCount}  
  //         status="warning" 
  //         containerStyle={{ position: 'absolute', top: -5, right: -15 }}
  //         textStyle={{color:Colors.primary}}
  //       />
  //     )
  // }
  render() {
    return (
        <View>
            <Icon.Ionicons
              name={this.props.name}
              size={26}
              style={{ marginBottom: -3 }}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        </View>
    );
  }
}
const mapStateToProps = (state) =>{
  const {postCount} = state.newPosts;
  
  return {
    newPostCount: postCount, 
  };
}

export default connect(mapStateToProps, Actions)(TabBarIcon)