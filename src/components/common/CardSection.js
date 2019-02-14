import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
        <View style={[props.containerStyle, styles.containerStyle]}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        postion: 'relative'
    }
}
export { CardSection };
