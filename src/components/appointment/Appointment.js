import React, {Component} from 'react';
import {Picker, StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Text, StatusBar, ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
//import firebase from 'firebase';
import { Card, Icon, Divider} from 'react-native-elements';



export default class Appointment extends Component{
    constructor(props){      
        super(props)
        this.state ={          
          user_id:"",
          dataProvider:"",
          first_name:"",
          last_name:"",
          type:"",
          loading:true,
          IsDate:false
        }
        this.provider_clicked = this.provider_clicked.bind(this);
        this.go_back = this.go_back.bind(this);
    }
    provider_clicked(providerid,user_id,provider_name){
      var data = new FormData()
      data.append('user_id', providerid);      
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
              let location_value = responseJson.data[0].address1+','+responseJson.data[0].address2+','+responseJson.data[0].city+' '+responseJson.data[0].zipcode;
              let location = location_value.split(',');
              console.log(location);
              this.props.navigation.navigate('ProviderSelection',{Json_value:responseJson.data[0].id,location_name:location,provider_id:providerid,patient_id:user_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:provider_name});             
            }else{
              this.props.navigation.navigate('ProviderLocation',{Json_value:providerid,user_id:user_id,firstName:this.state.first_name,lastName:this.state.last_name,provider_name:provider_name,type:this.state.type});
            }
            //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});                
            this.setState({
              isLoading: false,              
              }, function(){    
            });
          }
          if(responseJson==600){              
              alert("No Location found.");
          }
              
      }).catch((error) =>{
          console.error(error);
      });
      //this.props.navigation.navigate('ProviderLocation',{Json_value:providerid,user_id:user_id,firstName:this.state.first_name,lastName:this.state.last_name,provider_name:provider_name,type:this.state.type});
    }
    go_back(){      
      this.props.navigation.navigate('AfterLogin');
    }
    componentDidMount(){        
        const { navigation  } = this.props;
        const itemId = navigation.getParam('Json_value', 'NO-ID');
        const FirstName = navigation.getParam('first_name', 'NO-ID');
        const LastName = navigation.getParam('last_name', 'NO-ID');
        const type = navigation.getParam('type','NO-ID');
        const user_id= JSON.stringify(itemId).replace(/"/g,'');
        this.setState({first_name:FirstName,last_name:LastName,type:type});
        this.setState({user_id:user_id});        
        var data = new FormData()
        data.append('id', user_id);
        //console.log(data);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;            
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        //console.log(auth);
        fetch("https://allaboardhealth.com/api/authentication/provider", {
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
            if(responseJson==600){
              alert("Please connect with provider firsrt.");
              this.setState({loading:false,IsDate:true});
            }
        }).catch((error) =>{
          console.error(error);
        });
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
            <Text style={styles.title}>Step 1 of 8</Text>
            {/* <Text style={styles.header_subtitle}>{this.state.type}</Text> */}
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>          
            <View style={styles.first_contanier}>
              {this.state.IsDate==false?null:<View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:22,color:'#0097a7',marginTop:50}}> No Provider Connected </Text>
              </View>}
              <Text style={{fontSize:20,color:'#0097a7',textAlign:'center',marginTop:10,marginBottom:10}}>Select Clinic</Text>
              <FlatList
                  style={{flex:1}}
                  data={this.state.dataSource}
                  renderItem={({item}) =>
                  <View style={{paddingBottom:10}}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                      <TouchableOpacity onPress={()=>{this.provider_clicked(item.id,this.state.user_id,item.company_name)}}>
                        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                          <Text style={styles.list}>{item.company_name}</Text>                          
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

