import React, {Component} from 'react';
import {Image, StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Text, StatusBar, ActivityIndicator,TextInput} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { Card, Icon } from 'react-native-elements';
//import firebase from 'firebase';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

export default class Chat_log extends Component{
    myInterval="";
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          first_name:"",
          last_name:"",
          type:"",
          provider_name:"",
          provider_id:"",
          appointment_id:"",
          loading:true,
          start_chat:true,
          text:"",
        }
        this.go_back = this.go_back.bind(this);
        this.formatDate = this.formatDate.bind(this);        
    }

    formatDate(date) {
    var t = date.split(/[- :]/);    
    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    var actiondate = new Date(d);    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];                
      var d = new Date(date);
      var day = actiondate.getDate();
      var month = monthNames[actiondate.getMonth()];
      var hh = actiondate.getHours();
      var m = actiondate.getMinutes();
      var s = d.getSeconds();
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
    
      /* if you want 2 digit hours:*/
      h = h<10?"0"+h:h; 
    
      var replacement = h + ":" + m;
      /* if you want to add seconds
      replacement += ":"+s;  */
      replacement += " " + dd + " | " + month + " " + day;
 
      //var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    
      return replacement;

    }
    go_back(){
      clearInterval(this.myInterval);
      this.props.navigation.navigate('Single_close_request');
    }
    componentDidMount(){      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('appointment_id', 'NO-ID');
      const appointment_id= JSON.stringify(itemId).replace(/"/g,'');
      const patient_id = navigation.getParam('patient_id', 'NO-ID');      
      
      this.setState({appointment_id:appointment_id,patient_id:patient_id});

      var data = new FormData()
      data.append('appointment_id', appointment_id);
      data.append('patient_id', patient_id);
      //console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/chatmessage", {
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
                start_chat:false                
                }, function(){    
            });
        }else{
            this.setState({
                loading: false,                
            });
        }
      }).catch((error) =>{
          console.error(error);
      });      
    }
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />
          <View>
            <Text style={styles.name}>Chat Log</Text>
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
            
            <View style={{padding:15,flex:1}}>
                <View style={styles.first_contanier}>
                    <ScrollView ref={(scrollView) => { this.scrollView = scrollView }}>                        
                        {this.state.start_chat==true? <Text style={styles.list} >No Message Found</Text>:null}
                        <FlatList                        
                            data={this.state.dataProvider}                        
                            renderItem={({item}) =>
                            <View style={styles.dynamic_list_view}>                                                
                                {item.receiver_id==this.state.patient_id ?
                                <View style={{marginBottom:25,width:'100%'}}>
                                    <Text style={styles.receive_msg}>{item.message}</Text>
                                    <Text>{item.first_name} {item.last_name} | {this.formatDate(item.sent_at)}</Text>
                                </View>:
                                <View style={{marginBottom:25,width:'100%',alignItems:'flex-end'}}>
                                    <Text style={styles.send_msg}>{item.message}</Text>
                                    <Text>{this.formatDate(item.sent_at)}</Text>                                
                                </View>}
                            </View>
                        }
                        keyExtractor={({id}, index) => id}
                        />
                    </ScrollView>
                </View>
            </View>
            
            <View>                
                <HideWithKeyboard>
                    <TouchableOpacity style={{backgroundColor:'#e71d36'}} onPress={()=>this.go_back()}>
                        <Text style={styles.next_btn}>Back</Text>
                    </TouchableOpacity>
                </HideWithKeyboard>
          </View>    
        </View>
        );
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#0097a7'
  },  
  first_contanier: {
    padding:15,
    backgroundColor:'white',
    borderRadius:10,
    height:'100%'
  },
  dynamic_list_view:{
    flexDirection:'row',    
    backgroundColor:'white',
  },
  list:{    
    fontSize:18,
    color:'black',
    textAlign:'center',    
    flex: 1,
    flexWrap: 'wrap',
    fontWeight:'bold',
    marginBottom:10,
  },
  receive_msg:{
    fontSize:14,
    color:'black',        
    backgroundColor:'#ebebeb',    
    padding:10,
    borderRadius:10,
    width:'65%',    
  },  
  send_msg:{
    fontSize:14,
    color:'white',
    backgroundColor:'#05728f',
    padding:10,
    borderRadius:10,
    width:'65%',
  },
  name:{
    textAlign:"center",
    fontSize:25,
    backgroundColor:'#d4e09b',
    color:'black',
    paddingTop:25,
    paddingBottom:25,
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
  circle:{
    width: 30,
    height: 30,
    backgroundColor:'#ed2241',
    borderRadius:80,
    marginRight:10,
    marginLeft:10,
    justifyContent:'center',
    alignSelf:'center'
  },
});