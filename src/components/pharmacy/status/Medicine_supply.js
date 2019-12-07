import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, Dimensions, Image, View, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
import { Card } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },    
    next_btn:{
        fontSize:25,
        color:'black',
        padding:20,
        textAlign:'center'
    },
    title:{
        fontSize:25,
        color:'#0097a7',
        textAlign:'center',
        paddingBottom:20,
        fontWeight:'bold'
    },
    header:{        
        fontSize:20,
        color:'white',
        textAlign:'center',
        padding:15,
        backgroundColor:'#0097a7' 
    },
    sub_title:{    
      textAlign:'center',    
      color:'#0097a7',
      fontSize:16,
      backgroundColor:'#c1eaee',
      padding:5
    },
    container_css:{    
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,
      height:'90%',
      padding:50,
    },
    first_contanier: {      
      padding:10,      
    },
    icon_image:{
      width: 40,
      height: 40,
      tintColor:"white",
    },
    untick_icon_image:{
      width: 40,
      height: 40,
      tintColor:"#0097a7",
    },
  });  

export default class Refill_supply extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          provider_id:"",
          subProvider_id:"",
          location_id:"",
          patient_id:"",          
          text:"",
          medication_name:"",
          type:"",
          provider_name:"",
          provider_type:"",
          dialogVisible:false,
          main_provider:"",
          location_name:"",
          value_check1:true,
          value_check2:false,
          value_check3:false,         
          select_value:0,
          subProviderName:"",
          medicine_related:""
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);
        this.select_when_value = this.select_when_value.bind(this);
    }
    
    onPress = when => this.setState({ when });
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });
    select_when_value(id){
      console.log(id);
      if(id==1){
        this.setState({value_check1:true,value_check2:false,value_check3:false,select_value:0});
      }
      if(id==2){
        this.setState({value_check1:false,value_check2:true,value_check3:false,select_value:1});
      }
      if(id==3){
        this.setState({value_check1:false,value_check2:false,value_check3:true,select_value:2});
      }
    }
    next_click(){
        // let when_value = this.state.when.find(e => e.selected == true);
        when_value = this.state.select_value;
        console.log(when_value);
        this.props.navigation.navigate('Status_extra',{Json_value:this.state.location_id,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:this.state.pharmacy_request,subProvider_id:this.state.subProvider_id,medicine_name:this.state.medicine_name,subProviderName:this.state.subProviderName,medicine_related:this.state.medicine_related,under_supply:when_value});
    }
    go_back(){
        this.props.navigation.navigate('Medicine_related');
    }

    componentDidMount(){
      const { navigation  } = this.props;
      const sub_providerId = navigation.getParam('subProvider_id', 'NO-ID');
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const providerId = navigation.getParam('provider_id', 'NO-ID');
      const patientId = navigation.getParam('patient_id', 'NO-ID');
      const location_id = JSON.stringify(itemId).replace(/"/g,'');
      const FirstName = navigation.getParam('firstName', 'NO-ID');
      const LastName = navigation.getParam('lastName','NO-ID');
      const type = navigation.getParam('type','NO-ID');
      const providername = navigation.getParam('providerName','No-Name');
      const subProviderName = navigation.getParam('subProviderName','No-Name');      
      const location = navigation.getParam('locationName','No-name');
      const pharmacyRequest = navigation.getParam('pharmacy_request','No-name');
      const medicine_name = navigation.getParam('medicine_name','No-name');
      const medicine_related = navigation.getParam('medicine_related','No-name');
      this.setState({location_id:location_id,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,pharmacy_request:pharmacyRequest,medicine_name:medicine_name,subProviderName:subProviderName,medicine_related:medicine_related});

      console.log("ProviderID:"+providerId);
      console.log("LocationId:"+location_id);
      console.log("PatientId:"+patientId);
      console.log("Type:"+type);
      console.log("ProviderName:"+providername);
      console.log("subProviderName:"+subProviderName);
      console.log("locationName:"+location);
      console.log("sub_providerId:"+sub_providerId);
      console.log("pharmacyRequest:"+pharmacyRequest);
      console.log("Medicine:"+medicine_name);
      console.log("medicine_related:"+medicine_related);

      
      //this.setState({provider_id:providerid,sub_provider_id:sub_providerId,location_id:locationId,patient_id:patientid,type:type,provider_name:providername,provider_type:providertype,main_provider:mainProvider,location_name:locationName});
    }
    
    render() {      
      const { navigation  } = this.props;
      var {height, width} = Dimensions.get('window');
        return (        
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <View>
              <Text style={styles.header}>New Pharmacy</Text>
              <Text style={styles.sub_title}>Step 6 of 8</Text>
            </View>
            <ScrollView>
              <View style={styles.first_contanier}>
                <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Are you under three days supply of this medication?</Text>
                <View>
                  <Card borderRadius={15} containerStyle={this.state.value_check1?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=1)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check1?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check1? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>Yes, I have less than a three day supply</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check2?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=2)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check2?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check2? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>Yes, I am out complety.</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check3?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=3)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check3?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check3? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>No, I have more than a three day supply</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>                  
                </View>
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


