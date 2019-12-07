import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { throwStatement } from '@babel/types';
//import firebase from 'firebase';


// export async function requestPermission(){
//   try {
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can read the phone state");
//       this.props.navigator.startApp('Login_second');
//       // const phoneNumber = DeviceInfo.getPhoneNumber();            
//     } else {
//       console.log("permission denied")
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }



export default class Login_first extends Component{
    constructor(props){
        super(props)
        this.onComplete = this.onComplete.bind(this);
        this._retrieveData = this._retrieveData.bind(this);
        this.state = {            
            number:"",
            dummy:""
        }
        this._retrieveData();    
    }

    async requestPermission() {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can read the phone state");
            // const phoneNumber = DeviceInfo.getPhoneNumber();            
          } else {
            console.log("permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
      }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('visited_onces');
          if (value !== null ) {            
            this.props.navigation.replace('Welcome_back',{Json_value:value});
            console.log(value);
          }
        } catch (error) {          
          alert(error);
        }        
      };
    
    onComplete(){     
      // const phoneNumber = DeviceInfo.getPhoneNumber();   
      // alert(phoneNumber);
      //this.props.navigation.replace('Login_second',{mobile:phoneNumber});
      this.props.navigation.replace('Login_second');
    }
    componentDidMount() {
      this.requestPermission()
    }
    
    render() {       
        const { navigate } = this.props.navigation;
        var {height, width} = Dimensions.get('window');
        console.log(height);        
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
            />
            <Image
              style={{width: '100%', height: '20%',top:height * 0.1}}
              source={require('../../uploads/Logo_Horizontal_White_PNG_new.png')}
            />
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              {/* <Image
                style={{width: '100%', height: '20%',top:-20}}
                source={require('../../uploads/Logo_Horizontal_White_PNG_new.png')}
              /> */}
              <Text style={styles.text_css}>
                Welcome!
              </Text>                
              <Text style={styles.text_welcome}>
                Let's get you started....
              </Text>                
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'100%'}} onPress={()=>{this.onComplete()}}>
                    <Text style={styles.next_btn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>        
        );
    }
}
const styles = StyleSheet.create({
    container: {        
      flex:1,
      backgroundColor:"#0097a7",
    },
    text_css:{
        color:'white',
        fontSize:40,        
        textAlign:'center'
    },
    text_welcome:{
        color:'white',
        fontSize:30,
        marginTop:30,
        textAlign:'center'
    },
    next_btn:{
        fontSize:20,
        color:'black',
        padding:15,
        textAlign:'center'
    },
});