import React, {Component} from 'react';
import {Picker, StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Button} from 'react-native';
import PinView from 'react-native-pin-view';
import {decode as atob, encode as btoa} from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';

//import firebase from 'firebase';

export default class Login_third extends Component{
    constructor(props){
        super(props)        
        this.state = {
            mobilenumber:"",
            month:"",
            date:"",
            year:"",
        }        
        this.goBack = this.goBack.bind(this);
        this.Checklogin = this.Checklogin.bind(this);
        this.storeData = this.storeData.bind(this);
    }
    
    storeData = async () => {
        let obj = {
            mobile:this.state.mobilenumber,
            dob:this.state.year+'-'+this.state.month+'-'+this.state.date,
        }
        try {
          await AsyncStorage.setItem('visited_onces', JSON.stringify(obj));
        } catch (e) {
          // saving error
          alert(e);
        }
      }

    componentDidMount(){
        const { navigation  } = this.props;
        const mobileNumber = navigation.getParam('mobile_number', 'NO-ID');
        const date = navigation.getParam('date', 'NO-ID');
        const month = navigation.getParam('month', 'NO-ID');
        const year = navigation.getParam('year', 'NO-ID');
        this.setState({mobilenumber:mobileNumber,date:date,month:month,year:year});        
    }
    goBack(){
        this.props.navigation.navigate('Login_third');
    }    
    Checklogin(val){
        console.log(val);
        var data = new FormData()
        data.append('date_of_birth', this.state.year+'-'+this.state.month+'-'+this.state.date);
        data.append('phone', this.state.mobilenumber);
        data.append('pin', val);
        //  console.log(data);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;            
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        console.log(auth);
        fetch("https://allaboardhealth.com/api/authentication/login", {
        method: "POST",
        headers: headers,                
        body:  data
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson!=""){
                console.log(responseJson);
                this.storeData();
                this.props.navigation.replace('AfterLogin',{Json_value:responseJson.data});
            }
            else{
                alert("Wrong Login Details");
                this.pinview.clear();                
            }
        }).catch((error) =>{
            console.error(error);
        });
    }
   
    render() {       
        const { navigate } = this.props.navigation;
        
        return (        
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <Image
                style={{width:40, height:40 ,justifyContent:'center',alignSelf:'center',top:20}}
                source={require('../../uploads/logo.png')}
            /> 
            <View style={{alignItems:'center',flex:1,paddingTop:20}}>
                {/* <Image
                    style={{width:40, height:40 }}
                        source={require('../../uploads/logo.png')}
                />                 */}
                <Text style={styles.text_css}>
                        Verify your pin.
                </Text>
                <PinView
                    buttonBgColor="transparent"
                    buttonTextColor="white"
                    inputBgColor="white"
                    keyboardViewTextStyle={{fontSize:22}}                
                    inputBgOpacity={1}                
                    ref={input =>this.pinview = input}
                    onComplete={(val, clear)=>{this.Checklogin(val)}}                
                    pinLength={4} // You can also use like that.
                />
            </View>
            
            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:'#e71d36',width:'100%'}} onPress={()=>this.goBack()}>
                    <Text style={styles.next_btn}>Back</Text>
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
        fontSize:28,
        marginTop:5,
        marginBottom:15,
    },
    text_welcome:{
        color:'white',
        fontSize:30,
        marginTop:30
    },
    next_btn:{
        fontSize:20,
        color:'black',
        padding:15,
        textAlign:'center'
    },
});