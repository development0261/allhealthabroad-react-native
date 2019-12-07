import React, {Component} from 'react';
import {Picker, Dimensions, ScrollView, StyleSheet, TouchableWithoutFeedback, FlatList, View, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
//import firebase from 'firebase';

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#0097a7'
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
        marginTop:25,
    },
    header:{        
        fontSize:20,
        color:'white',
        textAlign:'center',
        padding:15,        
    },
    provider:{
        fontSize:25,
        color:'black',
        textAlign:'center',
        paddingBottom:15,
    },
    req_title:{
        fontSize:16,
        color:'#0097a7',
        marginTop:30,
        fontWeight:'bold',        
    },
    req_data:{
        fontSize:15,
        color:'grey',
        fontWeight:'bold',
        width:'85%'
    },
    container_css:{    
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        height:'90%',
        padding:40,
    },
    sub_title:{    
        textAlign:'center',    
        color:'#0097a7',
        fontSize:16,
        backgroundColor:'#c1eaee',
        padding:5
      },
  });  
export default class Status_verify extends Component{    
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          provider_id:"",
          subProvider_id:"",
          location_id:"",
          patient_id:"",          
          status_extra:"",
          extra_value:"",
          provider_name:"",
          provider_type:"",
          main_provider:"",
          location_name:"",
          request_for:[],
          first_available:"",
          pharmacyRequest:"",
          first_name:"",
          last_name:"",
          medicine_related:"",
          under_supply_text:"",
          medicine_name:"",
          subProviderName:"",
          under_supply:""
        }
        
        this.go_back = this.go_back.bind(this);
        this.data_submit = this.data_submit.bind(this);
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
    data_submit(){
        // console.log(this.state.sub_provider_id);
        // console.log(this.state.provider_name);
        // console.log(this.state.provider_type);
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      let location_value = this.state.location_name.toString();
      let location = location_value.replace(/,/g,' ');
      console.log(location);
      var data = new FormData();
      data.append('new_additional_information', this.state.status_extra);
      data.append('patient_id', this.state.patient_id);
      data.append('mainprovider_id', this.state.provider_id);
      data.append('location_id', this.state.location_id);
      data.append('medication_status_name', this.state.medicine_name);
      data.append('all_that_apply', this.state.medicine_related.toString());
      data.append('status_under_three_days_supply', this.state.under_supply);
      
      
    //   data.append('subprovider_id', this.state.subprovider_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');      
      fetch("https://allaboardhealth.com/api/authentication/pharmacystatusadd", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson);
              var data1 = new FormData();
              data1.append('appointment_id', responseJson.data);
              data1.append('patient_id', this.state.patient_id);
              data1.append('subprovider_id', this.state.subProvider_id);
              console.log(data1);
            fetch("https://allaboardhealth.com/api/authentication/subproviderRequest", {
                method: "POST",
                headers: headers,
                body:  data1
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson){
                    console.log(responseJson);                    
                    alert("Your request was delivered on "+date +"/"+ month+"/"+year+" "+hours+":"+min+":"+sec+" The office will now contact you");
                    this.props.navigation.navigate('AfterLogin',{patient_id:this.state.patient_id});
                    // this.props.navigation.navigate('Request_list',{Json_value:this.state.patient_id});
                }
                if(responseJson.status==601){
                    alert("Something went wrong");
                }
                
            }).catch((error) =>{
                console.error(error);
            });
            //alert("Your request was delivered on "+date +"/"+ month+"/"+year+" "+hours+":"+min+":"+sec+" The office will now contact you");
              //this.props.navigation.navigate('AfterLogin',{patient_id:this.state.patient_id});
              // this.props.navigation.navigate('Request_list',{Json_value:this.state.patient_id});
          }
          if(responseJson.status==601){
              alert("Something went wrong");
          }
          this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          }, function(){    
          });   
      }).catch((error) =>{
          console.error(error);
      });
    }   
    go_back(){
        this.props.navigation.navigate('Status_extra');
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
        const subProviderName = navigation.getParam('subProviderName','No-name');
        const location = navigation.getParam('locationName','No-name');
        const pharmacyRequest = navigation.getParam('pharmacy_request','No-name');
        const medicine_name = navigation.getParam('medicine_name','No-name');
        const medicine_related = navigation.getParam('medicine_related','No-name');
        const status_extra = navigation.getParam('status_extra','No-name');
        const under_supply = navigation.getParam('under_supply','No-name');
        

        if(under_supply==0){
            this.setState({under_supply_text:'Yes, I have less than a three day supply'});
        }else if(under_supply==1){
            this.setState({under_supply_text:'Yes, I am out complety'});
        }else{
            this.setState({under_supply_text:'No, I have more than a three day supply'});
        }

        this.setState({location_id:location_id,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,pharmacy_request:pharmacyRequest,medicine_name:medicine_name,medicine_related:medicine_related,subProviderName:subProviderName,status_extra:status_extra,under_supply:under_supply});

        console.log("ProviderID:"+providerId);
        console.log("LocationId:"+location_id);
        console.log("PatientId:"+patientId);
        console.log("ProviderId:"+FirstName);
        console.log("Type:"+type);
        console.log("ProviderName:"+providername);
        console.log("subProviderName:"+subProviderName);
        console.log("locationName:"+location);
        console.log("sub_providerId:"+sub_providerId);
        console.log("pharmacyRequest:"+pharmacyRequest);
        console.log("Medicine:"+medicine_name);
        console.log("medicine_related:"+medicine_related);
        console.log("status_extra:"+status_extra);
        console.log("under_supply:"+under_supply);
    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      var {height, width} = Dimensions.get('window');
      const medicine_related = []
      const location = []
      
        //console.log(this.state.provider_name);
        //Display provider name from the array created.
        if(this.state.medicine_related!="First Available Provider"){
            for(let i=0;i<this.state.medicine_related.length;i++){            
                // this.setState({request_for:providername[i]+' '+providertype[i]});
                medicine_related.push(<Text style={styles.req_data}>{this.state.medicine_related[i] +"\n"}</Text>);
            }
        }else{
            medicine_related.push(<Text style={styles.req_data}>{this.state.medicine_related}</Text>);
        }

        //Displaying Location from the array.
        console.log(this.state.location_name);
        for(let i=0;i<this.state.location_name.length;i++){
            if(this.state.location_name[i]!=""){
                if(i==this.state.location_name.length-1){
                    location.push(<Text key={i} style={styles.req_data}>{this.state.location_name[i].replace('-',' ')}</Text>);
                }else{
                    location.push(<Text key={i} style={styles.req_data}>{this.state.location_name[i].replace('-',' ') + '\n' }</Text>);
                }
            }
        }

        return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            
            <Text style={styles.header}>New {this.state.type}</Text>
            <Text style={styles.sub_title}>Final step!</Text>
            <View style={{backgroundColor:'white',flex:1}}>
                <View style={{padding:30,paddingRight:0,paddingTop:0,paddingBottom:10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Confirmation</Text>
                        <Text> </Text>
                        <Text style={styles.req_data}>{this.state.provider_name}</Text>
                        <Text style={styles.req_data}>{location}</Text>
                        <Text> </Text>
                        <Text style={styles.req_data}>{this.state.subProviderName}</Text>
                        
                        <Text style={styles.req_title}>What is the name of the  medication you need a status on?</Text>
                        <Text style={styles.req_data}>{this.state.medicine_name}</Text>         

                        <Text style={styles.req_title}>Please select all that apply</Text>
                        <Text style={styles.req_data}>{medicine_related}</Text>                        

                        <Text style={styles.req_title}>Are you under three days supply of this medication?</Text>
                        <Text style={styles.req_data}>{this.state.under_supply_text}</Text>

                        <Text style={styles.req_title}>Additional information:</Text>
                        <Text style={styles.req_data}>{this.state.status_extra}</Text>
                    </ScrollView>
                </View>
            </View>
            
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>this.go_back()}>
                    <Text style={styles.next_btn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=> {this.data_submit()}}>
                    <Text style={styles.next_btn}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>             
        );
    }
}