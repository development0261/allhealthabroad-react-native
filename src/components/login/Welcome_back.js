import React, {Component} from 'react';
import {Picker, StyleSheet, View, Text, ActivityIndicator, Image, StatusBar} from 'react-native';
import PinView from 'react-native-pin-view';
import {decode as atob, encode as btoa} from 'base-64';

export default class Welcome_back extends Component{
    constructor(props){
        super(props)        
        this.state = {
            mobilenumber:"",
            dob:"",
            loading:true
        }        
        this.Checklogin = this.Checklogin.bind(this);
    }

    componentDidMount(){
        const { navigation  } = this.props;
        const mobileNumber = navigation.getParam('Json_value', 'NO-ID');
        let value = JSON.parse(mobileNumber);        
        this.setState({mobilenumber:value.mobile,dob:value.dob,loading:false});
    }   

    Checklogin(val){
        this.setState({loading:true});
        var data = new FormData()
        data.append('date_of_birth', this.state.dob);
        data.append('phone', this.state.mobilenumber);
        data.append('pin', val);
        console.log(data);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        fetch("https://allaboardhealth.com/api/authentication/login", {
            method: "POST",
            headers: headers,
            body:  data
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson!=""){
                this.setState({loading:false});
                this.props.navigation.replace('AfterLogin',{Json_value:responseJson.data,mobile_number:this.state.mobilenumber,dob:this.state.dob});
            }
            else{
                this.setState({loading:false});
                alert("Wrong Login Details");
                this.pinview.clear();
            }
        }).catch((error) =>{
            console.error(error);
        });
    }
   
    render(){
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
            />
            {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
            <View style={{paddingTop:20}}>
                <Image
                    style={{width:'18%', height:'11.9%' ,alignSelf:'center'}}
                    source={require('../../uploads/logo.png')}
                />
                <Text style={styles.text_css}>
                    Welcome Back!
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
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:"#0097a7",
      justifyContent:'center',
      alignContent:'center'
    },
    text_css:{
        color:'white',
        fontSize:20,
        marginTop:15,
        marginBottom:15,
        textAlign:'center'
    },
    text_welcome:{
        color:'white',
        fontSize:30,
        marginTop:30
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex:99999        
    },
});