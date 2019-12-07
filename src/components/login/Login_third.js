import React, {Component} from 'react';
import {Picker, StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, Dimensions,KeyboardAvoidingView} from 'react-native';

//import firebase from 'firebase';

export default class Login_third extends Component{
    constructor(props){
        super(props)        
        this.state = {
            mobilenumber:"",
            month:"01",
            date:"01",
            year:"1970",
        }
        this.onComplete = this.onComplete.bind(this);
        this.goBack = this.goBack.bind(this);
    }
   
    componentDidMount(){
        const { navigation  } = this.props;
        const mobileNumber = navigation.getParam('mobile_number', 'NO-ID');        
        this.setState({mobilenumber:mobileNumber});
        console.log(mobileNumber);
    }
    goBack(){
        this.props.navigation.navigate('Login_second');
    }

    onComplete() {
        console.log(this.state.mobilenumber);
        console.log(this.state.date);
        console.log(this.state.month);
        console.log(this.state.year);
        this.props.navigation.navigate('Login_fourth',{mobile_number:this.state.mobilenumber,date:this.state.date,month:this.state.month,year:this.state.year});
    }
   
    render() {       
        const { navigate } = this.props.navigation;
        var {height, width} = Dimensions.get('window');
        console.log(height);
        return (            
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <Image
              style={{width: '100%', height: '20%',top:height*0.1}}
              source={require('../../uploads/Logo_Horizontal_White_PNG_new.png')}
            />
            <View style={{alignItems:'center',flex:1,paddingTop:50}}>
                {/* <Image
                    style={{width:40, height:40 }}
                        source={require('../../uploads/logo.png')}
                /> */}
                <Text style={styles.text_css}>
                        {this.state.mobilenumber}
                </Text>
                <Text style={styles.text_css_verify}>
                        Verify your date of birth.
                </Text>

                <Picker
                    selectedValue={this.state.month}
                    style={styles.date_picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({month: itemValue})
                    }>                    
                    <Picker.Item label="January" value="01" />
                    <Picker.Item label="February" value="02" />
                    <Picker.Item label="March" value="03" />
                    <Picker.Item label="April" value="04" />
                    <Picker.Item label="May" value="05" />
                    <Picker.Item label="June" value="06" />
                    <Picker.Item label="July" value="07" />
                    <Picker.Item label="August" value="08" />
                    <Picker.Item label="September" value="09" />
                    <Picker.Item label="October" value="10" />
                    <Picker.Item label="November" value="11" />
                    <Picker.Item label="December" value="12" />
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
                    {[1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 
                    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 
                    1996, 1997, 1998, 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014
                    ,2015,2016,2017,2018,2019].map(item => (
                        <Picker.Item key={item} label={`${item }`} value={item } />
                    ))}
                </Picker>

            </View>
            
            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:'#e71d36',width:'50%'}} onPress={()=>this.goBack()}>
                    <Text style={styles.next_btn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#d4e09b',width:'50%'}} onPress={()=>this.onComplete()}>
                    <Text style={styles.next_btn}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {        
      flex:1,
      backgroundColor:"#0097a7",
    },
    text_css:{
        color:'white',
        fontSize:22,
        marginTop:25
    },
    text_css_verify:{
        color:'white',
        fontSize:24,
        marginTop:10,
        marginBottom:20,
    },
    text_welcome:{
        color:'white',
        fontSize:30,
        marginTop:30
    },
    next_btn:{
        fontSize:20,
        color:'black',
        padding:15,
        textAlign:'center'
    },    
    date_picker:{
        backgroundColor:'white',
        width:"70%",
        textAlign:'center',
        marginBottom: 15,
        color:'black',
        marginTop:5
    },
});