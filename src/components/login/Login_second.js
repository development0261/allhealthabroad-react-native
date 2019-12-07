import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Dimensions, View, Text, TouchableOpacity, Image, StatusBar, Keyboard,TouchableWithoutFeedback} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import DeviceInfo from 'react-native-device-info';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
//import firebase from 'firebase';

export default class Login_second extends Component{
    constructor(props){
        super(props)
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            mobileNumber:""
        }       
    }
   
    onComplete() {
        console.log(this.state.mobileNumber);
        if(this.state.mobileNumber.length<14 ){
            alert("Please Enter Correct 10 Digit Mobile Number");        
            this.mobileNumber.clear();
            return false;
        }
        this.props.navigation.navigate('Login_third',{mobile_number:this.state.mobileNumber});
    }
   
    componentDidMount(){        
        const { navigation  } = this.props;
        let phoneNumber = navigation.getParam('mobile',null);
        this.setState({mobileNumber:phoneNumber});
        
        String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };        
        if(phoneNumber!=null){
            if(phoneNumber.length==10){
                var result = phoneNumber.splice(3, 0, ") ");
                var result1 = '('+result.splice(8, 0, "-");
                this.setState({mobileNumber:result1});
            }else{    
                mobile_Number = phoneNumber.substr(2);
                var result = mobile_Number.splice(3, 0, ") ");
                var result1 = '('+result.splice(8, 0, "-");
                this.setState({mobileNumber:result1});
            }
        }else{            
            this.setState({mobileNumber:""});
        }
    }

    render() {       
        const { navigate } = this.props.navigation;
        var {height, width} = Dimensions.get('window');
        return (            
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>        
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <Image
              style={{width: '100%', height: '20%',top:height * 0.1}}
              source={require('../../uploads/Logo_Horizontal_White_PNG_new.png')}
            />            
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                {/* <Image
                    style={{width: '100%', height: '20%'}}
                    source={require('../../uploads/Logo_Horizontal_White_PNG_new.png')}
                /> */}
                <HideWithKeyboard>
                    <Text style={styles.text_css}>
                        Verify your cell number.
                    </Text>
                </HideWithKeyboard>
                <TextInputMask 
                    style={styles.textinput}
                    refInput={ref => { this.mobileNumber = ref }}
                    defaultValue={this.state.mobileNumber}
                    placeholder="Enter Phone Number"
                    placeholderTextColor='rgba(000,000,000,000.7)'
                    returnKeyType="next"            
                    autoCorrect={false}
                    keyboardType = 'numeric'
                    onChangeText={(formatted, extracted) => {               
                        this.setState({mobileNumber:formatted})
                    }}
                    mask={"([000]) [000]-[0000]"} 
                />
            </View>            
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'100%'}} onPress={()=>this.onComplete()}>
                    <Text style={styles.next_btn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </TouchableWithoutFeedback>        
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
        fontSize:25,        
    },
    text_welcome:{
        color:'white',
        fontSize:30,        
    },
    next_btn:{
        fontSize:20,
        color:'black',
        padding:15,
        textAlign:'center',
    },
    textinput:{
        marginTop:30,
        fontSize: 15,
        color: 'black',
        marginBottom: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        textAlign:'center',
        width:"80%",
        backgroundColor:'white'
    },  
});