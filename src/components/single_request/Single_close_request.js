import React, {Component} from 'react';
import {KeyboardAvoidingView, FlatList, StyleSheet, TextInput, View, ScrollView, Text, StatusBar, Button,TouchableOpacity} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, AirbnbRating, Divider, Rating } from 'react-native-elements';
import { ConfirmDialog , Dialog } from 'react-native-simple-dialogs';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

//import { emptyStatement } from '@babel/types';
//import firebase from 'firebase';



export default class Single_close_request extends Component{
    myInterval=""
    constructor(props){
        super(props)
        this.state ={
          isLoading: true,
          user_id:"",
          dataProvider:"",
          patient_id:"",
          reopen_id:"",
          rate_appointment_id:"",
          rating_dialog:false,
          text:"",
          given_rate:"2",
          prefer_time:"",
          injured:"",
        }
      this.reopen_request = this.reopen_request.bind(this);
      this.confirmation_popup = this.confirmation_popup.bind(this);
      this.calculateDifference = this.calculateDifference.bind(this);
      this.submitFeedback = this.submitFeedback.bind(this);
      this.go_back = this.go_back.bind(this);
      this.chat_log = this.chat_log.bind(this);
    }

    go_back(){      
      this.props.navigation.navigate('Close_request_list');
    }

