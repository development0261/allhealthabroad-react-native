import React, {Component} from 'react';
import {Dimensions, StyleSheet, FlatList, ActivityIndicator, View, ScrollView, Text, StatusBar, TouchableOpacity} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
import {NavigationEvents} from 'react-navigation';
import { Card, Icon, Divider} from 'react-native-elements';
//import firebase from 'firebase';

export default class Location extends Component{
    constructor(props){
        super(props)
        this.state ={
          isLoading: true,
          user_id:"",
          dataProvider:"",
          patient_id:"",
          first_name:"",
          last_name:"",
          provider_name:"",
          type:"",
          loading:true,
          IsDate:false
        }
        this.location_clicked = this.location_clicked.bind(this);
        this.go_back = this.go_back.bind(this);
        
    }

    page_reloaded(){
      const { navigation  } = this.props;
      const counter = navigation.getParam('counter', '');
      const provider_id = navigation.getParam('provider_id', '');
      console.log(provider_id);
      if(counter=="1")
      {        
        var data = new FormData()
        data.append('user_id', provider_id);
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
                console.log("Page reload else");
              }
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});              
            }            
        }).catch((error) =>{
            console.error(error);
        });
      }
    }

    location_clicked(providerid,address1,address2,city,zipcode){
      let location_value = address1+','+address2+','+city+' '+zipcode;
      let location = location_value.split(',');
      
      if(this.state.type=="Appointment"){
        this.props.navigation.navigate('ProviderSelection',{Json_value:providerid,provider_id:this.state.user_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,location_name:location});
      }else if(this.state.type=="Pharmacy"){
        this.props.navigation.navigate('Pharmacy_type',{Json_value:providerid,provider_id:this.state.user_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,location_name:location});
      }else if(this.state.type=="Test Results"){
        this.props.navigation.navigate('Select_Provider_testResult',{Json_value:providerid,provider_id:this.state.user_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,location_name:location});
      }
    }
    go_back(){
      this.props.navigation.navigate('AfterAppointment',{Json_value:this.state.patient_id,first_name:this.state.first_name,last_name:this.state.last_name,type:this.state.type});
    }

    componentDidMount(){
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const patientId = navigation.getParam('user_id', 'NO-ID');
      const first_name = navigation.getParam('firstName');
      const last_name = navigation.getParam('lastName');
      const provider_name=navigation.getParam('provider_name');
      const type = navigation.getParam('type', 'NO-ID');
      console.log(type);
      
      this.setState({first_name:first_name,last_name:last_name,provider_name:provider_name,type:type});
      const provider_id= JSON.stringify(itemId).replace(/"/g,'');
      const patient_id= JSON.stringify(patientId).replace(/"/g,'');
      var data = new FormData()
      data.append('user_id', provider_id);
      this.setState({user_id:provider_id});
      this.setState({patient_id:patient_id});
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
              if(this.state.type=="Appointment"){
                this.props.navigation.navigate('ProviderSelection',{Json_value:providerid,provider_id:this.state.user_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,location_name:location});
              }else if(this.state.type=="Pharmacy"){        
                this.props.navigation.navigate('Pharmacy_type',{Json_value:providerid,provider_id:this.state.user_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,location_name:location});
              }
            }else{
              this.setState({loading:false});
            }
            //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});                
            this.setState({
              isLoading: false,
              dataSource: responseJson.data,
              }, function(){    
            });
          }
          if(responseJson==600){
              this.setState({loading:false,IsDate:true});
              alert("No Location found.");
          }
              
      }).catch((error) =>{
          console.error(error);
      });
    }
    render() {    
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      var {height, width} = Dimensions.get('window');
        return (
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />
          <NavigationEvents onDidFocus={() => {this.page_reloaded()}} />
          <View>            
            <Text style={styles.header_title}>New {this.state.type}</Text>
            <Text style={styles.title}>Step 2 of 8</Text>            
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>
            <View style={styles.first_contanier}>              
              {/* <Text style={styles.title_sub}>{this.state.provider_name}</Text> */}
              {this.state.IsDate==false?null:<View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:22,color:'black',marginTop:50}}> No Location Found </Text>
              </View>}
              <Text style={{textAlign:'center',color:'#0097a7',fontSize:20,marginTop:10}}>Which location for</Text>
              <Text style={{textAlign:'center',color:'#0097a7',fontSize:16,marginBottom:10}}>{this.state.provider_name}</Text>
              <FlatList                  
                  data={this.state.dataSource}
                  renderItem={({item}) =>                      
                  <View style={{paddingBottom:10}}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity onPress={()=>{this.location_clicked(item.id,item.address1,item.address2,item.city,item.zipcode)}}>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',padding:5}}>
                          {item.location_name==""?null:<Text style={{fontWeight:'bold',color:'#0097a7',fontSize:width*0.045,textAlign:'center'}}>{item.location_name}</Text>}
                          <Text style={styles.list}>{item.address1}</Text>
                          {item.address2==""?null:<Text style={styles.list}>{item.address2}</Text>}
                          {item.city==""?null:<Text style={styles.list}>{item.city}, {item.zipcode}</Text>}
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

