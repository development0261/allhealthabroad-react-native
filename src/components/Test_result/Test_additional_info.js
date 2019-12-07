import React, {Component} from 'react';
import {ScrollView, TextInput, Dimensions, StyleSheet, TouchableWithoutFeedback, Button, View, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView} from 'react-native';
import {Keyboard} from 'react-native';
import {HideWithKeyboard,ShowWithKeyboard} from 'react-native-hide-with-keyboard';

//import firebase from 'firebase';
const {height, width} = Dimensions.get('window');
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
        fontSize:width * 0.05,
        color:'#0097a7',
        textAlign:'center',
        paddingBottom:20,
        fontWeight:'bold'
    },
    header:{        
        fontSize:20,
        color:'white',
        textAlign:'center',
        padding:15,
        backgroundColor:'#0097a7'
    },
    sub_title:{    
        textAlign:'center',    
        color:'#0097a7',
        fontSize:width * 0.041,
        backgroundColor:'#c1eaee',
        padding:5
    },
    container_css:{    
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        height:'90%',
        padding:30,
    },
    first_contanier: {
        padding:10,
    },
  });  
export default class Test_additional_info extends Component{
    constructor(props){      
        super(props)
        this.state ={
            isLoading: true,
            provider_id:"",
            subProvider_id:"",
            location_id:"",
            patient_id:"",
            sympotms:"",
            type:"",
            dialogVisible:false,
            provider_name:"",
            provider_type:"",
            main_provider:"",
            location_name:"",
            pharmacy_request:"",
            first_name:"",
            last_name:"",
            testType:"",
            testWhere:"",
            testTime:"",
            test_additional:"",
        }
        this.next_click = this.next_click.bind(this);
        this.go_back = this.go_back.bind(this);
    }   
    
    next_click(){
        //this.setState({dialogVisible:true});
        // console.log(this.state.sub_provider_id);
        // console.log(this.state.provider_name);
         console.log(this.state.location_id);
         this.props.navigation.navigate('Test_verify',{Json_value:this.state.subProvider_id,location_id:this.state.location_id,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,mainProvider:this.state.main_provider,locationName:this.state.location_name,providerType:this.state.provider_type,type:this.state.type,testType:this.state.testType,testWhere:this.state.testWhere,testTime:this.state.testTime,test_additional:this.state.test_additional});
    }
    go_back(){
        this.props.navigation.navigate('Test_time');
    }

    componentDidMount(){
        const { navigation  } = this.props;
        const sub_providerId = navigation.getParam('Json_value', 'NO-ID');
        const locationId = navigation.getParam('location_id', 'NO-ID');
        const providerId = navigation.getParam('provider_id', 'NO-ID');
        const patientId = navigation.getParam('patient_id', 'NO-ID');
        const FirstName = navigation.getParam('firstName', 'NO-ID');
        const LastName = navigation.getParam('lastName','NO-ID');
        const type = navigation.getParam('type', 'NO-ID');
        const providername = navigation.getParam('providerName', 'NO-ID');
        const providertype = navigation.getParam('providerType', 'NO-ID');
        const mainProvider = navigation.getParam('mainProvider', 'NO-ID');
        const location = navigation.getParam('locationName', 'NO-ID');
        const testType = navigation.getParam('testType','No-name');
        const testWhere = navigation.getParam('testWhere','No-name');
        const testTime = navigation.getParam('testTime','No-name');
        
        this.setState({location_id:locationId,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,provider_type:providertype,main_provider:mainProvider,testWhere:testWhere,testType:testType,testTime:testTime});

        console.log("ProviderID:"+providerId);
        console.log("LocationId:"+locationId);
        console.log("PatientId:"+patientId);
        console.log("FirstName:"+FirstName);
        console.log("Type:"+type);
        console.log("ProviderName:"+providername);
        console.log("locationName:"+location);
        console.log("sub_providerId:"+sub_providerId);
        console.log("providertype:"+providertype);
        console.log("mainProvider:"+mainProvider);
        console.log("testType:"+testType);
        console.log("testWhere:"+testWhere);
        console.log("testTime:"+testTime);
        
    }
    render() {      
      const { navigation  } = this.props;
      const itemId = navigation.getParam('Json_value', 'NO-ID');
        return (        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <View>
                <Text style={styles.header}>New Pharmacy</Text>
                <Text style={styles.sub_title}>Step 7 of 8</Text>
            </View>
            <ScrollView>
                <View style={styles.first_contanier}>
                    <HideWithKeyboard><Text style={{textAlign:'center',fontSize:20,color:'#0097a7',marginTop:10,marginBottom:10}}>Additional information?</Text></HideWithKeyboard>
                    <ShowWithKeyboard><TouchableOpacity><Text style={{fontSize:28,color:'#0097a7',justifyContent:'center',alignSelf:'flex-end'}}>Post</Text></TouchableOpacity></ShowWithKeyboard>
                    <View style={{marginTop:20,width:'100%'}}>
                        <TextInput
                            style={{borderColor: 'gray', borderWidth: 1,textAlignVertical: "top",borderColor:"#0097a7"}}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(test_additional) => this.setState({test_additional})}
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