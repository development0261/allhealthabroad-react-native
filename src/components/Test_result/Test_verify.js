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
export default class Test_verify extends Component{    
    constructor(props){      
        super(props)
        this.state ={
            isLoading: true,
            provider_id:"",
            subProvider_id:"",
            location_id:"",
            patient_id:"",
            sympotms:"",
            type:"",
            dialogVisible:false,
            provider_name:"",
            provider_type:"",
            main_provider:"",
            location_name:"",
            pharmacy_request:"",
            first_name:"",
            last_name:"",
            testType:"",
            testWhere:"",
            testTime:"",
            test_additional:""
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
      data.append('test_result_additional_information', this.state.test_additional);
      data.append('patient_id', this.state.patient_id);
      data.append('mainprovider_id', this.state.provider_id);
      data.append('location_id', this.state.location_id);
      data.append('type_of_test_result', this.state.testType);
      data.append('where_test_done', this.state.testWhere);
      data.append('when_test_done', this.state.testTime);
    //   data.append('subprovider_id', this.state.subprovider_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');      
      fetch("https://allaboardhealth.com/api/authentication/testresultsadd", {
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
              data1.append('subprovider_id', this.state.subProvider_id.toString());
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
        this.props.navigation.navigate('Test_additional_info');
    }

    componentDidMount(){
        
        const { navigation  } = this.props;
        const sub_providerId = navigation.getParam('Json_value', 'NO-ID');
        const locationId = navigation.getParam('location_id', 'NO-ID');
        const providerId = navigation.getParam('provider_id', 'NO-ID');
        const patientId = navigation.getParam('patient_id', 'NO-ID');
        const FirstName = navigation.getParam('firstName', 'NO-ID');
        const LastName = navigation.getParam('lastName','NO-ID');
        const type = navigation.getParam('type', 'NO-ID');
        const providername = navigation.getParam('providerName', 'NO-ID');
        const providertype = navigation.getParam('providerType', 'NO-ID');
        const mainProvider = navigation.getParam('mainProvider', 'NO-ID');
        const location = navigation.getParam('locationName', 'NO-ID');
        const testType = navigation.getParam('testType','No-name');
        const testWhere = navigation.getParam('testWhere','No-name');
        const testTime = navigation.getParam('testTime','No-name');
        const test_additional = navigation.getParam('test_additional','No-name');
        
        this.setState({location_id:locationId,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,provider_type:providertype,main_provider:mainProvider,testWhere:testWhere,testType:testType,testTime:testTime,test_additional:test_additional});

        console.log("ProviderID:"+providerId);
        console.log("LocationId:"+locationId);
        console.log("PatientId:"+patientId);
        console.log("FirstName:"+FirstName);
        console.log("Type:"+type);
        console.log("ProviderName:"+providername);
        console.log("locationName:"+location);
        console.log("sub_providerId:"+sub_providerId);
        console.log("providertype:"+providertype);
        console.log("mainProvider:"+mainProvider);
        console.log("testType:"+testType);
        console.log("testWhere:"+testWhere);
        console.log("testTime:"+testTime);
        console.log("test_additional:"+test_additional);

    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      var {height, width} = Dimensions.get('window');
      const items = []
      const location = []
      
        //console.log(this.state.provider_name);
        //Display provider name from the array created.
        if(this.state.provider_name!="First Available Provider"){
            for(let i=0;i<this.state.provider_name.length;i++){            
                // this.setState({request_for:providername[i]+' '+providertype[i]});
                items.push(<Text style={styles.req_data}>{this.state.provider_name[i] +"\n"}</Text>);
            }
        }else{
            items.push(<Text style={styles.req_data}>{this.state.provider_name}</Text>);
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
                        <Text style={styles.req_data}>{this.state.main_provider}</Text>
                        <Text style={styles.req_data}>{location}</Text>
                        <Text> </Text>
                        <Text style={styles.req_data}>{items}</Text>

                        <Text style={styles.req_title}>What type of test are you looking for results?</Text>
                        <Text style={styles.req_data}>{this.state.testType}</Text>

                        <Text style={styles.req_title}>Where did you have the tests done?</Text>
                        <Text style={styles.req_data}>{this.state.testWhere}</Text>

                        <Text style={styles.req_title}>When approximately did you have the tests done?</Text>
                        <Text style={styles.req_data}>{this.state.testTime}</Text>

                        <Text style={styles.req_title}>Additional information:</Text>
                        <Text style={styles.req_data}>{this.state.test_additional}</Text>
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