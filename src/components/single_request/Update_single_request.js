import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, FlatList, Image, View, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
//import firebase from 'firebase';

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#d4e09b'
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
        fontSize:25,
        color:'black',
        textAlign:'center',
        paddingTop:15,
        paddingBottom:15,
    }
  });  
export default class Question_when extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          appoinment_id:"",
          reason:"",
          extra:"",
          when_value:"",
          preferred_time_value:"",
          injured:"",
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
          ]
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);        
    }
    
    onPress = when => this.setState({ when });
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });

    next_click(){
        let when_value = this.state.when.find(e => e.selected == true);
        when_value = when_value ? when_value.value : this.state.when[0].label;        
        this.props.navigation.navigate('Question_time',{Json_value:this.state.sub_provider_id,provider_id:this.state.user_id,location_id:this.state.location_id,userid:this.state.provider_id,patient_id:this.state.patient_id,type:this.state.type,when:when_value,providerName:this.state.provider_name,providerType:this.state.provider_type,mainProvider:this.state.main_provider,locationName:this.state.location_name});
    }
    go_back(){
        this.props.navigation.navigate('Request_list');
    }

    componentDidMount(){
      const { navigation  } = this.props;
      const appoinment_id = navigation.getParam('appointment_id', 'NO-ID');
      const when_question = navigation.getParam('when_question', 'NO-ID');
      const preferred_time = navigation.getParam('preferred_time', 'NO-ID');
      const injured = navigation.getParam('injured', 'NO-ID');
      const reason = navigation.getParam('reason', 'NO-ID');
      const extra = navigation.getParam('extra', 'NO-ID');
        
      this.setState({appoinment_id:appoinment_id,when_value:when_question,preferred_time_value:preferred_time,injured:injured,reason:reason,extra:extra});
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
        return (        
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <Text style={styles.header}>Appointment Request</Text>
            <View style={{backgroundColor:'#0097a7',padding:25,flex:1}}>
                <View style={{backgroundColor:'white',padding:25,height:'95%',borderRadius:10}}>
                    <Text style={styles.title}>When?</Text>                    
                    <Text style={styles.title}>Select one.</Text>
                    <RadioGroup radioButtons={this.state.when} onPress={this.onPress}/>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>this.go_back()}>
                    <Text style={styles.next_btn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=> {this.next_click()}}>
                    <Text style={styles.next_btn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>        
        );
    }
}


