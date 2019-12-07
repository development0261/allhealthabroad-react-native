import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, StyleSheet, Image, ScrollView, View, Alert, Text, StatusBar, ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { Card, Icon, Divider} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import MarqueeText from 'react-native-marquee';

//import firebase from 'firebase';

export default class Home extends Component{
    myInterval=""
    constructor(props){
        super(props)
        this.state ={
          loading: true,
          user_id:"",
          mainprovider_id:"",
          patient_id:"",
          dataProvider:"",
          total_open_request:"",
          total_close_request:"",
          first_name:"",
          last_name:"",
          appointment:"Appointment",
          pharmacy:"Pharmacy",
          result:"Test Results",
          referral: "Referral",
          billing:"Billing",
          unread_chat:""
        }
        this.appoinment_clicked = this.appoinment_clicked.bind(this);
        this.page_reloaded = this.page_reloaded.bind(this);
        this.chat_page = this.chat_page.bind(this);
    }

    page_reloaded(){
      const { navigation  } = this.props;
      const patientId = navigation.getParam('patient_id', '');
      console.log(patientId);
      if(patientId!=""){
      var data2 = new FormData()
      data2.append('patient_id', patientId);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      fetch("https://allaboardhealth.com/api/authentication/countallopenrequests", {
        method: "POST",
        headers: headers,
        body:  data2
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status==200){
                console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                this.setState({
                  loading: false,
                  total_open_request: responseJson.data,
                  }, function(){
                });
            }else{
              this.setState({total_open_request:"0"});
            }
        }).catch((error) =>{
            console.error(error);
        });

      var data3 = new FormData()
      data3.append('patient_id', patientId);
      fetch("https://allaboardhealth.com/api/authentication/countallcloserequests", {
        method: "POST",
        headers: headers,
        body:  data3
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status==200){
                console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                this.setState({
                  loading: false,
                  total_close_request: responseJson.data,
                  }, function(){
                });
            }else{
              this.setState({total_close_request:"0"});
            }
        }).catch((error) =>{
            console.error(error);
        });

