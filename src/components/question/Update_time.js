import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, FlatList, Image, View, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
import Checkbox from 'react-native-modest-checkbox';
import { Card } from 'react-native-elements';
//import firebase from 'firebase';


export default class Update_time extends Component{
    constructor(props){      
        super(props)
        this.state ={
          isLoading: true,
          text:"",
          when_value:"",
          reason:"",
          extra:"",
          dialogVisible:false,
          value_check1:false,
          value_check2:false,
          value_check3:false,
          value_check4:false,
          value_check5:false,
          time_em:'',
          time_lm:'',
          time_ea:'',
          time_la:'',
          time_evening:'',          
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);
        this.change_check_earlymorning = this.change_check_earlymorning.bind(this);
        this.change_check_latemorning = this.change_check_latemorning.bind(this);
        this.change_check_earlyafternoon = this.change_check_earlyafternoon.bind(this);
        this.change_check_lateafternoon = this.change_check_lateafternoon.bind(this);
        this.change_check_evening = this.change_check_evening.bind(this);

    }
    change_check_earlymorning(){
        if(this.state.value_check1==false){
            this.setState({value_check1:true,time_em:'Early-Morning'});
        }else{
            this.setState({value_check1:false,time_em:''});
        }
    }
    change_check_latemorning(){
        if(this.state.value_check2==false){
            this.setState({value_check2:true,time_lm:'Late-Morning'});
        }else{
            this.setState({value_check2:false,time_lm:''});
        }
    }
    change_check_earlyafternoon(){
        if(this.state.value_check3==false){
            this.setState({value_check3:true,time_ea:'Early-Afternoon'});
        }else{
            this.setState({value_check3:false,time_ea:''});
        }
    }
    change_check_lateafternoon(){
        if(this.state.value_check4==false){
            this.setState({value_check4:true,time_la:'Late-Afternoon'});
        }else{
            this.setState({value_check4:false,time_la:''});
        }
    }
    change_check_evening(){
        if(this.state.value_check5==false){
            this.setState({value_check5:true,time_evening:'Evening'});
        }else{
            this.setState({value_check5:false,time_evening:''});
        }
    }
    //onPress = when => this.setState({ when });
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });

    next_click(){        
        let time=this.state.time_em+' '+this.state.time_lm+' '+this.state.time_ea+' '+this.state.time_la+' '+this.state.time_evening;
        let temp_var=time.replace(/  +/g, ' ');
        let temp_time=temp_var.trim()
        let temp=temp_time.split(' ');
        console.log(temp);
        
        //alert(time);
        if(temp_time.length<1){
            alert("Hello!  You must make at least one selection on this page. Thank you.");
        }else{
            this.props.navigation.navigate('Update_injury',{appointment_id:this.state.appoinment_id,when_question:this.state.when_value,injured:this.state.injured,reason:this.state.reason,extra:this.state.extra,preferred_time:temp});
        }
    }
    go_back(){
        this.props.navigation.navigate('Update_when');        
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
            <View>
              <Text style={styles.header}>Update Appointment</Text>
            </View>
            <ScrollView>
                <View style={styles.first_contanier}>
                <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Time?</Text>
                    <View>
                        <Card borderRadius={15} containerStyle={this.state.value_check1?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_earlymorning()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check1?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check1? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Early morning</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check2?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_latemorning()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check2?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check2? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Late morning</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check3?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_earlyafternoon()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check3?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check3? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Early afternoon</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check4?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_lateafternoon()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check4?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check4? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Late afternoon</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check5?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_evening()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check5?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check5? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Evening</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>                    
                        <Text style={{marginTop:30,fontWeight:'bold',color:'grey',fontSize:16,textAlign:'center'}}>(Select one or more)</Text>
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
    first_contanier: {
        padding:10,
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

