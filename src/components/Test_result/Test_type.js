import React, {Component} from 'react';
import {Picker, StyleSheet, FlatList, ScrollView, View, TouchableOpacity, Text, StatusBar, ActivityIndicator} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64'
//import firebase from 'firebase';
import { Card, Icon, Divider} from 'react-native-elements';



export default class Test_type extends Component{
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
            last_name:""
        }
        this.go_back = this.go_back.bind(this);
    }
    // new_clicked = () =>{        
    //   this.props.navigation.navigate('Select_provider',{Json_value:this.state.location_id,provider_id:this.state.providers_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,locationName:this.state.location_name,pharmacy_request:'new'});
    // }

    type_clicked = (testType) =>{
        this.props.navigation.navigate('TestWhere',{Json_value:this.state.subProvider_id,location_id:this.state.location_id,provider_id:this.state.provider_id,patient_id:this.state.patient_id,firstName:this.state.first_name,lastName:this.state.last_name,type:this.state.type,providerName:this.state.provider_name,mainProvider:this.state.main_provider,locationName:this.state.location_name,providerType:this.state.provider_type,test_type:testType,type:this.state.type});
    }
    
    go_back(){      
        this.props.navigation.navigate('Select_Provider_testResult');
    }
    componentDidMount(){        
        const { navigation  } = this.props;
        const sub_providerId = navigation.getParam('Json_value', 'NO-ID');
        const locationId = navigation.getParam('location_id', 'NO-ID');
        const providerId = navigation.getParam('userid', 'NO-ID');
        const patientId = navigation.getParam('patient_id', 'NO-ID');
        const FirstName = navigation.getParam('firstName', 'NO-ID');
        const LastName = navigation.getParam('lastName','NO-ID');
        const type = navigation.getParam('type', 'NO-ID');
        const providername = navigation.getParam('providerName', 'NO-ID');
        const providertype = navigation.getParam('providerType', 'NO-ID');
        const mainProvider = navigation.getParam('mainProvider', 'NO-ID');
        const location = navigation.getParam('locationName', 'NO-ID');
        
        this.setState({location_id:locationId,provider_id:providerId,patient_id:patientId,first_name:FirstName,last_name:LastName,type:type,provider_name:providername,location_name:location,subProvider_id:sub_providerId,provider_type:providertype,main_provider:mainProvider});

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
            <Text style={styles.title}>Step 4 of 8</Text>
            {/* <Text style={styles.header_subtitle}>{this.state.type}</Text> */}
          </View>
          {this.state.loading && <View style={styles.spinner} pointerEvents={'none'} >
              <ActivityIndicator size="large" color="#19e600" animating={this.state.loading}/>
          </View>}
          <ScrollView>          
            <View style={styles.first_contanier}>              
              <Text style={{fontSize:20,color:'#0097a7',textAlign:'center',marginTop:10,marginBottom:10}}>What type of test are you looking for results?</Text>
                <TouchableOpacity onPress={()=>this.type_clicked('lab')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>Lab</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('Xray')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>Xray</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('CT')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>CT</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('MRI')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>MRI</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('Ultrasound/Echo')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>Ultrasound / Echo</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('Sleep Test')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>Sleep Test</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.type_clicked('Other')}>
                    <Card borderRadius={15} containerStyle={styles.container_css}>
                        <Text style={styles.list}>Other</Text>
                    </Card>
                </TouchableOpacity>
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

