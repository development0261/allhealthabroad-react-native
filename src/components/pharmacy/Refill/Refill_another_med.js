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

export default class Refill_another_med extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          provider_id:"",
          sub_provider_id:"",
          location_id:"",
          patient_id:"",          
          text:"",
          when_value:"",
          preferred_time_value:"",
          sick_value:"",
          type:"",
          provider_name:"",
          provider_type:"",
          dialogVisible:false,
          main_provider:"",
          location_name:"",
          value_check1:true,
          value_check2:false,
          value_check3:false,         
          select_value:'No, only one refill medication request.',
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
        this.setState({value_check1:true,value_check2:false,value_check3:false,value_check4:false,value_check5:false,select_value:'No, only one refill medication request.'});
      }
      if(id==2){
        this.setState({value_check1:false,value_check2:true,value_check3:false,value_check4:false,value_check5:false,select_value:'Yes, I have another medication to request a refill on.'});
      }
     
    }
    next_click(){
        // let when_value = this.state.when.find(e => e.selected == true);
        when_value = this.state.select_value;
        // console.log(this.state.sub_provider_id);
        // console.log(this.state.provider_name);
        console.log(when_value);
        //this.props.navigation.navigate('Question_time',{Json_value:this.state.sub_provider_id,provider_id:this.state.user_id,location_id:this.state.location_id,userid:this.state.provider_id,patient_id:this.state.patient_id,type:this.state.type,when:when_value,providerName:this.state.provider_name,providerType:this.state.provider_type,mainProvider:this.state.main_provider,locationName:this.state.location_name});
    }
    go_back(){
        this.props.navigation.navigate('Refill_provider');
    }

    componentDidMount(){
      const { navigation  } = this.props;
      const sub_providerId = navigation.getParam('Json_value', 'NO-ID');
      const locationId = navigation.getParam('location_id', 'NO-ID');
      const providerid = navigation.getParam('userid', 'NO-ID');
      const patientid = navigation.getParam('patient_id', 'NO-ID');
      const type = navigation.getParam('type', 'NO-ID');
      const providername = navigation.getParam('providerName', 'NO-ID');
      const providertype = navigation.getParam('providerType', 'NO-ID');
      const mainProvider = navigation.getParam('mainProvider', 'NO-ID');
      const locationName = navigation.getParam('locationName', 'NO-ID');
        
      this.setState({provider_id:providerid,sub_provider_id:sub_providerId,location_id:locationId,patient_id:patientid,type:type,provider_name:providername,provider_type:providertype,main_provider:mainProvider,location_name:locationName});
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
              <Text style={styles.sub_title}>Step 5 of 8</Text>
            </View>
            <ScrollView>
              <View style={styles.first_contanier}>
                <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Is there another medication refill you would like to request??</Text>
                <View>
                  <Card borderRadius={15} containerStyle={this.state.value_check1?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=1)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check1?<Image style={styles.icon_image} source={require('../../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check1? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>No, only one refill medication request.</Text>
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
                                <Text style={this.state.value_check2? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>Yes, I have another medication to request a refill on.</Text>
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


