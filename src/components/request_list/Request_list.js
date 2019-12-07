import React, {Component} from 'react';
import {Picker, FlatList, StyleSheet, ActivityIndicator, View, TouchableOpacity, Text, StatusBar} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card , Icon } from 'react-native-elements';
//import { emptyStatement } from '@babel/types';
//import firebase from 'firebase';



export default class Request_list extends Component{
    myInterval="";
    constructor(props){      
        super(props)
        this.state ={
          loading: true,
          patient_id:"",
          dataProvider:"",
          first_name:"",
          last_name:"",
          HasData:false,
          
        }        
      this.open_request_detail = this.open_request_detail.bind(this);
      this.go_back = this.go_back.bind(this);
      this.formatDate = this.formatDate.bind(this);
      this.chatNow = this.chatNow.bind(this);
      this.calculateDifference = this.calculateDifference.bind(this);
    }
    chatNow(appointment_id,provider_name,type,providerId){
      this.props.navigation.navigate('Chat',{Json_value:appointment_id,user_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,provider_name:provider_name,type:type,providerId:providerId});
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

    formatDate(date) {
      var t = date.split(/[- :]/);
    // Apply each element to the Date function
      var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
      var actiondate = new Date(d);
      var d = new Date(date);
      var hh = actiondate.getHours();
      var m = actiondate.getMinutes();
      var s = actiondate.getSeconds();
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
        h = hh - 12;
        dd = "PM";
      }
      if (h == 0) {
        h = 12;
      }
      m = m < 10 ? "0" + m : m;
    
      s = s < 10 ? "0" + s : s;
    
      /* if you want 2 digit hours:
      h = h<10?"0"+h:h; */
    
      var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    
      var replacement = h + ":" + m;
      /* if you want to add seconds
      replacement += ":"+s;  */
      replacement += " " + dd;
    
      return date.replace(pattern, replacement);
    }
    
    open_request_detail(appointment_id,mainprovider_id,patient_id,type){
      clearInterval(this.myInterval);
      this.props.navigation.navigate('Single_open_request',{providerID:mainprovider_id,patientID:patient_id,appointmentId:appointment_id,type:type});
    }
    go_back(){      
      clearInterval(this.myInterval);
      this.props.navigation.navigate('AfterLogin',{patient_id:this.state.patient_id});
    }
    componentDidMount(){          
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const FirstName = navigation.getParam('first_name', 'NO-ID');
      const LastName = navigation.getParam('last_name', 'NO-ID');
      const patient_id= JSON.stringify(itemId).replace(/"/g,'');
      this.setState({patient_id:patient_id,first_name:FirstName,last_name:LastName});
      var data = new FormData()
      data.append('id', patient_id);      
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/apprequestopen", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status==200){
            console.log(responseJson.data);
            //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});      
            this.setState({
              loading: false,
              dataProvider: responseJson.data,
            }, function(){    
            });
            console.log(this.state.dataProvider);
        }else if(responseJson==600){          
          this.setState({loading:false,HasData:true});
        }else{
          alert("something went wrong");
        }          
    }).catch((error) =>{
        console.error(error);
    });

    this.myInterval = setInterval(()=>{
      fetch("https://allaboardhealth.com/api/authentication/apprequestopen", {
      method: "POST",
      headers: headers,
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
            console.log(responseJson.data);
            //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
            this.setState({
              loading: false,
              dataProvider: responseJson.data,
              }, function(){    
            });
          }else{
            this.setState({unread_chat:"0"});
          }               
      }).catch((error) =>{
          console.error(error);
      })}, 1000);      
    }

    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');    
        return (
          
        <View style={styles.container}>
          { this.state.HasData==false?null:<View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:28,color:'white',marginTop:50}}> No Data Found </Text>
          </View>}
          <View style={styles.first_contanier}>
            <StatusBar 
                barStyle="light-content"
            />
            {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
            </View>}
            <FlatList
              style={styles.movie_list}
              data={this.state.dataProvider}
              showsVerticleScrollIndicator={false}
              renderItem={({item}) =><View style={styles.dynamic_list_view}>
                
                  <Card borderRadius={10}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{width:'85%'}}>
                      <TouchableOpacity onPress={()=>{this.open_request_detail(item.id,item.mainprovider_id,item.patient_id,item.reason)}}>
                        <Text style={styles.type_css}>
                            {item.reason}
                        </Text>
                        <Text style={styles.text_css}>
                            {item.company_name}
                        </Text>
                        <Text style={styles.text_css}>
                            {this.formatDate(item.created_at)}
                        </Text>
                        <Text style={styles.text_css}>
                            {this.calculateDifference(item.created_at)}
                        </Text>
                        </TouchableOpacity>
                      </View>                      
                      <View style={{justifyContent:'center',alignContent:'center',width:'20%'}}>
                        <TouchableOpacity onPress={()=>{this.chatNow(item.id,item.company_name,item.reason,item.mainprovider_id)}}>
                          {item.chat_count==0?
                          <Icon
                            name='envelope-open'
                            type='font-awesome'
                            iconStyle={{fontSize:30,alignSelf:'center'}}
                          /> : <View>
                              <Text style={styles.chat_css}>
                                {item.chat_count}
                              </Text>
                              <Icon
                                name='envelope'
                                type='font-awesome'
                                iconStyle={{fontSize:30,alignSelf:'center'}}
                              />
                            </View>}
                          </TouchableOpacity>
                      </View>                      
                    </View>                      
                  </Card>
                
              </View>}
              keyExtractor={({id}, index) => id}
            />
          </View>
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  first_contanier: {      
    padding:10,
    flex:1
  },
  dynamic_list_view:{
    textAlign:'center',    
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
  chat_css:{    
    //borderRadius: 60 / 2,
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    alignSelf:'center',
    position:'absolute',
    right:10,
    top:-18,
    //borderWidth: 2    
  },
  next_btn:{
    fontSize:20,
    color:'black',
    padding:15,
    textAlign:'center'
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

