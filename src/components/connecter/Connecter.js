import React, {Component} from 'react';
import {Picker, TouchableOpacity, StyleSheet, ScrollView, View, FlatList, Text, StatusBar, Switch,ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { Card } from 'react-native-elements';
import { ConfirmDialog } from 'react-native-simple-dialogs';



export default class Home extends Component{
    constructor(props){      
        super(props)
        this.state ={
          loading: true,
          user_id:"",
          dataSource:"",
          firstName:"",
          lastName:"",
          dataProvider:"",
          unconnected:"",
          dialogVisible:false,
          provider_id:"",
          company:""
        }
        this.open_request = this.open_request.bind(this);
        this.go_back = this.go_back.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.unlink_provider = this.unlink_provider.bind(this);
    }
    valueChange(providerid,company_name){
      this.setState({dialogVisible:true,provider_id:providerid,company:company_name});
    }
    unlink_provider(){
      var data = new FormData()
      data.append('patient_id',this.state.user_id);
      data.append('mainprovider_id',this.state.provider_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/unlinkProvider", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status==200){
          console.log(responseJson.data);
          this.setState({dialogVisible:false});
          this.props.navigation.navigate('AfterLogin',{patient_id:this.state.user_id});
        }else{
          alert("Something went wrong");
        }
      }).catch((error) =>{
          console.error(error);
      });
    }
    formatDate(date) {
      var t = date.split(/[- :]/);
      // Apply each element to the Date function
      var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
      var actiondate = new Date(d);
      var d = new Date(date);
      var hh = actiondate.getHours();
      var m = actiondate.getMinutes();
      var s = actiondate.getSeconds();
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
        h = hh - 12;
        dd = "PM";
      }
      if (h == 0) {
        h = 12;
      }
      m = m < 10 ? "0" + m : m;    
      s = s < 10 ? "0" + s : s;
    
      /* if you want 2 digit hours:
      h = h<10?"0"+h:h; */
    
      var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
    
      var replacement = h + ":" + m;
      /* if you want to add seconds
      replacement += ":"+s;  */
      replacement += " " + dd;
    
      return date.replace(pattern, replacement);
    }
    open_request(provider_id){      
      console.log(provider_id);
      console.log(this.state.user_id);
      this.props.navigation.navigate('Open_request',{providerID:provider_id,patientID:this.state.user_id});
    }
    close_request(provider_id){      
      console.log(provider_id);
      console.log(this.state.user_id);
      this.props.navigation.navigate('Close_request',{providerID:provider_id,patientID:this.state.user_id});
    }
    go_back(){      
      this.props.navigation.navigate('AfterLogin',{patient_id:this.state.user_id});
    }
    componentDidMount(){        
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const first_name = navigation.getParam('first_name', 'NO-ID');
      const last_name = navigation.getParam('last_name', 'NO-ID');
      const user_id= JSON.stringify(itemId).replace(/"/g,'');
      
      this.setState({user_id:user_id,firstName:first_name,lastName:last_name});
      var data = new FormData()
      data.append('id', user_id);
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');
      //console.log(auth);
      fetch("https://allaboardhealth.com/api/authentication/providerconndata", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});      
              this.setState({
                loading: false,
                dataSource: responseJson.data,
              }, function(){    
              });         
          }          
      }).catch((error) =>{
          console.error(error);
      });

      var data2 = new FormData()
      data2.append('id', user_id);     
      fetch("https://allaboardhealth.com/api/authentication/countprovider", {
      method: "POST",
      headers: headers,                
      body:  data2
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              //console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});      
              this.setState({
                loading: false,
                dataProvider: responseJson.data,
              }, function(){    
              });         
          }else{
            this.setState({dataProvider:"0"});
          }          
      }).catch((error) =>{
          console.error(error);
      });
      var data3 = new FormData()
      data3.append('id', user_id);     
      fetch("https://allaboardhealth.com/api/authentication/countunconnectedprovider", {
      method: "POST",
      headers: headers,
      body:  data3
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              //console.log(responseJson.data);
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});      
              this.setState({
                isLoading: false,
                unconnected: responseJson.data,
              }, function(){    
              });         
          }else{
            this.setState({unconnected:"0"});
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
          <ConfirmDialog
            title="Unlink Provider"
            message="Are you sure to unlink this provider?"
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.setState({dialogVisible: false})}
            positiveButton={{
                title: "Yes, Sure",
                onPress: () => {this.unlink_provider()}
            }}
            negativeButton={{
                title: "NO",
                onPress: () => this.setState({dialogVisible:false})
            }}
          />
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <View style={styles.inside_container}>
            <Text style={styles.user_name}>{this.state.firstName} {this.state.lastName}</Text>            
            <TouchableOpacity style={styles.connected_btn}>
              <Text style={styles.cnt_conn}>{this.state.dataProvider} connected providers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unconnected_btn}>
              <Text style={styles.cnt_conn}>{this.state.unconnected} unconnected providers</Text>
            </TouchableOpacity>            
          </View>
          <ScrollView>
            <View style={styles.first_contanier}>
                {/* <Text style={styles.hometext}>Welcome to the AAH</Text> */}
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.movie_list}
                  data={this.state.dataSource}
                  renderItem={({item}) =><View>
                      <Card borderRadius={10}>
                          <Text style={styles.company}>
                            {item.company_name}
                          </Text>
                          <View style={{flexDirection:"row",paddingBottom:10}}>
                            <Text>
                              Requests :
                            </Text>
                            <Text onPress={()=>{this.open_request(item.userid)}}>
                                {' '+ item.countopenreq} Open / 
                            </Text>
                            <Text style={styles.paragraph} onPress={()=>{this.close_request(item.userid)}}>
                                {' '+item.countclosereq} Closed
                            </Text>
                          </View>
                          <View style={{flexDirection:"row",paddingBottom:10}}>
                            <Text style={styles.paragraph}>
                              Connected since  {this.formatDate(item.created_at)}
                            </Text>
                          </View>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            {item.status == "1" ? <Switch onValueChange={()=>this.valueChange(item.userid,item.company_name)} value={true} style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }} /> : <Switch value={false} style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }} />}
                          </View>
                      </Card>
                  </View>}
                  keyExtractor={({userid}, index) => userid}
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
    backgroundColor:'#0097a7',
  },
  first_contanier: {      
    padding:5,
    paddingBottom:10
  },
  user_name:{
    fontSize:20,
    color:'black',
    textAlign:'center'
  }, 
  user_name:{
    fontSize:28,
    color:'black'
  },
  user_name_provider:{
    fontSize:15,
    color:'black'
  },
  inside_container:{
    backgroundColor:'white',
    padding:15,
    justifyContent:'center',
    alignItems:'center',
  },

  cnt_conn:{
    fontSize:15,
    color:'black',
    textAlign:'center'
  },
  connected_btn:{
    marginTop:8,
    padding:10,
    backgroundColor:'#d4e09b',
    width:'100%',
    borderRadius:5
  },
  unconnected_btn:{
    marginTop:3,
    padding:10,
    backgroundColor:'#fed766',
    width:'100%',
    borderRadius:5
  },
  company:{
    fontSize:18,
    fontWeight:'bold',
    color:'black',
    marginBottom:15
  },
  next_btn:{
    fontSize:20,
    color:'black',
    padding:15,
    textAlign:'center'
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

