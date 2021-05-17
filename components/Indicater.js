import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Speedometer from 'react-native-cool-speedometer';
import * as Font from 'expo-font';


function Indicater({value, max}) {

    const [loaded] = Font.useFonts({
      Montserrat: require('../assets/Montserrat-Thin.ttf'),
    });
  
    if(!loaded) {
      return (<Text>Erro</Text>);
    }

    var color;

    if(value < 25) {
      color="#F26989";
    } else if(value >= 25 && value <= 60){
      color="#FFDA85";
    } else if (value >= 100){
      color="#06d6a0"
    }else {
      color="#09E2FE";
    }


  
    return (
        <Speedometer
          primaryArcWidth={30}
          value={value}
          max={max}
          lineCap="round"
          fontFamily='Montserrat'
          noNeedle
          noLineMarks
          noNumberMarks
          angle={360}
          accentColor={color}
          secondaryArcColor="#a4a4a4"
          noBackground
          duration={500}
          indicatorCentered
          indicatorStyle={{
            color: '#09E2FE'
          }}
          indicatorSuffix='%'
        />
      
    );
  }

export default Indicater;