import React, {Component} from 'react';
import {Picker, StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Text, StatusBar, ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
//import firebase from 'firebase';
import { Card, Icon, Divider} from 'react-native-elements';



export default class Pharmacy_type extends Component{
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
          providers_id:"",
          patient_id:"",
          provider_name:"",
          location_name:"",
          location_id:""
        }
        this.go_back = this.go_back.bind(this);
    }
    refill_clicked = () =>{        
        this.props.navigation.navigate('Refill_provider',{Json_value:this.state.location_id,provider_id:this.state.providers_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:'refill'});
    }

    new_clicked = () =>{        
      this.props.navigation.navigate('Select_provider',{Json_value:this.state.location_id,provider_id:this.state.providers_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:'new'});
    }

    status_clicked = () =>{
      this.props.navigation.navigate('Status_select_provider',{Json_value:this.state.location_id,provider_id:this.state.providers_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:'status'});
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
        console.log(FirstName);        
        console.log(location);        
        this.setState({location_id:location_id,providers_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,loading:false});
        
    }
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />
          <View>
            {/* <Text style={styles.name}>{this.state.first_name} {this.state.last_name}</Text> */}
            <Text style={styles.header_title}>New {this.state.type}</Text>
            <Text style={styles.title}>Step 3 of 8</Text>
            {/* <Text style={styles.header_subtitle}>{this.state.type}</Text> */}
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>          
            <View style={styles.first_contanier}>              
              <Text style={{fontSize:20,color:'#0097a7',textAlign:'center',marginTop:10,marginBottom:10}}>What is your pharmacy request?</Text>
                <TouchableOpacity onPress={()=>this.refill_clicked()}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>This is a new refill request.</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.new_clicked()}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}> This is a new prescription request.</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.status_clicked()}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}> I need a status of my refill or prescription request.</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>I am having a problem with a current medication.</Text>
                    </Card>
                </TouchableOpacity>
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
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },  
  first_contanier: {
    padding:10,
  },
  list:{
    marginBottom:15,
    fontSize:18,
    color:'#0097a7',
    textAlign:'center',
    marginTop:15,
  },
  title:{    
    textAlign:'center',    
    color:'#0097a7',
    fontSize:16,
    backgroundColor:'#c1eaee',
    padding:5
  },
  header_title:{
    textAlign:'center',
    fontSize:20,
    color:'white',
    backgroundColor:'#0097a7',
    padding:15,    
  },  
  next_btn:{
    fontSize:20,
    color:'black',
    padding:15,
    textAlign:'center'
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

