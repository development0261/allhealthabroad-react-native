import React, {Component} from 'react';
import {ScrollView, TextInput, Dimensions, StyleSheet, TouchableWithoutFeedback, Button, View, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import {Keyboard} from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';
import {HideWithKeyboard,ShowWithKeyboard} from 'react-native-hide-with-keyboard';
import { Card } from 'react-native-elements';
//import firebase from 'firebase';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },    
    next_btn:{
        fontSize:25,
        color:'black',
        padding:20,
        textAlign:'center'
    },
    title:{
        fontSize:width * 0.05,
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
        fontSize:width * 0.041,
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
        padding:30,
    },
    first_contanier: {
        padding:10,
    },
  });  
export default class Refill_extra extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          provider_id:"",
          subProvider_id:"",
          location_id:"",
          patient_id:"",
          medicine_name:"",
          type:"",
          dialogVisible:false,
          provider_name:"",
          provider_type:"",
          main_provider:"",
          location_name:"",
          pharmacy_request:"",
          first_name:"",
          last_name:"",
          subProviderName:""
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);
    }
    // show_When(){
    //   if(this.state.show_when == true){
    //     this.setState({show_when: false})
    //   }else{
    //     this.setState({show_when: true})
    //     this.setState({show_time: false})
    //     this.setState({show_sick: false})
    //     this.setState({show_extra: false})
    //   }
    // }    
    
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });
    
    next_click(){
        console.log(this.state.provider_type);
        if(this.state.medicine_name==""){
            alert("Please describe medicine name");
        }else{
            this.props.navigation.navigate('Medicine_related',{Json_value:this.state.location_id,mainProvider:this.state.main_provider,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:this.state.pharmacy_request,subProvider_id:this.state.subProvider_id,medicine_name:this.state.medicine_name,subProviderName:this.state.subProviderName});
        }
    }
    go_back(){
        this.props.navigation.navigate('Status_select_provider',{Json_value:this.state.location_id,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:'new'});
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
        
        this.setState({location_id:locationId,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,provider_type:providertype,pharmacy_request:pharmacyRequest,subProviderName:subProviderName});

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
        
    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    <HideWithKeyboard><Text style={{textAlign:'center',fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10}}>What is the name of the  medication you need a status on?</Text></HideWithKeyboard>
                    <ShowWithKeyboard><TouchableOpacity><Text style={{fontSize:28,color:'#0097a7',justifyContent:'center',alignSelf:'flex-end'}}>Post</Text></TouchableOpacity></ShowWithKeyboard>
                    <View style={{marginTop:20,width:'100%'}}>
                        <TextInput
                            style={{borderColor: 'gray', borderWidth: 1,textAlignVertical: "top",borderColor:"#0097a7"}}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(medicine_name) => this.setState({medicine_name})}
                        />
                    </View>
                </View>
            </ScrollView>
            <HideWithKeyboard>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>this.go_back()}>
                        <Text style={styles.next_btn}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=> {this.next_click()}}>
                        <Text style={styles.next_btn}>Next</Text>
                    </TouchableOpacity>
                </View>
            </HideWithKeyboard>
        </View>
        </TouchableWithoutFeedback>        
        );
    }
}