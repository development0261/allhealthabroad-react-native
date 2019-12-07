import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View, TextInput, Text, StatusBar, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, AirbnbRating,Divider } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Dialog } from 'react-native-simple-dialogs';
//import { emptyStatement } from '@babel/types';
//import firebase from 'firebase';



export default class Rating extends Component{
    constructor(props){      
        super(props)
        this.state ={
          rate_text:"",
          appointment_id:"",
          textvalue:"",
          show_text:"",
          text:"",
          given_rate:"",
          patient_id:""
        }
      this.submit_request = this.submit_request.bind(this);      
      this.go_back = this.go_back.bind(this);
    }

    go_back(){      
      this.props.navigation.navigate('Close_request_list');
    }    
    submit_request(){
      var data = new FormData()      
      data.append('appointment_id', this.state.appointment_id);
      data.append('message', this.state.rate_text);
      data.append('given_rate', this.state.given_rate);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/saveFeedback", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
          if(responseJson.status==200){
            console.log(responseJson);
            this.setState({rating_dialog: false});
            this.props.navigation.navigate('AfterLogin',{patient_id:this.state.patient_id});
          }else{
            alert("something went wrong");
          }          
      }).catch((error) =>{
          console.error(error);
      });
    }    
    
    componentDidMount(){
      const { navigation  } = this.props;     
      const appointment_id = navigation.getParam('appointment_id', 'NO-ID');
      const patient_id = navigation.getParam('patient_id', 'NO-ID');
      
      console.log(appointment_id);
      this.setState({appointment_id:appointment_id,given_rate: "2",patient_id:patient_id});
    }
    ratingCompleted = (rating) => { this.setState({ given_rate: rating }); }
    
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');    
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>              
            <StatusBar 
                barStyle="light-content"
            />
            <View style={styles.first_contanier}>
            <Card borderRadius={10}>
                <View style={{height:'85%'}}>
                    <KeyboardAvoidingView behavior="padding" enabled>
                    <HideWithKeyboard>
                        <Text style={{color:'black',fontWeight:'bold',marginBottom:5,fontSize:20}}>Please Share your Experience and Rate</Text>
                    </HideWithKeyboard>
                    <AirbnbRating
                        count={5}
                        reviews={["Poor", "Average", "Good","Very Good", "Execellent"]}
                        defaultRating={2}
                        size={20}
                        onFinishRating={this.ratingCompleted}
                    />                  
                    <HideWithKeyboard><Divider style={{ backgroundColor: 'grey' ,marginTop:25}} /></HideWithKeyboard>
                    <TextInput
                        style={{borderColor: 'gray', borderWidth: 1,textAlignVertical: "top",marginTop:35,marginBottom:30}}
                        placeholder="Place write description here"
                        multiline={true}
                        numberOfLines={7}
                        onChangeText={(rate_text) => this.setState({rate_text})}
                    />                  
                    </KeyboardAvoidingView>
                </View>
                </Card>
                <View style={{flexDirection:"row",margin:20,justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginRight:20,width:'50%'}}>
                    <Button
                        onPress={()=>{this.submit_request()}}
                        title="Rate"
                        color='#f3ca3e'
                    />
                    </View>
                    <View style={{width:'50%'}}>
                    <Button
                        onPress={()=>{this.go_back()}}
                        title="Back"
                        color='#e71d36'
                    />
                    </View>
                </View>
            </View>
                
            
        </View>
        </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1f8b9f',    
  },
  first_contanier: {      
    padding:10,
  },
  type_css:{
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize:20,
    paddingBottom:10,
  },
  text_css:{
    textAlign: 'center',
    fontSize:16,
    paddingBottom:5,
  },
  next_btn:{
    fontSize:25,
    color:'black',
    padding:20,
    textAlign:'center'
  },
});

