import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, FlatList, Image, View, ActivityIndicator, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
//import firebase from 'firebase';

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:10,
      marginBottom:15,
    },
    txt_btn:{
        borderBottomWidth:1,
        borderTopWidth:1,
        marginBottom:10,
        
    },
    btn: {      
        backgroundColor:'lightgrey',
        marginBottom:10,        
    },
  });
  var radio_props = [
    {label: 'param1', value: 0 },
    {label: 'param2', value: 1 }
  ];
export default class Question extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          provider_id:"",
          sub_provider_id:"",
          location_id:"",
          patient_id:"",
          show_when:false,
          show_time:false,
          show_sick:false,
          show_extra:false,
          text:"",
          when_value:"",
          preferred_time_value:"",
          sick_value:"",
          type:"",
          dialogVisible:false,
          when: [
            {
              label: 'As soon as possible',
              value: 'As soon as possible',
            },
            {
              label: 'In next 2 to 3 days',
              value: "In next 2 to 3 days",
            },
            {
              label: 'In next 4 to 7 days',
              value: 'In next 4 to 7 days',              
            },
            {              
              label: 'Sometimes in next month',
              value: 'Sometimes in next month',
            },
            {
              label: 'Not urgent , just find me an open appointment',
              value: 'Not urgent , just find me an open appointment',              
            },
          ],
          preferred_time: [
            {
              label: 'Early Morning(8AM - 10AM)',
              value: 'Early Morning(8AM - 10AM)',
            },
            {
              label: 'Late Morning(10AM - Noon)',
              value: "Late Morning(10AM - Noon)",
            },
            {
              label: 'Early Afternoon(1PM - 3PM)',
              value: 'Early Afternoon(1PM - 3PM)',              
            },
            {              
              label: 'Late Afternoon(3PM - 5PM)',
              value: 'Late Afternoon(3PM - 5PM)',
            },            
          ],
          sick: [
            {
              label: 'Yes',
              value: 'Yes',
            },
            {
              label: 'No',
              value: "No",
            },                        
          ],
        }
      this.show_When = this.show_When.bind(this);
      this.show_Time = this.show_Time.bind(this);
      this.show_Sick = this.show_Sick.bind(this);
      this.show_Extra = this.show_Extra.bind(this);
      this.Form_submit = this.Form_submit.bind(this);
      this.data_submit = this.data_submit.bind(this);
    }
    show_When(){
      if(this.state.show_when == true){
        this.setState({show_when: false})
      }else{
        this.setState({show_when: true})
        this.setState({show_time: false})
        this.setState({show_sick: false})
        this.setState({show_extra: false})
      }
    }
    show_Time(){
      if(this.state.show_time == true){
        this.setState({show_time: false})
      }else{
        this.setState({show_when: false})
        this.setState({show_time: true})
        this.setState({show_sick: false})
        this.setState({show_extra: false})
      }
    }
    show_Sick(){
      if(this.state.show_sick == true){
        this.setState({show_sick: false})
      }else{
        this.setState({show_when: false})
        this.setState({show_time: false})
        this.setState({show_sick: true})
        this.setState({show_extra: false})
      }
    }
    show_Extra(){
      if(this.state.show_extra == true){
        this.setState({show_extra: false})
      }else{
        this.setState({show_when: false})
        this.setState({show_time: false})
        this.setState({show_sick: false})
        this.setState({show_extra: true})
      }
    }
    onPress = when => this.setState({ when });
    onPress_time = preferred_time => this.setState({ preferred_time });
    onPress_sick = sick => this.setState({ sick });

    Form_submit(){
      let when_value = this.state.when.find(e => e.selected == true);
      when_value = when_value ? when_value.value : this.state.when[0].label;

      let preferred_time_value = this.state.preferred_time.find(e => e.selected == true);
      preferred_time_value = preferred_time_value ? preferred_time_value.value : this.state.preferred_time[0].label;

      let sick_value = this.state.sick.find(e => e.selected == true);
      sick_value = sick_value ? sick_value.value : this.state.sick[0].label;
      
      this.setState({when_value:when_value});
      this.setState({preferred_time_value:preferred_time_value});
      this.setState({sick_value:sick_value});
      this.setState({dialogVisible:true});      
    }

    data_submit(){
      var data = new FormData();
      data.append('when_question', this.state.when_value);
      data.append('preferred_time', this.state.preferred_time_value);
      data.append('injured', this.state.sick_value);
      data.append('extra', this.state.text);
      data.append('reason', this.state.type);      
      data.append('patient_id', this.state.patient_id);
      data.append('mainprovider_id', this.state.provider_id);
      data.append('location_id', this.state.location_id);
      data.append('subprovider_id', this.state.sub_provider_id);
      //console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');      
      fetch("https://allaboardhealth.com/api/authentication/appontimentreqadd", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson);
              this.setState({dialogVisible:false})
              alert("Request as been opened");
              //this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
              // this.props.navigation.navigate('Request_list',{Json_value:this.state.patient_id});
          }
          if(responseJson.status==601){
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

    componentDidMount(){
        const { navigation  } = this.props;
        const sub_providerId = navigation.getParam('Json_value', 'NO-ID');
        const locationId = navigation.getParam('provider_id', 'NO-ID');
        const providerid = navigation.getParam('userid', 'NO-ID');
        const patientid = navigation.getParam('patient_id', 'NO-ID');
        const type = navigation.getParam('type', 'NO-ID');                
        this.setState({provider_id:providerid,sub_provider_id:sub_providerId,location_id:locationId,patient_id:patientid,type:type})
        
    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (
        <ScrollView >
          <View style={styles.container}>            
              <StatusBar 
                    barStyle="light-content"
              />
              <Dialog
                visible={this.state.dialogVisible}
                title="Confirm & Submit"
                onTouchOutside={() => this.setState({dialogVisible: false})} >
                <View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>When </Text>
                      <Text> :  {this.state.when_value}</Text>                    
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Preferred Time </Text>
                      <Text> : {this.state.preferred_time_value}</Text>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Are you sick or injured </Text>
                      <Text> : {this.state.sick_value}</Text>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Anything else </Text>
                      <Text> : {this.state.text}</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row",paddingTop:20}}>
                      <Button color="#5867dd" title="Submit" onPress={this.data_submit}/>                      
                    </View>
                </View>
              </Dialog>
              <View style={styles.btn}>
                  <Button color="transparent" title="When ?" onPress={this.show_When}/>
              </View>
              { this.state.show_when ? 
              <View>
                  <RadioGroup radioButtons={this.state.when} onPress={this.onPress} />
              </View> : null
              }
              <View style={styles.btn}>
                  <Button color="transparent" title="Preferred Time ?" onPress={this.show_Time}/>
              </View>
              { this.state.show_time ? 
              <View>
                  <RadioGroup radioButtons={this.state.preferred_time} onPress={this.onPress_time} />
              </View> : null
              }
              <View style={styles.btn}>
                  <Button color="transparent" title="Are you sick or injured right now ?" onPress={this.show_Sick}/>
              </View>
              { this.state.show_sick ?
              <View>
                  <RadioGroup radioButtons={this.state.sick} onPress={this.onPress_sick} />
              </View> : null
              }
              <View style={styles.btn}>
                  <Button color="transparent" title="Anything else we should know ?" onPress={this.show_Extra}/>
              </View>
              { this.state.show_extra ?
              <View>
                  <TextInput
                    style={{height: 50, borderColor: 'gray', borderWidth: 1,margin:15}}
                    placeholder="Place write description here"
                    onChangeText={(text) => this.setState({text})}
                  />
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Button color="#5867dd" title="Submit" onPress={this.Form_submit}/>
                  </View>              
              </View> : null
              }
          </View>
        </ScrollView>
        );
    }
}


