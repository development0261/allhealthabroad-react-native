import React, {Component} from 'react';
import {ActivityIndicator,Image ,StyleSheet, FlatList, Dimensions, View, ScrollView, Text, StatusBar, TouchableOpacity} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import { Card, Icon, Divider} from 'react-native-elements';
import Checkbox from 'react-native-modest-checkbox';

export default class Medicine_related extends Component{  
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          provider_id:"",
          subProvider_id:"",
          location_id:"",
          patient_id:"",
          medicine_name:"",
          type:"",
          provider_name:"",
          provider_type:"",
          main_provider:"",
          location_name:"",
          first_name:"",
          last_name:"",

          pharmacyRequest:"",
          medicine_related:[],
          subProviderName:"",
        }
        this.go_back = this.go_back.bind(this);
    }

    next_click = () => {
        console.log(this.state.medicine_related.length);
        if(this.state.medicine_related.length <= 0){
            alert("Hello!  You must make at least one selection on this page. Thank you.");
        }else{           
            console.log(this.state.medicine_related);
            this.props.navigation.navigate('Medicine_supply',{Json_value:this.state.location_id,providerName:this.state.subprovider_name,providerType:this.state.providerType,provider_id:this.state.provider_id,patient_id:this.state.patient_id,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:this.state.pharmacy_request,firstName:this.state.first_name,lastName:this.state.last_name,medicine_related:this.state.medicine_related,subProviderName:this.state.subProviderName,subProvider_id:this.state.subProvider_id,medicine_name:this.state.medicine_name});
        }
    }    
    
    go_back(){
        this.props.navigation.navigate('Medicine_name');
    }

    provider_selected = (name) => {
        let tmp = this.state.medicine_related;
        let tempname = this.state.subprovider_name;
        let temptype = this.state.providerType;
  
        if ( tmp.includes( name ) ) {
          tmp.splice( tmp.indexOf(name), 1 );
        } else {
          tmp.push( name );
        }
        // var providername= name +' '+ lastname + ' '+ type
        // if ( tempname.includes( providername ) ) {
        //   tempname.splice( tempname.indexOf(providername), 1 );
        // } else {
        //   tempname.push( providername );          
        // }
  
        // if ( temptype.includes( type ) ) {
        //   temptype.splice( temptype.indexOf(type), 1 );
        // } else {
        //   temptype.push( type );
        // }
        console.log(tmp);
        this.setState({
            medicine_related: tmp,
        //   subprovider_name : tempname,
        //   providerType:temptype,
          
        });
        
        this.componentDidMount();
    }
    componentDidMount(){
        const { navigation  } = this.props;
        const sub_providerId = navigation.getParam('subProvider_id', 'NO-ID');
        const locationId = navigation.getParam('Json_value', 'NO-ID');
        const providerId = navigation.getParam('provider_id', 'NO-ID');
        const patientId = navigation.getParam('patient_id', 'NO-ID');
        const FirstName = navigation.getParam('firstName', 'NO-ID');
        const LastName = navigation.getParam('lastName','NO-ID');
        const type = navigation.getParam('type', 'NO-ID');
        const providername = navigation.getParam('providerName', 'NO-ID');
        const subProviderName = navigation.getParam('subProviderName', 'NO-ID');
        
        const providertype = navigation.getParam('providerType', 'NO-ID');
        const location = navigation.getParam('locationName', 'NO-ID');
        const pharmacyRequest = navigation.getParam('pharmacy_request','No-name');
        const medicine_name = navigation.getParam('medicine_name','No-name');
        
        this.setState({location_id:locationId,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,provider_type:providertype,pharmacy_request:pharmacyRequest,subProviderName:subProviderName,medicine_name:medicine_name});

        console.log("ProviderID:"+providerId);
        console.log("LocationId:"+locationId);
        console.log("PatientId:"+patientId);
        console.log("FirstName:"+FirstName);
        console.log("Type:"+type);
        console.log("ProviderName:"+providername);
        console.log("subProviderName:"+subProviderName);
        console.log("locationName:"+location);
        console.log("sub_providerId:"+sub_providerId);
        console.log("pharmacyRequest:"+pharmacyRequest);
        console.log("medicine_name:"+medicine_name);
       
        //console.log(this.state.medicine_related);
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
            <Text style={styles.title}>Step 6 of 8</Text>
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>
            <View style={styles.first_contanier}>
            <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Please select all that apply.</Text>
                <TouchableOpacity onPress={()=>this.provider_selected('Pharmacy has no record of prescription')}>
                    <Card borderRadius={15} containerStyle={this.state.medicine_related.includes('Pharmacy has no record of prescription')?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                                {this.state.medicine_related.includes('Pharmacy has no record of prescription')?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.medicine_related.includes('Pharmacy has no record of prescription') ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>Pharmacy has no record of prescription.</Text>                          
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.provider_selected('Pre-authorization or other problem')}>
                    <Card borderRadius={15} containerStyle={this.state.medicine_related.includes('Pre-authorization or other problem')?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                                {this.state.medicine_related.includes('Pre-authorization or other problem')?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.medicine_related.includes('Pre-authorization or other problem') ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>Pre-authorization or other problem.</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.provider_selected('Need generic or alternative medication')}>
                    <Card borderRadius={15} containerStyle={this.state.medicine_related.includes('Need generic or alternative medication')?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                                {this.state.medicine_related.includes('Need generic or alternative medication')?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.medicine_related.includes('Need generic or alternative medication') ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>Need generic or alternative medication.</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.provider_selected('Pharmacy requires provider to call them')}>
                    <Card borderRadius={15} containerStyle={this.state.medicine_related.includes('Pharmacy requires provider to call them')?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                                {this.state.medicine_related.includes('Pharmacy requires provider to call them')?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.medicine_related.includes('Pharmacy requires provider to call them') ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>Pharmacy requires provider to call them.</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.provider_selected('Other problem, please contact me')}>
                    <Card borderRadius={15} containerStyle={this.state.medicine_related.includes('Other problem, please contact me')?{backgroundColor:'#0098a6',borderWidth:2,borderColor:'#9c9c9c'}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c'}}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',padding:5}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.25,paddingRight:10}}>
                                {this.state.medicine_related.includes('Other problem, please contact me')?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.medicine_related.includes('Other problem, please contact me') ? {color:'white',fontWeight:'bold',fontSize:16,paddingLeft:20}: {color:'#0097a7',fontSize:16,paddingLeft:20}}>Other problem, please contact me.</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
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