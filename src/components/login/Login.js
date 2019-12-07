import React, {Component} from 'react';
import {Picker, StyleSheet, AsyncStorage, View, TouchableWithoutFeedback, Keyboard, Text, StatusBar, Button} from 'react-native';
import PinView from 'react-native-pin-view';
import TextInputMask from 'react-native-text-input-mask';
import {decode as atob, encode as btoa} from 'base-64'
//import firebase from 'firebase';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            pin: "8967",
            mobileNumber:"",            
            month:"01",
            date:"01",
            year:"",
            load:"1",
        }       
    }
   
    onComplete(val) {
            console.log(val);
            val=parseInt(val);
            
            if(this.state.mobileNumber.length<10 ){
                alert("Please Enter Correct 10 Digit Mobile Number");
                this.pinview.clear();
                this.mobileNumber.clear();
                return false;
            }
            if(!this.state.month){
                alert("Please Select Month");
                this.pinview.clear();
                this.mobileNumber.clear();
                return false;
            }
            if(!this.state.date){
                alert("Please Select Date");
                this.pinview.clear();
                this.mobileNumber.clear();
                return false;
            }
            if(this.state.year=='Year'){
                alert("Please Select Year");
                this.pinview.clear();
                this.mobileNumber.clear();
                
                return false;
            }
            console.log("Number::"+this.state.mobileNumber);
            console.log("Month::"+this.state.month);
            console.log("Date::"+this.state.date);
            console.log("Year::"+this.state.year);
            console.log("Date::"+this.state.year+'-'+this.state.month+'-'+this.state.date)         
            console.log("Pin:"+val);
            
            // var test='https://allaboardhealth.com/api/Login_api/'+this.state.dob+'/'+this.state.mobileNumber+'/'+val+'/';
            // console.log(test);
            // var data = {                
            //     "date_of_birth":this.state.year+'-'+this.state.month+'-'+this.state.date,
            //     "phone":this.state.mobileNumber,
            //     "pin":val,
            //  }
            var data = new FormData()
            data.append('date_of_birth', this.state.year+'-'+this.state.month+'-'+this.state.date);
            data.append('phone', this.state.mobileNumber);
            data.append('pin', val);
            //  console.log(data);
            var headers = new Headers();
            headers.append('Accept','application/json');
            let encode = btoa('admin:12345');
            let auth = 'Basic ' + encode;            
            headers.append("Authorization", auth);
            headers.append("X-API-KEY",'admin@123');
            console.log(auth);
            fetch("https://allaboardhealth.com/api/authentication/login", {
            method: "POST",
            headers: headers,                
            body:  data
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson!=""){
                    console.log(responseJson);
                    this.props.navigation.navigate('AfterLogin',{Json_value:responseJson.data});
                }
                else{
                    alert("Wrong Login Details");
                    this.pinview.clear();
                    this.mobileNumber.clear();
                }
            }).catch((error) =>{
                console.error(error);
            });
            // this.props.navigation.navigate('AfterLogin'); 
            //return fetch('https://allaboardhealth.com/api/Login_api/'+this.state.dob+'/'+this.state.mobileNumber+'/'+val+'/')
            // .then((response) => response.json())
            // .then((responseJson) => {
            //     if(responseJson!=""){
            //         console.log(responseJson);
            //         this.props.navigation.navigate('AfterLogin',{Json_value:responseJson});
            //     }
            //     else
            //         Alert("NO record Found");
            //     this.setState({
            //     isLoading: false,
            //     dataSource: responseJson,
            //     }, function(){    
            //     });
            // })
            //     .catch((error) =>{
            //     console.error(error);
            // });
    }
   
    render() {       
        const { navigate } = this.props.navigation;
        
        return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />          
            <TextInputMask 
            style={styles.textinput}
            refInput={ref => { this.mobileNumber = ref }}
            placeholder="Enter Phone Number"
            placeholderTextColor='rgba(000,000,000,000.7)'
            returnKeyType="next"            
            autoCorrect={false}
            keyboardType = 'numeric'
            onChangeText={(formatted, extracted) => {               
                this.setState({mobileNumber:formatted})
            }}
            mask={"([000]) [000]-[0000]"} 
            />
            <View style={{flexDirection: 'row'}}>
                <Picker
                    selectedValue={this.state.month}
                    style={styles.date_picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({month: itemValue})
                    }>                    
                    <Picker.Item label="Jan" value="01" />
                    <Picker.Item label="Feb" value="02" />
                    <Picker.Item label="Mar" value="03" />
                    <Picker.Item label="Apr" value="04" />
                    <Picker.Item label="May" value="05" />
                    <Picker.Item label="Jun" value="06" />
                    <Picker.Item label="July" value="07" />
                    <Picker.Item label="Aug" value="08" />
                    <Picker.Item label="Sept" value="09" />
                    <Picker.Item label="Oct" value="10" />
                    <Picker.Item label="Nov" value="11" />
                    <Picker.Item label="Dec" value="12" />
                </Picker>
                <Picker
                    selectedValue={this.state.date}
                    style={styles.date_picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({date: itemValue})
                    }>                    
                    <Picker.Item label="1" value="01" />
                    <Picker.Item label="2" value="02" />
                    <Picker.Item label="3" value="03" />
                    <Picker.Item label="4" value="04" />
                    <Picker.Item label="5" value="05" />
                    <Picker.Item label="6" value="06" />
                    <Picker.Item label="7" value="07" />
                    <Picker.Item label="8" value="08" />
                    <Picker.Item label="9" value="09" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="13" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="24" value="24" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="26" value="26" />
                    <Picker.Item label="27" value="27" />
                    <Picker.Item label="28" value="28" />
                    <Picker.Item label="29" value="29" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="31" value="31" />
                </Picker>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.year}
                    style={styles.date_picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({year: itemValue})
                    }> 
                    {[1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915,
                    1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 
                    1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 
                    1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 
                    1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 
                    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 
                    1996, 1997, 1998, 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014
                    ,2015,2016,2017,2018,2019].map(item => (
                        <Picker.Item key={item} label={`${item }`} value={item } />
                    ))}
                </Picker>
            </View>
            <PinView
                style={styles.pinview_css}
                ref={input =>this.pinview = input}
                onComplete={(val, clear)=>{this.onComplete(val)}}
                pinLength={this.state.pin.length}                
                // pinLength={6} // You can also use like that.
            />
           
            {/* <Button
                title='click'
                onPress={() =>
                    this.props.navigation.navigate('AfterLogin')
                  }
            />  */}
        </View>
        </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      padding:20,      
    },
    date_picker:{
        height:50,
        width:110,
        textAlign:'center',
        marginBottom: 15,
    },
    textinput:{
        fontSize: 15,        
        color: 'black',
        marginBottom: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        textAlign:'center'
    },    
});