import React, {Component} from 'react';
import {Picker, TextInput, ScrollView, StyleSheet, FlatList, Image, View, TouchableOpacity, Text, StatusBar, Button} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
import RadioGroup from 'react-native-radio-buttons-group';
import Checkbox from 'react-native-modest-checkbox';
import { Card } from 'react-native-elements';
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
          value_check1:false,
          value_check2:false,
          value_check3:false,
          value_check4:false,
          value_check5:false,
          value_check6:false,
          sick_visit:'',
          chronic_visit:'',
          annual_phsical:'',
          result_review:'',
          refill_visit:'',
          other:'',          
        //   sick: [
        //     {
        //       label: 'Yes',
        //       value: 'Yes',
        //     },
        //     {
        //       label: 'No',
        //       value: "No",
        //     },
        //   ],
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);
        this.change_check_sick_visit= this.change_check_sick_visit.bind(this);
        this.change_check_chronic_visit = this.change_check_chronic_visit.bind(this);
        this.change_check_annual_phsical = this.change_check_annual_phsical.bind(this);
        this.change_check_result_review = this.change_check_result_review.bind(this);
        this.change_check_refill_visit = this.change_check_refill_visit.bind(this);
        this.change_check_other = this.change_check_other.bind(this);
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
    //onPress_sick = sick => this.setState({ sick });
    // onPress_time = preferred_time => this.setState({ preferred_time });
    // onPress_sick = sick => this.setState({ sick });

    next_click(){
        // let sick_value = this.state.sick.find(e => e.selected == true);
        // sick_value = sick_value ? sick_value.value : this.state.sick[0].label;
        let value=this.state.sick_visit+' '+this.state.chronic_visit+' '+this.state.annual_phsical+' '+this.state.result_review+' '+this.state.refill_visit+' '+this.state.other;
        let sick_val=value.replace(/  +/g, ' ');
        let sick_temp=sick_val.trim();
        let sick_value=sick_temp.split(' ');
        console.log(sick_value);
        if(sick_temp.length<1){
            alert("Hello!  You must make at least one selection on this page. Thank you.");
        }else{        
            this.props.navigation.navigate('Update_extra',{appointment_id:this.state.appoinment_id,when_question:this.state.when_value,injured:sick_value,reason:this.state.reason,extra:this.state.extra,preferred_time:this.state.preferred_time_value});
        }
    }
    go_back(){
        this.props.navigation.navigate('Update_time');
    }

    change_check_sick_visit(){
        if(this.state.value_check1==false){
            this.setState({value_check1:true,sick_visit:'Sick-Visit'});
        }else{
            this.setState({value_check1:false,sick_visit:''});
        }
    }
    
    change_check_chronic_visit(){
        if(this.state.value_check2==false){
            this.setState({value_check2:true,chronic_visit:'Chronic-Problem-Visit'});
        }else{
            this.setState({value_check2:false,chronic_visit:''});
        }
    }

    change_check_annual_phsical(){
        if(this.state.value_check3==false){
            this.setState({value_check3:true,annual_phsical:'Annual-Physical'});
        }else{
            this.setState({value_check3:false,annual_phsical:''});
        }
    }
    
    change_check_result_review(){
        if(this.state.value_check4==false){
            this.setState({value_check4:true,result_review:'Results-Review'});
        }else{
            this.setState({value_check4:false,result_review:''});
        }
    }

    change_check_refill_visit(){
        if(this.state.value_check5==false){
            this.setState({value_check5:true,refill_visit:'Pharmacy-Refill'});
        }else{
            this.setState({value_check5:false,refill_visit:''});
        }
    }

    change_check_other(){
        if(this.state.value_check6==false){
            this.setState({value_check6:true,other:'Other'});
        }else{
            this.setState({value_check6:false,other:''});
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
        return (        
        <View style={styles.container}>
            
            <StatusBar 
                barStyle="light-content"
            />
            <View>
                <Text style={styles.header}>Update Request</Text>
            </View>
            <ScrollView>
                <View style={styles.first_contanier}>
                    <Text style={{fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10,textAlign:'center'}}>Reason?</Text>
                    {/* <RadioGroup radioButtons={this.state.sick} onPress={this.onPress_sick}/> */}
                    <View>                    
                        <Card borderRadius={15} containerStyle={this.state.value_check1?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_sick_visit()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check1?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check1? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Sick visit</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check2?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_chronic_visit()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check2?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check2? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Chronic Problem Visit</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check3?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_annual_phsical()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check3?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check3? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Annual Physical</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check4?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_result_review()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check4?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check4? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Results Review</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check5?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_refill_visit()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check5?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check5? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Pharmacy Refill</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card borderRadius={15} containerStyle={this.state.value_check6?{backgroundColor:'#0098a6',borderWidth:1,borderColor:'#9c9c9c',height:75}:{backgroundColor:'white',borderWidth:2,borderColor:'#9c9c9c',height:75}}>
                            <TouchableOpacity onPress={()=>this.change_check_other()}>
                                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',flex:1,paddingRight:10}}>
                                        {this.state.value_check6?<Image style={styles.icon_image} source={require('../../uploads/tick.png')} />:<Image style={styles.untick_icon_image} source={require('../../uploads/untick.png')} />}
                                    </View>
                                    <View style={{justifyContent:'flex-start',flex:2}}>
                                        <Text style={this.state.value_check6? {color:'white',fontWeight:'bold',fontSize:18,paddingLeft:20}: {color:'#0097a7',fontSize:18,paddingLeft:20}}>Other</Text>
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