        var data4 = new FormData()
        data4.append('patient_id', patientId);
        fetch("https://allaboardhealth.com/api/authentication/countchat", {
        method: "POST",
        headers: headers,
        body:  data4
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status==200){
                console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                this.setState({
                  loading: false,
                  unread_chat: responseJson.data.length,
                  }, function(){
                });
            }else{
              this.setState({unread_chat:""});
            }
        }).catch((error) =>{
            console.error(error);
        });
        var data5 = new FormData()
        data5.append('id', patientId);
        
        fetch("https://allaboardhealth.com/api/authentication/countprovider", {
        method: "POST",
        headers: headers,
        body:  data5
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status==200){
                //console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                this.setState({
                  loading: false,
                  dataProvider: responseJson.data,
                }, function(){
                });
            }else{
              this.setState({dataProvider:"0"});
            }
        }).catch((error) =>{
            console.error(error);
        });
      }
    }
    appoinment_clicked(userid,type){
      this.props.navigation.navigate('AfterAppointment',{Json_value:userid,first_name:this.state.first_name,last_name:this.state.last_name,type:type});
    }
    request_list(user_id){
      this.props.navigation.navigate('Request_list',{Json_value:user_id,first_name:this.state.first_name,last_name:this.state.last_name});
    }
    close_request_list(user_id){
      this.props.navigation.navigate('Close_request_list',{Json_value:user_id});
    }
    connecterpage(userid){
      this.props.navigation.navigate('Connecter',{Json_value:userid,first_name:this.state.first_name,last_name:this.state.last_name});
    }
    chat_page(){
      this.props.navigation.navigate('Provider_chat',{Json_value:this.state.patient_id,first_name:this.state.first_name,last_name:this.state.last_name});
    }
    link_provider(patient_id,mainprovider_id){
      var data = new FormData()
      data.append('patient_id', patient_id);
      data.append('user_id', mainprovider_id);
      console.log(patient_id);
      console.log(mainprovider_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/updateproviderstatus", {
      method: 'POST',
      headers: headers,
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status==200){
          console.log(responseJson);
          Alert.alert(
            'Link with New Provider',
            'Provider added successfully',
            [
              {
                text: 'Ok',
                onPress: this.componentDidMount()
              },
            ],
            {cancelable: false},
          );
        }else{
          alert("Something went wrong");
        }
      }).catch((error) =>{
        console.error(error);
      });
    }
    
    componentDidMount(){
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const user_id= JSON.stringify(itemId.id).replace(/"/g,'');
      const first_name= JSON.stringify(itemId.first_name).replace(/"/g,'');
      const last_name= JSON.stringify(itemId.last_name).replace(/"/g,'');
      this.setState({patient_id:user_id,first_name:first_name,last_name:last_name,});
      
      var data = new FormData()
      data.append('id', user_id);
      //console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/countprovider", {
      method: "POST",
      headers: headers,
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              //console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});      
              this.setState({
                loading: false,
                dataProvider: responseJson.data,
              }, function(){
              });
          }else{
            this.setState({dataProvider:"0"});
          }
      }).catch((error) =>{
          console.error(error);
      });

      var data1 = new FormData()
      data1.append('patient_id', user_id);
      console.log(data1);
      fetch("https://allaboardhealth.com/api/authentication/providerdatastatus", {
      method: "POST",
      headers: headers,
      body:  data1
      })
      .then((response1) => response1.json())
      .then((responseJson1) => {
          if(responseJson1.status==200){
            //console.log(responseJson1.data);
            this.setState({mainprovider_id:responseJson1.data[0].mainprovider_id});
            Alert.alert(
              'Link with New Provider',
              responseJson1.data[0].company_name+
              ', would like to link to your account.',
              [
                {
                  text: 'Don’t Approve',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Approve',
                  onPress: () => this.link_provider(this.state.patient_id,this.state.mainprovider_id)
                },
              ],
              {cancelable: false},
            );
          }
      }).catch((error) =>{
          console.error(error);
      });
      
      var data2 = new FormData()
      data2.append('patient_id', user_id);
      fetch("https://allaboardhealth.com/api/authentication/countallopenrequests", {
        method: "POST",
        headers: headers,
        body:  data2
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status==200){
                console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                this.setState({
                  loading: false,
                  total_open_request: responseJson.data,
                  }, function(){
                });
            }else{
              this.setState({total_open_request:"0"});
            }
        }).catch((error) =>{
            console.error(error);
        });

      
      var data3 = new FormData()
      data3.append('patient_id', user_id);
      fetch("https://allaboardhealth.com/api/authentication/countallcloserequests", {
        method: "POST",
        headers: headers,
        body:  data3
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
              this.setState({
                loading: false,
                total_close_request: responseJson.data,
                }, function(){
              });
          }else{
            this.setState({total_close_request:"0"});
          }
      }).catch((error) =>{
          console.error(error);
      });

      var data4 = new FormData()
      data4.append('patient_id', user_id);

      fetch("https://allaboardhealth.com/api/authentication/countchat", {
      method: "POST",
      headers: headers,
      body:  data4
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
              this.setState({
                loading: false,
                unread_chat: responseJson.data.length,
                }, function(){
              });
          }else{
            this.setState({unread_chat:""});
          }
      }).catch((error) =>{
          console.error(error);
      });

      this.myInterval = setInterval(()=>{
      fetch("https://allaboardhealth.com/api/authentication/countchat", {
      method: "POST",
      headers: headers,
      body:  data4
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
              this.setState({
                isLoading: false,
                unread_chat: responseJson.data.length,
                }, function(){
              });
          }else{
            this.setState({unread_chat:""});
          }
      }).catch((error) =>{
          console.error(error);
      })}, 5000);
    }
    
    render() {
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      var {height, width} = Dimensions.get('window');
      const overlayWidth = 40
      return (        
        <View style={styles.container}>
          <View style={styles.first_contanier}>
            <NavigationEvents onDidFocus={() => {this.page_reloaded()}} />
            <StatusBar
              barStyle="light-content"
            />
            <View style={{flexDirection:'row'}}>
              <View style={styles.inside_container}>                  
                <MarqueeText
                  style={styles.user_name}
                  duration={1000}
                  marqueeOnStart
                  loop
                  marqueeDelay={1000}
                  marqueeResetDelay={1000}
                >
                  {JSON.stringify(itemId.first_name).replace(/"/g,'') +' '+JSON.stringify(itemId.last_name).replace(/"/g,'')}
                </MarqueeText>
                  {/* <TextTicker bounce={false}>
                  {JSON.stringify(itemId.first_name).replace(/"/g,'') +' '+JSON.stringify(itemId.last_name).replace(/"/g,'')}
          </TextTicker> */}
              
                  <Text style={styles.connect_provider}
                    onPress={()=>this.connecterpage(itemId.id)}
                  >
                    Connected to {this.state.dataProvider} Providers
                  </Text>
              </View>
              <View style={{top:10}}>
                <View>
                  <TouchableOpacity onPress={()=>this.chat_page()}>
                    <Icon
                      name='envelope'
                      type='font-awesome'
                      color='white'
                      size={60}
                    />                  
                  </TouchableOpacity>
                </View>
                {this.state.unread_chat==0?null:<View style={styles.chat_icon}><Text style={{color:'white',fontSize:width * 0.048,fontWeight:'bold'}}>{this.state.unread_chat}</Text></View>}
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}> 
              <TouchableOpacity onPress={()=>this.request_list(itemId.id)}>
                <View style={{flexDirection:'row',padding:5,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.open_count}>
                      {this.state.total_open_request<10?<Text style={{color:'white',fontWeight:'bold',fontSize:width * 0.048}}>0{this.state.total_open_request}</Text>:<Text style={{color:'white',fontWeight:'bold',fontSize:width * 0.048}}>{this.state.total_open_request}</Text>}
                    </View>
                    <View style={{flexDirection:'column'}}>
                      <Text style={{fontSize:width * 0.05,color:'white',fontWeight:'bold'}}>Open</Text>
                      <Text style={{fontSize:width * 0.05,color:'white',fontWeight:'bold'}}>Requests</Text>
                    </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.close_request_list(itemId.id)}>
                <View style={{flexDirection:'row',padding:5,justifyContent:'center',alignItems:'center'}}>                
                    <View style={styles.close_count}>
                      {this.state.total_close_request<10?<Text style={{color:'white',fontWeight:'bold',fontSize:width * 0.048}}>0{this.state.total_close_request}</Text>:<Text style={{color:'white',fontWeight:'bold',fontSize:width * 0.048}}>{this.state.total_close_request}</Text>}
                    </View>
                    <View style={{flexDirection:'column'}}>
                      <Text style={{fontSize:width * 0.05,color:'white',fontWeight:'bold'}}>Closed</Text>
                      <Text style={{fontSize:width * 0.05,color:'white',fontWeight:'bold'}}>Requests</Text>
                    </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView>
            <View style={{backgroundColor:'white',paddingBottom:20}}>
              <View>
                <View>                  
                  <Card borderRadius={15} containerStyle={styles.container_css}>
                    <TouchableOpacity onPress={()=>{this.appoinment_clicked(itemId.id,this.state.pharmacy)}}>
                      <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                        <View style={{flexDirection:'row',paddingRight:10}}>
                          <Image
                            style={styles.icon_image}
                            source={require('../../uploads/rx.png')}
                          />
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.icon_text}>Pharmacy</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity onPress={()=>{this.appoinment_clicked(itemId.id,this.state.appointment)}}>
                        <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                          <View style={{flexDirection:'row',paddingRight:10}}>
                            <Image
                              style={styles.icon_image}
                              source={require('../../uploads/appointment.png')}
                            />
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.icon_text}>Appointment</Text>
                          </View>                          
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity onPress={()=>{this.appoinment_clicked(itemId.id,this.state.result)}}>
                        <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                          <View style={{flexDirection:'row',paddingRight:10}}>
                            <Image
                              style={styles.icon_image}
                              source={require('../../uploads/blood-test.png')}
                            />
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.icon_text}>Test results</Text>
                          </View>                          
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity onPress={()=>{this.appoinment_clicked(itemId.id,this.state.referral)}}>
                        <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                          <View style={{flexDirection:'row',paddingRight:10}}>
                            <Image
                              style={styles.icon_image}
                              source={require('../../uploads/export.png')}
                            />
                          </View>
                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.icon_text}>Referral</Text>
                          </View>                          
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity>
                        <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                          <View style={{flexDirection:'row',paddingRight:10}}>
                            <Image
                              style={styles.icon_image}
                              source={require('../../uploads/dollar.png')}
                            />
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.icon_text}>Billing</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Card>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity>
                        <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                          <View style={{flexDirection:'row',paddingRight:10}}>
                            <Image
                              style={styles.icon_image}
                              source={require('../../uploads/more_option.png')}
                            />
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.icon_text}>More options</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Card>                                    
                </View>
              </View>
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity style={styles.btn_style}>
              <Text style={styles.btn_style_text}>Sick or Injury Notification</Text>
            </TouchableOpacity>
          </View>          
        </View>
        );
    }
}
var {height, width, fontScale} = Dimensions.get('window');
console.log(width);
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    flexDirection:'column',
  },
  chat_icon:{
    width:width * 0.09,
    height:width * 0.09,
    backgroundColor:'red',
    color:'#fff',
    borderRadius:75,
    position:'absolute',
    right:-12,
    top:-8,
    justifyContent:'center',
    alignItems:'center',
  },
  close_count:{
    width:width * 0.16,
    height:width * 0.16,
    backgroundColor:'#e4012c',
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',
    marginRight:width * 0.03
  },
  open_count:{
    width:width * 0.16,
    height:width * 0.16,
    backgroundColor:'#32e203',
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',
    marginRight:width * 0.03
  },
  first_contanier:{    
    padding:15,
    paddingLeft:'4%',
    backgroundColor:'#0097a7',    
    
  },
  inside_container:{    
    paddingBottom:20,
    paddingRight:10,
    flexDirection:'column',
    width:"81%"
  },
  apointment_container:{
    backgroundColor:'white',
  },
  user_name:{
    fontSize:width * 0.06,
    color:'white',
  },
  connect_provider:{
    fontSize:width * 0.04,
    color:'white',
  },
  btn_style:{
    backgroundColor:'#e71d36',
    width:"100%",
    justifyContent:'center',
    alignItems:'center',    
  },
  btn_style_text:{
    color:'white',
    padding:10,
    fontSize:width * 0.05,
    textAlign:'center',
  },
  icon_text:{    
    color:'#0097a7',
    fontSize:width * 0.056,
    fontWeight:'bold',    
  },
  icon_image:{
    width: 40,
    height: 40,
    tintColor:"#0097a7",
  },
  request_card_view:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  container_css:{    
    borderWidth:2,    
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

  shouldAnimateTresholdContainer: {
    marginBottom: 20,
    height: 20
  }
});