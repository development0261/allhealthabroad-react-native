import { createStackNavigator,createAppContainer } from 'react-navigation';
import { fromLeft, fromRight } from 'react-navigation-transitions';

import Login from './src/components/login/Login';
import Home from './src/components/home/Home';
import Appointment from './src/components/appointment/Appointment';
import Location from './src/components/location/Location';
import Provider from './src/components/provider/Provider';
import Question from './src/components/question/Question';
import RequestList from './src/components/request_list/Request_list';
import Close_request_list from './src/components/request_list/Close_request_list';
import Connecter from './src/components/connecter/Connecter';
import Open_request from './src/components/request/Open_request';
import Close_request from './src/components/request/Close_request';
import Single_open_request from './src/components/single_request/Single_open_request';
import Single_close_request from './src/components/single_request/Single_close_request';
import First_login from './src/components/login/Login_first';
import Second_login from './src/components/login/Login_second';
import Third_login from './src/components/login/Login_third';
import Fourth_login from './src/components/login/Login_fourth';
import Welcome_back from './src/components/login/Welcome_back';
import Question_when from './src/components/question/Question_when';
import Question_time from './src/components/question/Question_time';
import Question_injury from './src/components/question/Question_injury';
import Question_extra from './src/components/question/Question_extra';
import Verify from './src/components/question/Verify';
import Close_single_request from './src/components/single_request/Close_single_request';
import Update_single_request from './src/components/single_request/Update_single_request';
import Provider_chat from './src/components/home/Provider_chat';
import Chat from './src/components/home/Chat';
import Update_when from './src/components/question/Update_when';
import Update_time from './src/components/question/Update_time';
import Update_injury from './src/components/question/Update_injury';
import Update_extra from './src/components/question/Update_extra';
import Rating from './src/components/single_request/Rating';
import Open_rating from './src/components/single_request/Open_rating';
import Chat_log from './src/components/home/Chat_log';
import Pharmacy_type from './src/components/pharmacy/Pharmacy_type';
import Refill_provider from './src/components/pharmacy/Refill/Refill_provider';
import Refill_supply from './src/components/pharmacy/Refill/Refill_supply';
import Refill_another_med from './src/components/pharmacy/Refill/Refill_another_med';
import Refill_new_request from './src/components/pharmacy/Refill/Refill_new_request';
import Refill_extra from './src/components/pharmacy/Refill/Refill_extra';
import Refill_verify from './src/components/pharmacy/Refill/Refill_verify';
import Select_provider from './src/components/pharmacy/New/Select_provider';
import Symptoms from './src/components/pharmacy/New/Symptoms';
import New_extra from './src/components/pharmacy/New/New_extra';
import New_verify from './src/components/pharmacy/New/New_verify';
import Select_Provider_testResult from './src/components/Test_result/Select_Provider_testResult';
import Test_type from './src/components/Test_result/Test_type';
import TestWhere from './src/components/Test_result/TestWhere';
import Test_time from './src/components/Test_result/Test_time';
import Test_additional_info from './src/components/Test_result/Test_additional_info';
import Test_verify from './src/components/Test_result/Test_verify';
import Status_select_provider from './src/components/pharmacy/status/Status_select_provider';
import Medicine_name from './src/components/pharmacy/status/Medicine_name';
import Medicine_supply from './src/components/pharmacy/status/Medicine_supply';
import Medicine_related from './src/components/pharmacy/status/Medicine_related';
import Status_extra from './src/components/pharmacy/status/Status_extra';
import Status_verify from './src/components/pharmacy/status/Status_verify';


