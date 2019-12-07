import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, TouchableOpacity, View, ScrollView, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, CheckBox } from 'react-native-elements';
import { ConfirmDialog } from 'react-native-simple-dialogs';
//import { emptyStatement } from '@babel/types';
//import firebase from 'firebase';



export default class Single_open_request extends Component{
    myInterval=""
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          user_id:"",
          dataProvider:"",
          patient_id:"",
          dialogVisible:false,
          delete_id:"",
          subprovider_id:"",
          subProvider:"",
          firstName:"",
          lastName:"",
          subprovider_type:"",
          prefer_time:"",
          injured:""
        }
      this.open_request_detail = this.open_request_detail.bind(this);
      // this.delete_single_openrequest = this.delete_single_openrequest.bind(this);
      this.confirmation_popup = this.confirmation_popup.bind(this);
      this.update_click = this.update_click.bind(this);
      this.calculateDifference = this.calculateDifference.bind(this);
      this.go_back = this.go_back.bind(this);
    }

    go_back(){      
      this.props.navigation.navigate('Request_list');
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
    
    open_request_detail(appointment_id,mainprovider_id,patient_id){
      console.log(appointment_id);
      console.log(mainprovider_id);
      console.log(patient_id);
    }

    update_click(appointmet_ID,when,time,injured,reason,extra){      
      this.props.navigation.navigate('Update_when',{appointment_id:appointmet_ID,when_question:when,preferred_time:time,injured:injured,reason:reason,extra:extra});
    }

    confirmation_popup(appointmet_ID){
      this.props.navigation.navigate('Close_single_request',{appointment_id:appointmet_ID,patient_id:this.state.patient_id});
    }
    // delete_single_openrequest(){
    //   var data = new FormData()      
    //   data.append('appointment_id', this.state.delete_id);
    //   console.log(data);
    //   var headers = new Headers();
    //   headers.append('Accept','application/json');
    //   let encode = btoa('admin:12345');
    //   let auth = 'Basic ' + encode;            
    //   headers.append("Authorization", auth);
    //   headers.append("X-API-KEY",'admin@123');
    //   //console.log(auth);
    //   fetch("https://allaboardhealth.com/api/authentication/deletesinglerequest", {
    //   method: "POST",
    //   headers: headers,                
    //   body:  data
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //       if(responseJson.status==200){
    //         console.log(responseJson);
    //         this.props.navigation.navigate('AfterLogin',{patient_id:this.state.patient_id});
    //       }else{
    //         alert("something went wrong");
    //       }          
    //   }).catch((error) =>{
    //       console.error(error);
    //   });
    // }
   
    componentDidMount(){
      const { navigation  } = this.props;
      const provider_id = navigation.getParam('providerID', 'NO-ID');
      const patient_id = navigation.getParam('patientID', 'NO-ID');
      const appointment_id = navigation.getParam('appointmentId', 'NO-ID');
      const type = navigation.getParam('type', 'NO-ID');
      this.setState({patient_id:patient_id});
      
      var data = new FormData()
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
      
      fetch("https://allaboardhealth.com/api/authentication/singleopenrequests", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
            console.log(responseJson.data[0].reason);
            // console.log(responseJson.data[0].preferred_time.split(','));
          //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
          if(responseJson.data[0].reason=="Appointment"){
            this.setState({
              isLoading: false,
              dataProvider: responseJson.data,
              prefer_time:responseJson.data[0].preferred_time.split(','),
              injured:responseJson.data[0].all_that_apply.split(',')
            }, function(){
            });
          }else if(responseJson.data[0].reason=="Test Results"){
            console.log(responseJson.data[0]);
            this.setState({
              isLoading: false,
              dataProvider: responseJson.data,
              // prefer_time:responseJson.data[0].preferred_time.split(','),
              // injured:responseJson.data[0].all_that_apply.split(',')
            }, function(){
            });
          }
        }else{
          alert("something went wrong");
        }          
      }).catch((error) =>{
          console.error(error);
      });
    }
    
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const time = [];
      const injured =[];
        //Displaying array object in the app
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
        //Displaying array object in the app
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
        return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.first_contanier}>
            <StatusBar 
                barStyle="light-content"
            />
            <FlatList              
              data={this.state.dataProvider}
              showsVerticleScrollIndicator={false}
              renderItem={({item}) =><View>
                  <Card borderRadius={10} containerStyle={{width:'95%'}}>
                    <Text style={styles.type_css}>
                        {item.company_name}
                    </Text>                   
                    <Text style={styles.text_css}>
                        {item.created_at}
                    </Text>
                    {/* <Text style={styles.text_css}>
                        {this.calculateDifference(item.created_at)}
                    </Text> */}
                    <Text style={styles.text_css}>

                    </Text>
                    
                    {item.subprovider_detail=="First Available Provider"?<View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Provider: </Text>
                      <Text>{item.subprovider_detail}</Text>
                    </View>:<View style={{flexDirection:"row",paddingBottom:10,width:120}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Provider: </Text>
                      <Text>{item.subprovider_detail}</Text>
                    </View>}
                    {item.reason=="Test Results"?
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Type of test: </Text>
                      <Text>{item.type_of_test}</Text>
                    </View>:null}
                    {item.reason=="Appointment"?
                    <View style={{flexDirection:"row",paddingBottom:10,width:'60%'}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>When: </Text>
                      <Text>{item.when_question}</Text>
                    </View>:item.reason=="Test Results"?
                    <View style={{flexDirection:"row",paddingBottom:10,width:'60%'}}>
                    <Text style={{fontWeight: "bold",color:"black"}}>When was tests done: </Text>
                    <Text>{item.when_test_done}</Text></View>:null}

                    {item.reason=="Test Results"?
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Where: </Text>
                      <Text>{item.where_test_done}</Text>
                    </View>:null}


                    {item.reason=="Appointment"?
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Preferred Time: </Text>
                      <Text>{time}</Text>
                    </View>:null}                    
                    {item.reason=="Appointment"?
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Injuried: </Text>
                      <Text>{injured}</Text>
                    </View>:null}
                    <View style={{flexDirection:"row",paddingBottom:10,width:'60%'}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Reason: </Text>
                      <Text>{item.reason}</Text>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10,width:'80%'}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Extra: </Text>
                      <Text>{item.extra}</Text>
                    </View>
                  </Card>
                  <View style={{flexDirection:"row",margin:20,justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginRight:20,width:'50%'}}>
                        <Button
                          onPress={()=>{this.update_click(item.id,item.when_question,item.preferred_time,item.injured,item.reason,item.extra)}}
                          title="Update"
                          color='#f3ca3e'
                        />                
                    </View>
                    <View style={{width:'50%'}}>
                      <Button
                        onPress={()=>{this.confirmation_popup(item.id)}}
                        title="CLOSE"
                        color='#e71d36'
                      />               
                    </View>
                  </View>
                </View>
                }
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
const {height, width} = Dimensions.get('window');
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
    fontSize:width * 0.055,
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

