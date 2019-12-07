import React, {Component} from 'react';
import {ActivityIndicator,Image ,StyleSheet, FlatList, Dimensions, View, ScrollView, Text, StatusBar, TouchableOpacity} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, Icon, Divider} from 'react-native-elements';
import Checkbox from 'react-native-modest-checkbox';

export default class Select_Provider_testResult extends Component{  
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          firstName:"",
          lastName:"",
          type:"",
          loading:true,
          IsDate:false,
          provider_id:"",
          patient_id:"",
          provider_name:"",
          location_name:"",
          location_id:"",
          pharmacyRequest:"",
          checkboxChecked:[],
          subprovider_name:[],
          providerType:[],
        }
        this.go_back = this.go_back.bind(this);
    }

    next_click = () => {
        console.log(this.state.checkboxChecked.length);
        if(this.state.checkboxChecked.length <= 0){
            alert("Hello!  You must make at least one selection on this page. Thank you.");
        }else{           
            console.log(this.state.checkboxChecked);
            this.props.navigation.navigate('Test_type',{Json_value:this.state.checkboxChecked,providerName:this.state.subprovider_name,providerType:this.state.providerType,location_id:this.state.location_id,userid:this.state.provider_id,patient_id:this.state.patient_id,type:this.state.type,mainProvider:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:this.state.pharmacyRequest,firstName:this.state.firstName,lastName:this.state.lastName});
        }
    }    
    
    go_back(){      
        var data = new FormData()      
        console.log(this.state.provider_id);
        data.append('user_id', this.state.provider_id);
        console.log(data);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;            
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        //console.log(auth);
        fetch("https://allaboardhealth.com/api/authentication/providerlocation", {
        method: "POST",
        headers: headers,                
        body:  data
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
            if(responseJson.status==200){
              if(responseJson.data.length==1){
                this.props.navigation.navigate('AfterAppointment');
                this.setState({loading:false});
              }else{
                this.props.navigation.navigate('ProviderLocation');
              }
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});              
            }            
        }).catch((error) =>{
            console.error(error);
        });
      }

    provider_selected = (id,name,lastname,type) => {
        let tmp = this.state.checkboxChecked;
        let tempname = this.state.subprovider_name;
        let temptype = this.state.providerType;
  
        if ( tmp.includes( id ) ) {
          tmp.splice( tmp.indexOf(id), 1 );
        } else {
          tmp.push( id );
        }
        var providername= name +' '+ lastname + ' '+ type
        if ( tempname.includes( providername ) ) {
          tempname.splice( tempname.indexOf(providername), 1 );
        } else {
          tempname.push( providername );          
        }
  
        if ( temptype.includes( type ) ) {
          temptype.splice( temptype.indexOf(type), 1 );
        } else {
          temptype.push( type );
        }
        
        this.setState({
          checkboxChecked: tmp,
          subprovider_name : tempname,
          providerType:temptype,
          
        });
        
        this.componentDidMount();
    }
    componentDidMount(){
        const { navigation  } = this.props;
        const itemId = navigation.getParam('Json_value', 'NO-ID');
        const providerId = navigation.getParam('provider_id', 'NO-ID');
        const patientId = navigation.getParam('patient_id', 'NO-ID');
        const location_id = JSON.stringify(itemId).replace(/"/g,'');
        const FirstName = navigation.getParam('firstName', 'NO-ID');
        const LastName = navigation.getParam('lastName','NO-ID');
        const type = navigation.getParam('type','NO-ID');
        const providername = navigation.getParam('providerName','No-Name');
        const location = navigation.getParam('location_name','No-name');
        
        this.setState({location_id:location_id,provider_id:providerId,patient_id:patientId,firstName:FirstName,lastName:LastName,type:type,provider_name:providername,location_name:location});
        var data = new FormData();
        data.append('user_id', providerId);
        data.append('location_id', location_id);
        data.append('request_type',type);
        console.log(data);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;            
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        //console.log(auth);
        fetch("https://allaboardhealth.com/api/authentication/providerdetails", {
        method: "POST",
        headers: headers,
        body:  data
        })
        .then((response) => response.json())
        .then((responseJson) => {          
            if(responseJson.status==200){
              //console.log(responseJson);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
              this.setState({
                isLoading: false,
                dataSource: responseJson.data,
                loading:false,
                }, function(){    
              });
            }
            else if(responseJson==600){                
                this.setState({loading:false,IsDate:true});
            }else{
              alert("Something went wrong");
            }
        }).catch((error) =>{
            console.error(error);
        });
        //console.log(this.state.checkboxChecked);
    }
  render() {  
    var {height, width} = Dimensions.get('window');
    return (          
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />
          <View>            
            <Text style={styles.header_title}>New {this.state.type}</Text>
            <Text style={styles.title}>Step 3 of 8</Text>
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>
            <View style={styles.first_contanier}>              
              {/* <Text style={styles.title_sub}>{this.state.provider_name}</Text> */}
              {this.state.IsDate==false?null:<View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:22,color:'#0097a7',marginTop:50}}> No Doctor Found </Text>
              </View>}
              <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Which Provider ordered the test?</Text>
              <FlatList
                style={styles.movie_list}
                data={this.state.dataSource}
                renderItem={({item}) =>
                <View style={{paddingBottom:0}}>
                  <TouchableOpacity onPress={()=>this.provider_selected(item.id,item.first_name,item.last_name,item.type_name)}>
                    <Card borderRadius={15} containerStyle={this.state.checkboxChecked.includes(item.id)?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                      <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                          {this.state.checkboxChecked.includes(item.id)?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                        </View>
                        <View style={{justifyContent:'flex-start',flex:1}}>
                          <Text style={this.state.checkboxChecked.includes(item.id) ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>{item.first_name} {item.last_name} {item.type_name}</Text>
                          {item.sp1==null && item.sp2==null?<Text style={this.state.checkboxChecked.includes(item.id)?{color:'white',fontSize:14,paddingLeft:20}:{color:'grey',fontSize:14,paddingLeft:20}}></Text>:null}
                          {item.sp1==null && item.sp2!=null?<Text style={this.state.checkboxChecked.includes(item.id)?{color:'white',fontSize:14,paddingLeft:20}:{color:'grey',fontSize:14,paddingLeft:20}}>{item.sp2}</Text>:null}
                          {item.sp1!=null && item.sp2==null?<Text style={this.state.checkboxChecked.includes(item.id)?{color:'white',fontSize:14,paddingLeft:20}:{color:'grey',fontSize:14,paddingLeft:20}}>{item.sp1}</Text>:null}
                          {item.sp1!=null && item.sp2!=null?<View><Text style={this.state.checkboxChecked.includes(item.id)?{color:'white',fontSize:14,paddingLeft:20}:{color:'grey',fontSize:14,paddingLeft:20}}>{item.sp1}</Text><Text style={this.state.checkboxChecked.includes(item.id)?{color:'white',fontSize:14,paddingLeft:20}:{color:'grey',fontSize:14,paddingLeft:20}}>{item.sp2}</Text></View>:null}
                        </View>
                      </View>
                    </Card>
                    </TouchableOpacity>
                </View>
                  }                    
                keyExtractor={({id}, index) => id}
              />
            </View>
          </ScrollView>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>this.go_back()}>
              <Text style={styles.next_btn}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=> {this.next_click()}}>
                <Text style={styles.next_btn}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },  
    first_contanier: {
      padding:10,    
    },
    list:{
      marginBottom:5,
      fontSize:18,
      color:'#0097a7',
      marginTop:15,
      textAlign:"center",    
    },
    title:{    
      textAlign:'center',    
      color:'#0097a7',
      fontSize:16,
      backgroundColor:'#c1eaee',
      padding:5
    },
    title_sub:{    
      textAlign:'center',
      paddingBottom:20,
      color:'#0097a7',
      fontSize:20,
      fontWeight:'bold'
    },  
    header_title:{
      textAlign:'center',
      fontSize:20,
      color:'white',
      backgroundColor:'#0097a7',
      padding:15,    
    },
    spec_list:{
      color:'black',    
      paddingLeft:40
    },
    next_btn:{
      fontSize:20,
      color:'black',
      padding:15,
      textAlign:'center'
    },
    container_css:{    
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,    
      height:120,
    },
    icon_image:{
      width: 45,
      height: 45,
      tintColor:"white",
    },
    untick_icon_image:{
      width: 45,
      height: 45,
      tintColor:"#0097a7",
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