import React, {Component} from 'react';
import {Dimensions, StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Text, StatusBar, ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { Card, Icon, Divider} from 'react-native-elements';
//import firebase from 'firebase';

export default class Provider_chat extends Component{
    myInterval="";
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          first_name:"",
          last_name:"",
          type:"",
          loading:true,
        }
        this.chatNow = this.chatNow.bind(this);
        this.go_back = this.go_back.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }
    chatNow(appointment_id,provider_name,type,providerId){
      this.props.navigation.navigate('Chat',{Json_value:appointment_id,user_id:this.state.user_id,firstName:this.state.first_name,lastName:this.state.last_name,provider_name:provider_name,type:type,providerId:providerId});
    }
    go_back(){
      clearInterval(this.myInterval);
      this.props.navigation.navigate('AfterLogin',{patient_id:this.state.user_id});
    }
    formatDate(date) {
      var t = date.split(/[- :]/);    
      // Apply each element to the Date function
      var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
      var actiondate = new Date(d);    
      const monthNames = ["1", "2", "3", "4", "5", "6",
                  "7", "8", "9", "10", "11", "12"
                  ];                
      var d = new Date(date);
      var day = actiondate.getDate();
      var month = monthNames[actiondate.getMonth()];
      var hh = actiondate.getHours();
      var m = actiondate.getMinutes();
      var s = d.getSeconds();
      var year = actiondate.getFullYear().toString().substr(-2);
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
    
      var replacement = month + "/" + day + "/"+ year;
      /* if you want to add seconds
      replacement += ":"+s;  */
      replacement += " " +  " @ " + h + " " + m + ""+ dd;
  
      //var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    
      return replacement;
  
    }
    componentDidMount(){      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const FirstName = navigation.getParam('first_name', 'NO-ID');
      const LastName = navigation.getParam('last_name', 'NO-ID');
      const user_id= JSON.stringify(itemId).replace(/"/g,'');
      this.setState({first_name:FirstName,last_name:LastName});
      this.setState({user_id:user_id});        
      var data = new FormData()
      data.append('patient_id', user_id);
      //console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/getAllRequestForChat", {
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
              provider_name: responseJson.data,
              }, function(){    
            });
          }else{
            this.setState({unread_chat:"0"});
          }               
      }).catch((error) =>{
          console.error(error);
      });

      this.myInterval = setInterval(()=>{
        fetch("https://allaboardhealth.com/api/authentication/getAllRequestForChat", {
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
                provider_name: responseJson.data,
                }, function(){    
              });
            }else{
              this.setState({unread_chat:"0"});
            }               
        }).catch((error) =>{
            console.error(error);
        })}, 5000);

      // fetch("https://allaboardhealth.com/api/authentication/changeReadStatus", {
      //   method: "POST",
      //   headers: headers,
      //   body:  data
      // })
      // .then((response) => response.json())
      // .then((responseJson) => {
      //     if(responseJson.status==200){
      //       console.log(responseJson.data);
      //       //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
      //       this.setState({
      //         loading: false,
      //         }, function(){    
      //       });
      //     }               
      // }).catch((error) =>{
      //     console.error(error);
      // });
    }
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />          
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>
            <View style={styles.first_contanier}>
                <FlatList
                    data={this.state.provider_name}
                    renderItem={({item}) =><TouchableOpacity onPress={()=>this.chatNow(item.id,item.company_name,item.reason,item.mainprovider_id)}>
                    <Card borderRadius={15}>                      
                      <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:'30%'}}>
                          <Icon
                            name='envelope'
                            type='font-awesome'
                            color='black'
                            size={35}
                          />
                          {item.chat_count=='0'?null:<View style={styles.icon_chat}>
                          {item.chat_count < 10 ? <Text style={{fontSize:width * 0.042,color:'white',fontWeight:'bold'}}>0{item.chat_count}</Text>:<Text style={{fontSize:width * 0.042,color:'white',fontWeight:'bold'}}>{item.chat_count}</Text>}
                          </View>}
                        </View>
                        <View style={{width:'70%'}}>
                          <Text style={styles.list} >{this.formatDate(item.messageDate)}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.list} >{item.company_name} - </Text>
                        <Text style={styles.list_reason}>{item.reason} reason</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>}
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
var {height, width, fontScale} = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#0097a7'
  },  
  first_contanier: {
    padding:10,
  },
  dynamic_list_view:{
    flexDirection:'row',    
    marginTop:10,
    backgroundColor:'white',
    borderRadius:10,
  },
  list:{    
    fontSize:16,
    color:'black',    
  },
  list_reason:{
    fontSize:16,
    color:'black',
    fontWeight:'bold'
  },
  header_subtitle:{
    fontSize:14,
    color:'black',
    backgroundColor:'white',
    paddingBottom:10
  },
  name:{
    textAlign:"center",
    fontSize:25,
    backgroundColor:'#d4e09b',
    color:'black',    
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
  icon_chat:{
    width:width * 0.08,
    height:width * 0.08,
    backgroundColor:'red',        
    borderRadius:75,
    position:'absolute',
    right:10,
    top:-12,
    justifyContent:'center',
    alignItems:'center'
  },
});