    calculateDifference(date){
      var t = date.split(/[- :]/);
      // Apply each element to the Date function
      var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
      var currentDate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});      
      var seconds_left = (parseInt(new Date(currentDate).getTime() - parseInt(new Date(d).getTime())));

      seconds_left = seconds_left / 1000;
      // Add one to seconds
      seconds_left = seconds_left + 1;

      // do some time calculations
      days = parseInt(seconds_left / 86400);
      seconds_left = seconds_left % 86400;

      hours = parseInt(seconds_left / 3600);
      seconds_left = seconds_left % 3600;

      minutes = parseInt(seconds_left / 60);
      seconds = parseInt(seconds_left % 60);

      // format countdown string + set tag value
      timeDiff = days + "D / " + hours + "H / " + minutes + "M / " +seconds + "S";

      // seconds = Math.floor((currentDate - (actiondate))/1000);
      // minutes = Math.floor(seconds/60);
      // hours = Math.floor(minutes/60);
      // days = Math.floor(hours/24);
      
      // hours = hours-(days*24);
      // minutes = minutes-(days*24*60)-(hours*60);
      // seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      // diffDays = days +'D / '+ hours +'H / '+minutes+'M / '+ seconds + 'S'
      // const diffTime = Math.abs(currentDate.getTime() - actiondate.getTime());
      // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return timeDiff;
    }

    confirmation_popup(appointmet_ID){
      this.setState({dialogVisible:true,reopen_id:appointmet_ID});
    }
    rating_popup(appointmet_ID){      
      this.props.navigation.navigate('Rating',{appointment_id:appointmet_ID,patient_id:this.state.patient_id});
    }
    chat_log(appointmet_ID){      
      this.props.navigation.navigate('Chat_log',{appointment_id:appointmet_ID,patient_id:this.state.patient_id});
    }
    submitFeedback(){
      let appointment_id = this.state.rate_appointment_id;
      let feedback_text =  this.state.text;
      let rate = this.state.given_rate;
      
      var data = new FormData()      
      data.append('appointment_id', appointment_id);
      data.append('message', feedback_text);
      data.append('given_rate', rate);
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
          if(responseJson.status==200){
            console.log(responseJson);
            this.setState({rating_dialog:false})
            this.props.navigation.navigate('Close_request_list',{patient_id:this.state.patient_id});
          }else{
            alert("something went wrong");
          }
      }).catch((error) =>{
          console.error(error);
      });
    }    
    
    reopen_request(){
      var data = new FormData()      
      data.append('appointment_id', this.state.reopen_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/reopenAppointment", {
      method: "POST",
      headers: headers,
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
            console.log(responseJson);
            this.setState({dialogVisible:false})
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
      const provider_id = navigation.getParam('providerID', 'NO-ID');
      const patient_id = navigation.getParam('patientID', 'NO-ID');
      const appointment_id = navigation.getParam('appointmentId', 'NO-ID');
      this.setState({patient_id:patient_id});
      
      var data = new FormData();
      data.append('patient_id', patient_id);
      data.append('user_id', provider_id);
      data.append('appointment_id', appointment_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      
      fetch("https://allaboardhealth.com/api/authentication/singlecloserequests", {
      method: "POST",
      headers: headers,
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson.data);
              this.setState({
                isLoading: false,
                dataProvider: responseJson.data,
                prefer_time:responseJson.data[0].preferred_time.split(','),
                injured:responseJson.data[0].injured.split(','),
                given_rate: "2",
              }, function(){
              });
          }else{
            alert("something went wrong");
          }
      }).catch((error) =>{
          console.error(error);
      });      
    }
    ratingCompleted = (rating) => { this.setState({ given_rate: rating }); }
    
    render() {
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');

      const time = [];
      const injured =[];
        console.log(this.state.prefer_time);
        for(let i=0;i<this.state.prefer_time.length;i++){
          if(this.state.prefer_time[i]!=""){
              if(i==this.state.prefer_time.length-1){
                  time.push(<Text key={i} style={styles.req_data}>{this.state.prefer_time[i].replace(/-/g,' ')}</Text>);
              }else{
                  time.push(<Text key={i} style={styles.req_data}>{this.state.prefer_time[i].replace(/-/g,' ') + '\n' }</Text>);
              }
          }
        }
        
        console.log(this.state.injured);
        for(let i=0;i<this.state.injured.length;i++){
          if(this.state.injured[i]!=""){
              if(i==this.state.injured.length-1){
                injured.push(<Text key={i} style={styles.req_data}>{this.state.injured[i].replace(/-/g,' ')}</Text>);
              }else{
                injured.push(<Text key={i} style={styles.req_data}>{this.state.injured[i].replace(/-/g,' ') + '\n' }</Text>);
              }
          }
        }
      // var now  = "04/09/2013 15:00:00";
      // var then = "04/09/2013 14:20:30";
      // console.log(moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"));
        return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.first_contanier}>
              <StatusBar
                barStyle="light-content"
              />
              <ConfirmDialog
                title="ReOpen Request"
                message="Are you sure about to ReOpen this request?"
                visible={this.state.dialogVisible}
                onTouchOutside={() => this.setState({dialogVisible: false})}
                positiveButton={{
                    title: "YES",
                    onPress: () => {this.reopen_request()}
                }}
                negativeButton={{
                    title: "NO",
                    onPress: () => this.setState({dialogVisible:false})
                }}
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
                      onChangeText={(text) => this.setState({text})}
                  />
                  
                  <Button
                    title="Submit"
                    color="red"
                    onPress={()=>{this.submitFeedback()}}
                  />
                </KeyboardAvoidingView>
                </View>
                
              </Dialog>
              <FlatList
                  data={this.state.dataProvider}
                  showsVerticleScrollIndicator={false}
                  renderItem={({item}) =><View>
                      <Card borderRadius={10}>
                          <Text style={styles.type_css}>
                              {item.company_name}
                          </Text>
                          <Text style={styles.text_css}>
                          <Text style={{fontWeight: "bold",color:"black"}}>Opened On </Text>
                            : {item.created_at}
                          </Text>
                          <Text style={styles.text_css}>
                          <Text style={{fontWeight: "bold",color:"black"}}>Closed On </Text>
                            : {item.closed_on}
                          </Text>
                          {item.rate_given != null ? <AirbnbRating
                            count={5}
                            reviews={["Poor", "Average", "Good","Very Good", "Excellent"]}
                            defaultRating={item.rate_given}
                            size={20}
                            isDisabled={true}
                          />:null}
                          <Text style={styles.text_css}>
                          </Text>
                          {item.subprovider_detail=="First Available Provider"?<View style={{flexDirection:"row",paddingBottom:10}}>
                            <Text style={{fontWeight: "bold",color:"black"}}>Provider: </Text>
                            <Text>{item.subprovider_detail}</Text>
                          </View>:<View style={{flexDirection:"row",paddingBottom:10,width:120}}>
                            <Text style={{fontWeight: "bold",color:"black"}}>Provider : </Text>
                            <Text>{item.subprovider_detail}</Text>
                          </View>}
                          <View style={{flexDirection:"row",paddingBottom:10,width:'75%'}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>When : </Text>
                              <Text>{item.when_question} </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Preferred Time : </Text>
                              <Text>{time} </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Injuried : </Text>
                              <Text>{injured} </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10,width:'75%'}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Reason : </Text>
                              <Text>{item.reason} </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10,width:'75%'}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Extra : </Text>
                              <Text>{item.extra} </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10,width:'60%'}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Reason To Close : </Text>
                              <Text>{item.close_reason} </Text>
                          </View>
                          {item.message!=""? <View style={{flexDirection:"row",paddingBottom:10,width:'60%'}}>
                              <Text style={{fontWeight: "bold",color:"black"}}>Final message : </Text>
                              <Text>{item.message} </Text>
                          </View>:null}
                      </Card>                      
                      <View style={{flexDirection:"row",margin:20,justifyContent:'center',alignItems:'center'}}>
                          <View style={{marginRight:20,width:'50%'}}>
                            <Button
                              onPress={()=>{this.confirmation_popup(item.id)}}
                              title="Re-Open Request"
                              color='#f3ca3e'
                            />
                          </View>
                          {item.closed_by==null || item.rate_given==null?
                            <View style={{width:'50%'}}>
                              <Button
                                onPress={()=>{this.rating_popup(item.id)}}
                                title="Review Request"
                                color='#e71d36'
                              />                            
                            </View>:<View style={{width:'50%'}}>
                              <Button
                                onPress={()=>{this.chat_log(item.id)}}
                                title="View Chat Log"
                                color='#E67112'
                              />
                            </View>
                          }
                      </View>
                        {item.rate_given==null?<View style={{width:'50%',alignContent:'center',alignSelf:'center'}}>
                          <Button
                            onPress={()=>{this.chat_log(item.id)}}
                            title="View Chat Log"
                            color='#E67112'
                          />
                      </View>:null}
                  </View>}
                keyExtractor={({id}, index) => id}
              />            
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity style={{backgroundColor:'#e71d36'}} onPress={()=>this.go_back()}>
              <Text style={styles.next_btn}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize:20,
    color:'black',
    padding:15,
    textAlign:'center'
  },
});