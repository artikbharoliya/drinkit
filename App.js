import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Indicater from './components/Indicater';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width;
export default function App() {



  const [loaded] = Font.useFonts({
    MontserratBlack: require('./assets/Montserrat-Medium.ttf'),
  });
  

  const [loading, setLoading] = useState(true);


  const [water, setWater] = useState(0);
  const [target, setTarget] = useState(4);

  const [hasTarget, setHasTarget] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  

  const waterCalculator = (waterparam) => {
    const tar = parseInt(target) * 1000;
    const temp = waterparam/tar * 100;
    const sum = water + temp;
    console.log(sum);
    // setWater(water+temp);
    storeData('water', sum.toString())
    .then(()=>{ 
      setWater(sum)
      setHasTarget(true);
    
    });
    


  }


  const getData = async () => {

    try {
      const storedTarget = await AsyncStorage.getItem('target');
      const storedWater = await AsyncStorage.getItem('water');
      if(storedTarget === null && storedWater === null) {
        // value previously stored
        setHasTarget(false);
      }else{
        setHasTarget(true);
        setWater(parseInt(storedWater));
        setTarget(storedTarget)
      }
    } catch(e) {
      // error reading value
      console.log("Error");

    }
  }

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }


  useEffect(()=>{

    getData().then(()=>setLoading(false));
  }, []);
    

  if(loading){
    return(
      <Text>Loading</Text>
    );

  }else {

    return (
      <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={!hasTarget}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          
          >
    
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Set your target (in Liters)!!{target}</Text>
  
                <TextInput
                  style={styles.form}
                  onChangeText={text => {
                    if(!isNaN(text)){
                      storeData('target', text);
                      setTarget(text);
                    }
                  }}
                  keyboardType="numeric"
                  
                  value={target.toString()}
                />
    
  
              <LinearGradient
                colors={['#89f7fe', '#66a6ff']}
                // style={styles.background}
                style={styles.background}
              >
                  <TouchableHighlight
                  style={{ ...styles.openButton, paddingHorizontal: 30 }}
                  onPress={() => {
                    setHasTarget(true);
                    // setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Set Target!</Text>
                </TouchableHighlight>
  
              </LinearGradient>
                
              </View>
            </View>
            
    
        </Modal>
  
  
        <View style={styles.container}>
    
          
          <Text style={styles.title}>Drink Enough Water</Text>
          <StatusBar translucent backgroundColor="#fff"/>
    
    
          <Indicater value={water} max={100}/>
    
    
    
    
          <View style={styles.buttonContainer}>
          <LinearGradient
            start={{x:0, y:1}}
            end={{x:1, y:0}}
            colors={['#89f7fe', '#66a6ff']}
            style={styles.background}
          >
            <TouchableOpacity style={styles.waterButton} 
              onPress={()=>{
                // setModalVisible(true);
                waterCalculator(200)
              }}
            ><Text style={styles.buttonText}>+ 200 Ml</Text></TouchableOpacity>
          </LinearGradient>
    
          <LinearGradient
            start={{x:0, y:1}}
            end={{x:1, y:0}}
            colors={['#89f7fe', '#66a6ff']}
            style={styles.background}
          >
            <TouchableOpacity style={styles.waterButton}
              onPress={()=>{
                waterCalculator(300)
              }}
            ><Text style={styles.buttonText}>+ 300 Ml</Text></TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            start={{x:0, y:1}}
            end={{x:1, y:0}}
            colors={['#89f7fe', '#66a6ff']}
            style={styles.background}
          >
            <TouchableOpacity style={styles.waterButton} 
              onPress={()=>{
                waterCalculator(400)
              }}
            ><Text style={styles.buttonText}>+ 400 Ml</Text></TouchableOpacity>
          </LinearGradient>
    
          </View>
    
          <View>
            <Text>You have drunk {(water * target / 100)} / {target} Liters of water </Text>
          </View>
  
  
          <View>
              <LinearGradient
                start={{x:0, y:1}}
                end={{x:1, y:0}}
                colors={['#89f7fe', '#66a6ff']}
                style={styles.background}
              >
                <TouchableOpacity style={styles.waterButton} 
                  onPress={()=>{
                    setWater(0);
                    setHasTarget(false);
  
                  }}
                ><Text style={styles.buttonText}>Reset Target</Text></TouchableOpacity>
              </LinearGradient>
          </View>
          
        </View>
  
      </>
      );
  }
    
    



  
}

const styles = StyleSheet.create({
  title:{
    marginTop: 40,
    marginBottom:20,
    fontSize: 25,
    // fontFamily: 'MontserratBlack',

  },
  buttonText:{
    color: '#fff',
    fontSize: 14,
  },
  waterButton:{
    // backgroundColor: '#09E2FE',
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderRadius: 30,
    

  },
  background:{
    borderRadius: 30,
    
  },
  form:{
    width: 150,
    height: 40,
    borderColor: "#0000ff",
    borderWidth: 1,
    marginBottom: 15,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: '#00f',
    width: width
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 140,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    // backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    // elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
