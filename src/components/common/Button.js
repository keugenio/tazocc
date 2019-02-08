import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    const {onPress, title, width, color} = props;

    switch (color) {
        case 'primary':
            
            break;
    
        default:
            break;
    }
    return (
        <View style={[styles.buttonContainer, {width, backgroundColor, borderColor}]}>
        <TouchableOpacity onPress={onPress} style={styles.buttonPadding}>
          <Text style={styles.buttonText}>{title || props.children }</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = {
    buttonContainer: {
        marginTop: 15,
        alignItems: 'center',
        borderStyle:'solid',
        borderColor:'#1e88e5',
        borderWidth:FONTSIZE/10,
        borderRadius:FONTSIZE/5
      },
    buttonPadding: {
        paddingVertical: FONTSIZE-5,
    },
    buttonText: {
        fontSize: FONTSIZE-3,
        color: '#e3f2fd',
    },
};

export { Button };
