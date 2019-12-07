import React, {Component} from 'react';
import {Picker, StyleSheet, FlatList, Image, View, Dimensions , Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
//import firebase from 'firebase';

export default class Open_request extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          user_id:"",
          provider_id:"",
          width:"",
        }       
      this.formatDate = this.formatDate.bind(this);
    }
    formatDate(date) {
      var d = new Date(date);
      var hh = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
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
    componentDidMount(){
        const { navigation  } = this.props;
        const itemId = navigation.getParam('patientID', 'NO-ID');
        const providerId = navigation.getParam('providerID', 'NO-ID');        
        const user_id= JSON.stringify(itemId).replace(/"/g,'');
        
        var data = new FormData();
        data.append('user_id', providerId);
        data.append('patient_id', user_id);
        //console.log(user_id);
        var headers = new Headers();
        headers.append('Accept','application/json');
        let encode = btoa('admin:12345');
        let auth = 'Basic ' + encode;            
        headers.append("Authorization", auth);
        headers.append("X-API-KEY",'admin@123');
        //console.log(auth);
        fetch("https://allaboardhealth.com/api/authentication/allopenrequests", {
        method: "POST",
        headers: headers,                
        body:  data
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson){
                console.log(responseJson.data);
                //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
            }
            if(responseJson==600){
                alert("No Record found.");
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
    render() {      
      const { navigation  } = this.props;
      var {height, width} = Dimensions.get('window');
      console.log(width);
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content"
          />                
          <FlatList
              horizontal={true}
              pagingEnabled={true}
              data={this.state.dataSource}              
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) =><View style={styles.dynamic_list_view}>
                  <Card title={item.company_name} containerStyle={{marginLeft:width*0.12}}>
                    <ScrollView>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Status </Text>
                        <Text> : {item.request_status=="1" ? <Text style={{fontWeight: "bold",color:"red"}}>Open</Text> : null}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Requested Time </Text>
                        <Text> : {this.formatDate(item.created_at)}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Viewed </Text>
                        <Text> : {item.viewed_at}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Office </Text>
                        <Text> : {item.company_name}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>When </Text>
                        <Text style={{width:0,flexGrow:1,flex:1}}> : {item.when_question}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Preferred Time </Text>
                        <Text style={{width:0,flexGrow:1,flex:1}}> : {item.preferred_time}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Injured </Text>
                        <Text> : {item.injured}</Text>
                      </View>
                      <View style={{flexDirection:"row",paddingBottom:10}}>
                        <Text style={{fontWeight: "bold",color:"black"}}>Extra :</Text>
                        <Text style={{width:0,flexGrow:1,flex:1}}> {item.extra}</Text>
                      </View>
                    </ScrollView>
                  </Card>
              </View>}
            keyExtractor={({id}, index) => id}
          />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,    
  },
  dynamic_list_view:{    
    paddingRight:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:20,    
  },
});