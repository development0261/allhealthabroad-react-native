import React, {Component} from 'react';  
import {ActivityIndicator,Image ,StyleSheet, FlatList, Dimensions, View, ScrollView, Text, StatusBar, TouchableOpacity} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, Icon, Divider} from 'react-native-elements'; 
import {NavigationEvents} from 'react-navigation';

export default class Status_select_provider extends Component{  
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          first_name:"",
          last_name:"",
          type:"",
          loading:true,
          IsDate:false,
          provider_id:"",
          patient_id:"",
          provider_name:"",
          location_name:"",
          location_id:"",
          pharmacy_request:""
        }
        this.go_back = this.go_back.bind(this);
    }
    provider_selected = (id,name,lastname,type) =>{
        var providername= name +' '+ lastname + ' '+ type;
        this.props.navigation.navigate('Medicine_name',{Json_value:this.state.location_id,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,subProvider_id:id,pharmacy_request:this.state.pharmacy_request,subProviderName:providername});
    }
    go_back(){
        this.props.navigation.navigate('Pharmacy_type');
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
        const location = navigation.getParam('locationName','No-name');
        const pharmacyRequest = navigation.getParam('pharmacy_request','No-name');
        
        this.setState({location_id:location_id,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,pharmacy_request:pharmacyRequest});

        console.log("ProviderID:"+providerId);
        console.log("LocationId:"+location_id);
        console.log("PatientId:"+patientId);
        console.log("ProviderId:"+FirstName);
        console.log("Type:"+type);
        console.log("ProviderName:"+providername);
        console.log("locationName:"+location);

        var data = new FormData();
        data.append('user_id', providerId);
        data.append('location_id', location_id);
        data.append('request_type', type);
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
              console.log(responseJson);
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
          <Text style={styles.title}>Step 4 of 8</Text>            
        </View>
        {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
            <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
        </View>}
        <ScrollView>
          <View style={styles.first_contanier}>              
            {/* <Text style={styles.title_sub}>{this.state.provider_name}</Text> */}
            {this.state.IsDate==false?null:<View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:22,color:'black',marginTop:50}}> No Provider Found </Text>
            </View>}
            <Text style={{textAlign:'center',color:'#0097a7',fontSize:20,marginTop:10}}>Which Provider wrote your orginal prescription?</Text>
            <FlatList                  
                data={this.state.dataSource}
                renderItem={({item}) =>                      
                <View style={{paddingBottom:10}}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                    <TouchableOpacity onPress={()=>this.provider_selected(item.id,item.first_name,item.last_name,item.type_name)}>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',padding:5}}>
                        <Text style={{color:'#0097a7',fontWeight:'bold',fontSize:16,paddingLeft:20}}>{item.first_name} {item.last_name} {item.type_name}</Text>
                        {item.sp1==null && item.sp2==null?<Text style={{color:'#0097a7',fontSize:14,paddingLeft:20}}></Text>:null}
                        {item.sp1==null && item.sp2!=null?<Text style={{color:'#0097a7',fontSize:14,paddingLeft:20}}>{item.sp2}</Text>:null}
                        {item.sp1!=null && item.sp2==null?<Text style={{color:'#0097a7',fontSize:14,paddingLeft:20}}>{item.sp1}</Text>:null}
                        {item.sp1!=null && item.sp2!=null?<View><Text style={{color:'#0097a7',fontSize:14,paddingLeft:20}}>{item.sp1}</Text><Text style={{color:'#0097a7',fontSize:14,paddingLeft:20}}>{item.sp2}</Text></View>:null}
                        </View>
                    </TouchableOpacity>
                    </Card>
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
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'white',
},  
first_contanier: {      
  padding:10,
},
next_btn:{
  fontSize:20,
  color:'black',
  padding:15,
  textAlign:'center'
},
list:{
  fontSize:width * 0.045,
  color:'grey',
  textAlign:"center",
  fontWeight:'400'
},
list_title:{
  fontSize:15,
  color:'#0097a7',    
  textAlign:"center"
},
title:{    
  textAlign:'center',    
  color:'#0097a7',
  fontSize:16,
  backgroundColor:'#c1eaee',
  padding:5,    
},
title_sub:{
  paddingBottom:5,
  textAlign:'center',    
  color:'#0097a7',
  fontSize:16,
  backgroundColor:'#c1eaee',
},
header_title:{
  textAlign:'center',
  fontSize:20,
  color:'white',
  backgroundColor:'#0097a7',
  padding:15,
},
container_css:{    
  borderWidth:2,
  borderColor:'#9c9c9c'
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