const AppNavigator = createStackNavigator({
    Home: { screen: First_login,
      navigationOptions:{
          header: null,
      }
    },
    Login_second: { screen: Second_login,
      navigationOptions:{
          header: null,
      }
    },
    Login_third: { screen: Third_login,
      navigationOptions:{
          header: null,
      }
    },
    Login_fourth: { screen: Fourth_login,
      navigationOptions:{
          header: null,
      }
    },
    Welcome_back: { screen: Welcome_back,
      navigationOptions:{
          header: null,
      }
    },
    AfterLogin : {screen :  Home,
      navigationOptions:{
        header: null,
      }
    },
    AfterAppointment : {screen :  Appointment,
      navigationOptions:{
        header: null,
      }
    },
    ProviderLocation : {screen :  Location,
      navigationOptions:{
        header: null,
      }
    },
    ProviderSelection : {screen :  Provider,
      navigationOptions:{
        header: null,
      }
    },
    Question_Answer : {screen :  Question,
      navigationOptions:{
        title: 'Question and Request',
        headerStyle: {
          backgroundColor: '#34bfa3',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Request_list : {screen :  RequestList,
      navigationOptions:{
        title: 'Open Requests',
        headerStyle: {
          backgroundColor: '#d4e09b',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Close_request_list : {screen :  Close_request_list,
      navigationOptions:{
        title: 'Close Requests',
        headerStyle: {
          backgroundColor: '#d4e09b',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Connecter : {screen :  Connecter,
      navigationOptions:{
        header: null,
      }
    },
    Open_request : {screen :  Open_request,
      navigationOptions:{
        title: 'Open Request',
        headerStyle: {
          backgroundColor: '#34bfa3',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Close_request : {screen :  Close_request,
      navigationOptions:{
        title: 'Close Request',
        headerStyle: {
          backgroundColor: '#34bfa3',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Single_open_request : {screen :  Single_open_request,
      navigationOptions:{
        header:null
      }
    },
    Single_close_request : {screen :  Single_close_request,
      navigationOptions:{
        header:null
      }
    },
    Question_when : {screen :  Question_when,
      navigationOptions:{     
        header:null
      }
    },
    Question_time : {screen :  Question_time,
      navigationOptions:{     
        header:null
      }
    },
    Question_injury : {screen :  Question_injury,
      navigationOptions:{     
        header:null
      }
    },
    Question_extra : {screen :  Question_extra,
      navigationOptions:{     
        header:null
      }
    },
    Verify : {screen :  Verify,
      navigationOptions:{     
        header:null
      }
    },
    Close_single_request : {screen :  Close_single_request,
      navigationOptions:{     
        header:null
      }
    },
    Update_single_request : {screen :  Update_single_request,
      navigationOptions:{     
        header:null
      }
    },
    Provider_chat : {screen :  Provider_chat,
      navigationOptions:{     
        title: 'Secure Chat',
        headerStyle: {
          backgroundColor: '#d5e09c',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
    Chat : {screen :  Chat,
      navigationOptions:{     
        header:null
      }
    },
    Update_when : {screen :  Update_when,
      navigationOptions:{     
        header:null
      }
    },
    Update_time : {screen :  Update_time,
      navigationOptions:{     
        header:null
      }
    },
    Update_injury : {screen :  Update_injury,
      navigationOptions:{     
        header:null
      }
    },
    Update_extra : {screen :  Update_extra,
      navigationOptions:{     
        header:null
      }
    },
    Rating : {screen :  Rating,
      navigationOptions:{     
        header:null
      }
    },
    Open_rating : {screen :  Open_rating,
      navigationOptions:{     
        header:null
      }
    },
    Chat_log : {screen :  Chat_log,
      navigationOptions:{     
        header:null
      }
    },
    Pharmacy_type : {screen :  Pharmacy_type,
      navigationOptions:{     
        header:null
      }
    },
    Refill_provider : {screen :  Refill_provider,
      navigationOptions:{     
        header:null
      }
    },
    Refill_supply : {screen :  Refill_supply,
      navigationOptions:{     
        header:null
      }
    },
    Refill_another_med : {screen :  Refill_another_med,
      navigationOptions:{     
        header:null
      }
    },
    Refill_new_request : {screen :  Refill_new_request,
      navigationOptions:{     
        header:null
      }
    },
    Refill_extra : {screen :  Refill_extra,
      navigationOptions:{     
        header:null
      }
    },
    Refill_verify : {screen :  Refill_verify,
      navigationOptions:{     
        header:null
      }
    },
    Select_provider : {screen :  Select_provider,
      navigationOptions:{     
        header:null
      }
    },
    Symptoms : {screen :  Symptoms,
      navigationOptions:{     
        header:null
      }
    }, 
    New_extra : {screen :  New_extra,
      navigationOptions:{     
        header:null
      }
    },
    New_verify : {screen :  New_verify,
      navigationOptions:{     
        header:null
      }
    },
    Select_Provider_testResult : {screen :  Select_Provider_testResult,
      navigationOptions:{     
        header:null
      }
    },
    Test_type : {screen :  Test_type,
      navigationOptions:{     
        header:null
      }
    },
    TestWhere : {screen :  TestWhere,
      navigationOptions:{     
        header:null
      }
    },
    Test_time : {screen :  Test_time,
      navigationOptions:{     
        header:null
      }
    },
    Test_additional_info : {screen :  Test_additional_info,
      navigationOptions:{     
        header:null
      }
    },
    Test_verify : {screen :  Test_verify,
      navigationOptions:{     
        header:null
      }
    },
    Status_select_provider : {screen :  Status_select_provider,
      navigationOptions:{     
        header:null
      }
    },
    Medicine_name : {screen :  Medicine_name,
      navigationOptions:{     
        header:null
      }
    },
    Medicine_supply : {screen :  Medicine_supply,
      navigationOptions:{     
        header:null
      }
    },
    Medicine_related : {screen :  Medicine_related,
      navigationOptions:{     
        header:null
      }
    },
    Status_extra : {screen :  Status_extra,
      navigationOptions:{     
        header:null
      }
    },
    Status_verify : {screen :  Status_verify,
      navigationOptions:{     
        header:null
      }
    },
},
{  
  transitionConfig: () => fromRight(),
},
);

const ReApp = createAppContainer(AppNavigator);
export default ReApp;