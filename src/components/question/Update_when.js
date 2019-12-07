import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, Dimensions, Image, View, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
import { Card } from 'react-native-elements';
//import firebase from 'firebase';

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },
    first_contanier: {
      padding:10,
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
    icon_image:{
      width: 40,
      height: 40,
      tintColor:"white",
    },
    untick_icon_image:{
      width: 40,
      height: 40,
      tintColor:"#0097a7",
    },
  });  
export default class Update_when extends Component{
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
          value_check1:true,
          value_check2:false,
          value_check3:false,
          value_check4:false,
          value_check5:false,          
          select_value:"As soon as possible",
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
        this.select_when_value = this.select_when_value.bind(this);
    }
    
    onPress = when => this.setState({ when });
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });

    next_click(){
        // let when_value = this.state.when.find(e => e.selected == true);
        // when_value = when_value ? when_value.value : this.state.when[0].label;
        when_value = this.state.select_value;
        console.log(when_value);
        this.props.navigation.navigate('Update_time',{appointment_id:this.state.appoinment_id,when_question:when_value,injured:this.state.injured,reason:this.state.reason,extra:this.state.extra,preferred_time:this.state.preferred_time_value});
    }
    go_back(){
        this.props.navigation.navigate('Request_list');
    }

    select_when_value(id){
      console.log(id);
      if(id==1){
        this.setState({value_check1:true,value_check2:false,value_check3:false,value_check4:false,value_check5:false,select_value:'As soon as possible'});
      }
      if(id==2){
        this.setState({value_check1:false,value_check2:true,value_check3:false,value_check4:false,value_check5:false,select_value:'In next 2 to 3 days'});
      }
      if(id==3){
        this.setState({value_check1:false,value_check2:false,value_check3:true,value_check4:false,value_check5:false,select_value:'In next 4 to 7 days'});
      }
      if(id==4){
        this.setState({value_check1:false,value_check2:false,value_check3:false,value_check4:true,value_check5:false,select_value:'Sometimes in next month'});
      }
      if(id==5){
        this.setState({value_check1:false,value_check2:false,value_check3:false,value_check4:false,value_check5:true,select_value:'Not urgent , just find me an appointment'});
      }
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
      var {height, width} = Dimensions.get('window');
        return (        
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <View>
              <Text style={styles.header}>Update Appointment</Text>
            </View>
            <ScrollView>
              <View style={styles.first_contanier}>
                <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>When?</Text>
                <View>
                <Card borderRadius={15} containerStyle={this.state.value_check1?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=1)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check1?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check1? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>As soon as possible</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check2?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=2)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check2?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check2? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>In next 2 to 3 days</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check3?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=3)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check3?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check3? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:10}: {color:'#0097a7',fontSize:18,paddingLeft:10}}>In next 4 to 7 days</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check4?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=4)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check4?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1}}>
                                <Text style={this.state.value_check4? {color:'white',fontWeight:'bold',fontSize:width*0.05,paddingLeft:10,width:width * 0.55}: {color:'#0097a7',fontSize:width*0.05,paddingLeft:10,width:width * 0.55}}>Sometimes in next month</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                  <Card borderRadius={15} containerStyle={this.state.value_check5?{backgroundColor:'#0098a6',height:80,borderWidth:1,borderColor:'#9c9c9c'}:{backgroundColor:'white',height:80,borderWidth:2,borderColor:'#9c9c9c'}}>
                    <TouchableOpacity onPress={()=>this.select_when_value(id=5)}>
                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',flex:0.2,paddingRight:10}}>
                                {this.state.value_check5?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                            </View>
                            <View style={{justifyContent:'flex-start',flex:1,flexWrap:'wrap'}}>
                                <Text style={this.state.value_check5? {color:'white',fontWeight:'bold',fontSize:width*0.05,paddingLeft:10,width:width * 0.57}: {color:'#0097a7',fontSize:width*0.05,paddingLeft:10,width:width * 0.57}}>Not urgent. Next available appointment </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  </Card>
                </View>
              </View>
            </ScrollView>
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