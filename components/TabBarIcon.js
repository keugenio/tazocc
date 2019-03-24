import React from 'react';
import  {View, TouchableWithoutFeedback} from 'react-native';
import {Badge} from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  _getBadge = function () {
    if (this.props.name == 'ios-notifications' || this.props.name == 'md-notifications')
    {      
      const unReadItemsLength = this.props.newPosts.IDs ? this.props.newPosts.IDs.length : 10;    
      return (
        <Badge 
          value={unReadItemsLength}  
          status="warning" 
          containerStyle={{ position: 'absolute', top: -5, right: -15 }}
          textStyle={{color:Colors.mainBg}}
        />
      )
    }
  }

  render() {
    return (
        <View>
            <Icon.Ionicons
              name={this.props.name}
              size={26}
              style={{ marginBottom: -3 }}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
            {this._getBadge()}
        </View>
    );
  }
}

const mapStateToProps = (state) => {        
  return {
    newPosts:{
      IDs: state.newPosts.IDs
    }
  }
}

export default connect(mapStateToProps)(TabBarIcon)