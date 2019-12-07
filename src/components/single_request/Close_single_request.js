import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View, TextInput, Text, StatusBar, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, AirbnbRating,Divider } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Dialog } from 'react-native-simple-dialogs';
import { relativeTimeThreshold } from 'moment';
//import { emptyStatement } from '@babel/types';
//import firebase from 'firebase';



export default class Close_single_request extends Component{
    constructor(props){      
        super(props)
        this.state ={
          rate_text:"",
          appointment_id:"",
          textvalue:"",
          show_text:"",
          text:"",
          given_rate:"",
          selected_reason:"I don't need this request any longer",
          patient_id:"",
          close_reason:"",
          reason: [
            {
              label: "I don't need this request any longer",
              value: "I don't need this request any longer",
              selected:true
            },
            {
              label: 'Request was taken care of',
              value: "Request was taken care of.",
            },
            {
              label: 'Other',
              value: 'Other',
            },           
          ],
          rating_dialog:false,
        }
      this.submit_request = this.submit_request.bind(this);
      this.close_request = this.close_request.bind(this);
      this.go_back = this.go_back.bind(this);
      this.close_press = this.close_press.bind(this);
    }
    close_press(){
      let close_reson="";
      if(this.state.show_text==true){
        const reason = this.state.text;
        close_reason = reason;
      }else{
        const reason = this.state.selected_reason;
        close_reason = reason;
      }
      this.props.navigation.navigate('Open_rating',{appointment_id:this.state.appointment_id,close_reason:close_reason,patient_id:this.state.patient_id});
    }
    submit_request(){
      var data = new FormData()
      data.append('appointment_id', this.state.appointment_id);
      data.append('given_rate', this.state.given_rate);
      data.append('message', this.state.rate_text);
      if(this.state.show_text==true){
        const reason = this.state.text;
        data.append('close_reason', reason);
      }else{
        const reason = this.state.selected_reason;
        data.append('close_reason', reason);
      }
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/closesinglerequest", {
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

    go_back(){
      this.props.navigation.navigate('Single_open_request');
    }
    close_request(reason){      
        let reason_value = reason.find(e => e.selected == true);
        reason_value = reason_value ? reason_value.value : reason[0].label;
        this.setState({selected_reason:reason_value});
        if(reason_value=='Other'){
          this.setState({show_text:true});
        }else{
          this.setState({show_text:false});
        }
      }
   
    componentDidMount(){
      const { navigation  } = this.props;     
      const appointment_id = navigation.getParam('appointment_id', 'NO-ID');
      const patientId = navigation.getParam('patient_id', 'NO-ID');
      this.setState({appointment_id:appointment_id,patient_id:patientId,given_rate: "2"});
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
            <Dialog
                visible={this.state.rating_dialog}
                title="Give Feedback"
                onTouchOutside={() => this.setState({rating_dialog: false})} >                
                <View>
                <KeyboardAvoidingView behavior="padding" enabled>
                  <HideWithKeyboard>
                    <Text style={{color:'black',fontWeight:'bold',marginBottom:5}}>Please Share your Experience and Rate</Text>
                  </HideWithKeyboard>
                  <AirbnbRating
                    count={5}
                    reviews={["Poor", "Average", "Good","Very Good", "Execellent"]}
                    defaultRating={2}
                    size={20}
                    onFinishRating={this.ratingCompleted}
                  />                  
                  <HideWithKeyboard><Divider style={{ backgroundColor: 'grey' ,marginTop:15}} /></HideWithKeyboard>
                  <TextInput
                      style={{borderColor: 'gray', borderWidth: 1,textAlignVertical: "top",marginTop:15,marginBottom:30}}
                      placeholder="Place write description here"
                      multiline={true}
                      numberOfLines={6}
                      onChangeText={(rate_text) => this.setState({rate_text})}
                  />
                  <Button
                    title="Submit"
                    color="red"
                    onPress={()=>{this.submit_request()}}
                  />
                </KeyboardAvoidingView>
                </View>
                
              </Dialog>
            <View style={{padding:25,flex:1}}>
                <View style={{backgroundColor:'white',padding:25,height:'95%',borderRadius:10}}>
                <HideWithKeyboard><Text style={styles.type_css}>Please confirm below to close this request</Text></HideWithKeyboard>
                  <RadioGroup radioButtons={this.state.reason} onPress={this.close_request} />                  
                  { this.state.show_text ? 
                    <View>
                        <TextInput
                          style={{borderColor: 'gray',height:"60%", borderWidth: 1,textAlignVertical: "top",marginTop:20}}
                          placeholder="Place write description here"
                          multiline={true}
                          numberOfLines={8}
                          onChangeText={(text) => this.setState({text})}
                        />
                    </View> : null
                  }
                </View>
            </View>
            
            <HideWithKeyboard>
              <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>{this.go_back()}}>
                      <Text style={styles.next_btn}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=>{this.close_press()}}>
                      <Text style={styles.next_btn}>Close</Text>
                  </TouchableOpacity>
              </View>
            </HideWithKeyboard>         
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
    height:'100%',
    backgroundColor:'red',
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

