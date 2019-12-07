import React, {Component} from 'react';
import {Picker, TextInput, Dimensions, StyleSheet, TouchableWithoutFeedback, Button, ScrollView, View, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import {Keyboard} from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';
import {HideWithKeyboard,ShowWithKeyboard} from 'react-native-hide-with-keyboard';
//import firebase from 'firebase';

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
        fontSize:25,
        color:'black',
        textAlign:'center',
        paddingBottom:20,
    },
    header:{        
        fontSize:20,
        color:'white',
        textAlign:'center',
        padding:15,
        backgroundColor:'#0097a7'
    },
    first_contanier: {
        padding:10,
    },
  });  
export default class Update_extra extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,          
          when_value:"",
          preferred_time:"",
          sick_value:"",
          type:"",
          text:"",
          dialogVisible:false,
        }
        this.next_click = this.next_click.bind(this);
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
    var data = new FormData();
      data.append('appointment_id', this.state.appoinment_id);
      data.append('when_question', this.state.when_value);
      data.append('preferred_time', this.state.preferred_time.toString());
      data.append('injured', this.state.injured.toString());
      data.append('extra', this.state.extra);
      data.append('reason', this.state.reason);      
      console.log(data);
      var headers = new Headers();
      headers.append('Accept','application/json');
      let encode = btoa('admin:12345');
      let auth = 'Basic ' + encode;            
      headers.append("Authorization", auth);
      headers.append("X-API-KEY",'admin@123');      
      fetch("https://allaboardhealth.com/api/authentication/updateOpenrequest", {
      method: "POST",
      headers: headers,                
      body:  data
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.status==200){
              console.log(responseJson);
              this.setState({dialogVisible:false});
              alert("Request as been updated successfully");
              this.props.navigation.navigate('AfterLogin');
              // this.props.navigation.navigate('Request_list',{Json_value:this.state.patient_id});
          }else{
              alert("Something went wrong.");
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
    next_click(){
        this.setState({dialogVisible:true});        
        //this.props.navigation.navigate('Verify',{providerId:this.state.provider_id,sub_providerId:this.state.sub_provider_id,locationId:this.state.location_id,patientId:this.state.patient_id,type:this.state.type,when:this.state.when_value,time:this.state.preferred_time,sick:this.state.sick_value,extra:this.state.text,providerName:this.state.provider_name,providerType:this.state.provider_type,mainProvider:this.state.main_provider,locationName:this.state.location_name});
    }
    go_back(){
        this.props.navigation.navigate('Update_injury');
    }

    componentDidMount(){
        const { navigation  } = this.props;        
        const appoinment_id = navigation.getParam('appointment_id', 'NO-ID');
        const when_question = navigation.getParam('when_question', 'NO-ID');
        const preferred_time = navigation.getParam('preferred_time', 'NO-ID');
        const injured = navigation.getParam('injured', 'NO-ID');
        const reason = navigation.getParam('reason', 'NO-ID');
        const extra = navigation.getParam('extra', 'NO-ID');
            
        this.setState({appoinment_id:appoinment_id,when_value:when_question,preferred_time:preferred_time,injured:injured,reason:reason,extra:extra});
        console.log(appoinment_id);
        console.log(when_question);
        console.log(preferred_time);
        console.log(injured);
        console.log(reason);
        console.log(extra);
    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
      const time=[];
      const sick=[];

      //Displaying prerfere time from the array.
      console.log(this.state.preferred_time);
      for(let i=0;i<this.state.preferred_time.length;i++){
          if(this.state.preferred_time[i]!=""){
              if(i==this.state.preferred_time.length-1){
                  time.push(<Text key={i} style={styles.req_data}>{this.state.preferred_time[i].replace('-',' ')}</Text>);
              }else{
                  time.push(<Text key={i} style={styles.req_data}>{this.state.preferred_time[i].replace('-',' ') + '\n' }</Text>);
              }
          }
      }
      
      console.log(this.state.injured);
        for(let i=0;i<this.state.injured.length;i++){
            if(this.state.injured[i]!=""){
                if(i==this.state.injured.length-1){
                    sick.push(<Text key={i} style={styles.req_data}>{this.state.injured[i].replace(/-/g,' ')}</Text>);
                }else{
                    sick.push(<Text key={i} style={styles.req_data}>{this.state.injured[i].replace(/-/g,' ') + '\n' }</Text>);
                }
            }
        }
        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <Dialog
                visible={this.state.dialogVisible}
                title="Confirm & Update"
                onTouchOutside={() => this.setState({dialogVisible: false})} >
                <View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>When : </Text>
                      <Text>{this.state.when_value}</Text>                    
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10,width:'70%'}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Preferred Time : </Text>
                      <Text>{time}</Text>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Reason : </Text>
                      <Text>{sick}</Text>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10,flexWrap:'wrap'}}>
                      <Text style={{fontWeight: "bold",color:"black"}}>Additional information : </Text>
                      <Text>{this.state.extra}</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row",paddingTop:20}}>
                      <Button color="#5867dd" title="Submit" onPress={this.data_submit}/>                      
                    </View>
                </View>
              </Dialog>
            <View>
                <Text style={styles.header}>update Request</Text>
            </View>
            <ScrollView>
                <View style={styles.first_contanier}>
                    <HideWithKeyboard><Text style={{textAlign:'center',fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10}}>Additional information?</Text></HideWithKeyboard>
                    <ShowWithKeyboard><TouchableOpacity><Text style={{fontSize:28,color:'#0097a7',justifyContent:'center',alignSelf:'flex-end'}}>Post</Text></TouchableOpacity></ShowWithKeyboard>
                    <View style={{marginTop:20,width:'100%'}}>
                        <TextInput
                            style={{borderColor: 'gray', borderWidth: 1,textAlignVertical: "top",borderColor:"#0097a7"}}
                            placeholder="Place write description here"
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(extra) => this.setState({extra})}
                            defaultValue={this.state.extra}
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
                        <Text style={styles.next_btn}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </HideWithKeyboard>
        </View>
        </TouchableWithoutFeedback>        
        );
    }
}