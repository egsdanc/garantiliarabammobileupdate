import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BaseColor } from '../config/color';
import { BaseStyle } from '../config/theme';

import Icon from '../components/Icon';

import Loading from '../screens/Loading';
/* Bottom Screen */
import Home from '../screens/Home';
import Messenger from '../screens/Messenger';
import Profile from '../screens/Profile';
/* Modal Screen only affect iOS */
import PreviewImage from '../screens/PreviewImage';
/* Stack Screen */
import Messages from '../screens/Messages';
import Notification from '../screens/Notification';
import Walkthrough from '../screens/Walkthrough';
import ChooseLoginType from '../screens/ChooseLoginType';
import SignUp from '../screens/SignUp';
import SignUpWithMail from '../screens/SignUpWithMail';
import SignIn from '../screens/SignIn';
import Legal from '../screens/Legal';
import ResetPassword from '../screens/ResetPassword';
import ResetPasswordPinCode from '../screens/ResetPasswordPinCode';
import ResetPasswordSetNewPassword from '../screens/ResetPasswordSetNewPassword';
import SmsCode from '../screens/SmsCode';
import ChangePassword from '../screens/ChangePassword';
import ChooseCarSearchStep1 from '../screens/ChooseCarSearchStep1';
import IlanEkle from '../screens/IlanEkle'
import CarDetail from '../screens/CarDetail';
import OurService from '../screens/OurService';
import KaportaBoyaArama from '../screens/KaportaBoyaArama';

import SearchResults from '../screens/SearchResults';
import SearchResultsFilter from '../screens/SearchResults/Filter';
import ChooseExpertiseCategory from '../screens/ChooseExpertiseCategory';
import EkspertizRandevu from '../screens/EkspertizRandevu';
import EkspertizRandevuPaketSec from '../screens/EkspertizRandevuPaketSec';
import EkspertizRandevuOdeme from '../screens/EkspertizRandevuOdeme';
import EkspertizRandevuOdeme3D from '../screens/EkspertizRandevuOdeme3D';
import EkspertizRandevuOdemeSonuc from '../screens/EkspertizRandevuOdemeSonuc';
// import SelectBayii from '../screens/SelectBayii';
import SpecialToMe from '../screens/SpecialToMe';
import MembershipInfo from '../screens/MembershipInfo';
import EPosta from '../screens/MembershipInfo/EPosta';
import TCKN from '../screens/MembershipInfo/TCKN';
import ChangePhoneNumber from '../screens/MembershipInfo/ChangePhoneNumber';
import Security from '../screens/MembershipInfo/Security';
import ActiveSession from '../screens/MembershipInfo/ActiveSession';
import MembershipCancellation from '../screens/MembershipInfo/MembershipCancellation';
import AddressList from '../screens/MembershipInfo/AddressList';
import AddNewAddress from '../screens/MembershipInfo/AddNewAddress';
import PersonalInfo from '../screens/PersonalInfo';
import BlockUsers from '../screens/SpecialToMe/BlockUsers';
import MyProductLists from '../screens/SpecialToMe/MyProductLists';
import Notifications from '../screens/SpecialToMe/Notifications';
import ElectronicNotification from '../screens/SpecialToMe/ElectronicNotification';
import adBlock from '../screens/SpecialToMe/adBlock';
import RemovedAds from '../screens/SpecialToMe/RemovedAds';
import ModalPicker from '../screens/ModalPicker';
import Transactions from '../screens/Transactions';
import AdsManagement from '../screens/AdsManagement';
import SubIlan from '../screens/AdsManagement/BaseItem';
import GetUsers from '../screens/GetUsers';
import OtoEkspertiz from '../screens/OtoEkspertiz';
import ExspertiseRequests from '../screens/OtoEkspertiz/ExspertiseRequests';
import EkspertisePackage from '../screens/OtoEkspertiz/EkspertisePackage';
import ExpertiseCoupons from '../screens/OtoEkspertiz/ExpertiseCoupons';
import TransactionFilter from '../screens/Transactions/Filter';

/**azat */
import IlanFotografYukle from '../screens/IlanFotografYukle';
import Iletisim from '../screens/IlanEkleIletisim';
import Paket from '../screens/Paket';
import Favorilerim from '../screens/Favorilerim';
/**Iskender */
import IlanKategoriSecimi from '../screens/IlanKategoriSecimi';
import IlanDetay from '../screens/IlanDetay';
import IlanKonumSecme from '../screens/IlanKonumSecme';
import IlanOzellikler from '../screens/IlanEkleOzellikler';
import Packages from '../screens/IlanEklePaketler';
import IlanEkleSonucSayfasi from '../screens/IlanEkleSonucSayfasi';
import IlanSikayetEt from '../screens/IlanSikayetEt';

/*Mehmet */
import GABuyingServices from '../screens/GABuyingServices';
import HasarSorgulama from '../screens/GABuyingServices/HasarSorgulama';
import ManuelEkspertizRandevusu from '../screens/GABuyingServices/ManuelEkspertizRandevusu';
import ManuelEkspertizRandevusuAdim2 from '../screens/GABuyingServices/ManuelEkspertizRandevusuAdim2';
import ManuelEkspertizRandevusuAdim3 from '../screens/GABuyingServices/ManuelEkspertizRandevusuAdim3';
import ManuelEkspertizRandevusuAdim4 from '../screens/GABuyingServices/ManuelEkspertizRandevusuAdim4';
import ManuelEkspertizRandevusuAdim5 from '../screens/GABuyingServices/ManuelEkspertizRandevusuAdim5';
import ManuelEkspertizRandevusuAdim6 from '../screens/GABuyingServices/ManuelEkspertizRandevusuAdim6';
import CarExpertise from '../screens/GABuyingServices/CarExpertise';
import CarCompare from '../screens/GABuyingServices/CarCompare';
import ConfirmMembershipCancellation from '../screens/MembershipInfo/ConfirmMembershipCancellation';
import PreviewImageOfAd from '../screens/PreviewImageOfAd';
import UserProfileDetail from '../screens/UserProfileDetail';
import GarantiAI from '../screens/GarantiAI';
import GarantiAIProcess from '../screens/GarantiAI/process';
import GarantiAISuccess from '../screens/GarantiAI/success';
import GarantiAIIntro from '../screens/GarantiAI/intro';
import GarantiAIMyExpertises from '../screens/GarantiAI/myExpertises';
/**Azat */
import CompareCars from '../screens/CompareCars';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom transition for specific screens
const screenOptions = ({ route }) => {
  return {
    gestureEnabled: true,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      const { routeName } = route;
      if (routeName === 'PreviewImage' || routeName === 'PreviewImageOfAd') {
        return {
          cardStyle: {
            transform: [
              {
                scale: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
            opacity: current.progress,
          },
        };
      }
      return {};
    },
  };
};

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'ChooseCarSearchStep1':
              iconName = 'search';
              break;
            case 'IlanEkle':
              iconName = 'plus';
              break;
            case 'OurService':
              iconName = 'gofore';
              break;
            case 'Profile':
              iconName = 'user-circle';
              break;
            default:
              iconName = 'home';
          }
          return <Icon color={color} name={iconName} size={size} solid />;
        },
        tabBarActiveTintColor: BaseColor.primaryColor,
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarStyle: BaseStyle.tabBar,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Vitrin' }}
      />
      <Tab.Screen
        name="ChooseCarSearchStep1"
        component={ChooseCarSearchStep1}
        options={{ title: 'Arama' }}
      />
      <Tab.Screen
        name="IlanEkle"
        component={IlanEkle}
        options={{ title: 'Ücretsiz İlan' }}
      />
      <Tab.Screen
        name="OurService"
        component={OurService}
        options={{ title: 'Hizmetler' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profilim' }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
        ...screenOptions,
      }}
    >
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="IlanFotografYukle" component={IlanFotografYukle} />
      <Stack.Screen name="Iletisim" component={Iletisim} />
      <Stack.Screen name="Paket" component={Paket} />
      <Stack.Screen name="Favorilerim" component={Favorilerim} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="ChooseLoginType" component={ChooseLoginType} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpWithMail" component={SignUpWithMail} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetPasswordPinCode" component={ResetPasswordPinCode} />
      <Stack.Screen name="ResetPasswordSetNewPassword" component={ResetPasswordSetNewPassword} />
      <Stack.Screen name="SmsCode" component={SmsCode} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChooseCarSearchStep1" component={ChooseCarSearchStep1} />
      <Stack.Screen name="IlanEkle" component={IlanEkle} />
      <Stack.Screen name="Messenger" component={Messenger} />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={({ route }) => route.params || {}}
      />
      <Stack.Screen name="SearchResultsFilter" component={SearchResultsFilter} />
      <Stack.Screen name="CompareCars" component={CompareCars} />
      <Stack.Screen name="CarDetail" component={CarDetail} />
      <Stack.Screen name="OurService" component={OurService} />
      <Stack.Screen name="KaportaBoyaArama" component={KaportaBoyaArama} />
      <Stack.Screen name="ChooseExpertiseCategory" component={ChooseExpertiseCategory} />
      <Stack.Screen name="EkspertizRandevu" component={EkspertizRandevu} />
      <Stack.Screen name="EkspertizRandevuPaketSec" component={EkspertizRandevuPaketSec} />
      <Stack.Screen name="EkspertizRandevuOdeme" component={EkspertizRandevuOdeme} />
      <Stack.Screen name="EkspertizRandevuOdeme3D" component={EkspertizRandevuOdeme3D} />
      <Stack.Screen name="EkspertizRandevuOdemeSonuc" component={EkspertizRandevuOdemeSonuc} />
      <Stack.Screen name="SpecialToMe" component={SpecialToMe} />
      <Stack.Screen name="MembershipInfo" component={MembershipInfo} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="ModalPicker" component={ModalPicker} />
      <Stack.Screen name="EPosta" component={EPosta} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="ActiveSession" component={ActiveSession} />
      <Stack.Screen name="TCKN" component={TCKN} />
      <Stack.Screen name="AddressList" component={AddressList} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="MembershipCancellation" component={MembershipCancellation} />
      <Stack.Screen name="ConfirmMembershipCancellation" component={ConfirmMembershipCancellation} />
      <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="TransactionFilter" component={TransactionFilter} />
      <Stack.Screen name="BlockUsers" component={BlockUsers} />
      <Stack.Screen name="MyProductLists" component={MyProductLists} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ElectronicNotification" component={ElectronicNotification} />
      <Stack.Screen name="adBlock" component={adBlock} />
      <Stack.Screen name="RemovedAds" component={RemovedAds} />
      <Stack.Screen name="AdsManagement" component={AdsManagement} />
      <Stack.Screen name="OtoEkspertiz" component={OtoEkspertiz} />
      <Stack.Screen name="ExspertiseRequests" component={ExspertiseRequests} />
      <Stack.Screen name="EkspertisePackage" component={EkspertisePackage} />
      <Stack.Screen name="ExpertiseCoupons" component={ExpertiseCoupons} />
      <Stack.Screen name="SubIlan" component={SubIlan} />
      <Stack.Screen name="IlanKategoriSecimi" component={IlanKategoriSecimi} />
      <Stack.Screen name="IlanDetay" component={IlanDetay} />
      <Stack.Screen name="IlanKonumSecme" component={IlanKonumSecme} />
      <Stack.Screen name="IlanOzellikler" component={IlanOzellikler} />
      <Stack.Screen name="IlanSikayetEt" component={IlanSikayetEt} />
      <Stack.Screen name="Packages" component={Packages} />
      <Stack.Screen name="IlanEkleSonucSayfasi" component={IlanEkleSonucSayfasi} />
      <Stack.Screen name="GetUsers" component={GetUsers} />
      <Stack.Screen name="GABuyingServices" component={GABuyingServices} />
      <Stack.Screen name="HasarSorgulama" component={HasarSorgulama} />
      <Stack.Screen name="ManuelEkspertizRandevusu" component={ManuelEkspertizRandevusu} />
      <Stack.Screen name="ManuelEkspertizRandevusuAdim2" component={ManuelEkspertizRandevusuAdim2} />
      <Stack.Screen name="ManuelEkspertizRandevusuAdim3" component={ManuelEkspertizRandevusuAdim3} />
      <Stack.Screen name="ManuelEkspertizRandevusuAdim4" component={ManuelEkspertizRandevusuAdim4} />
      <Stack.Screen name="ManuelEkspertizRandevusuAdim5" component={ManuelEkspertizRandevusuAdim5} />
      <Stack.Screen name="ManuelEkspertizRandevusuAdim6" component={ManuelEkspertizRandevusuAdim6} />
      <Stack.Screen name="CarExpertise" component={CarExpertise} />
      <Stack.Screen name="CarCompare" component={CarCompare} />
      <Stack.Screen name="UserProfileDetail" component={UserProfileDetail} />
      <Stack.Screen name="GarantiAI" component={GarantiAI} />
      <Stack.Screen name="GarantiAIProcess" component={GarantiAIProcess} />
      <Stack.Screen name="GarantiAISuccess" component={GarantiAISuccess} />
      <Stack.Screen name="GarantiAIIntro" component={GarantiAIIntro} />
      <Stack.Screen name="GarantiAIMyExpertises" component={GarantiAIMyExpertises} />
    </Stack.Navigator>
  );
}

// Root Stack with Modals
function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
              opacity: current.progress,
            },
          }),
        }}
      />
      <Stack.Screen
        name="PreviewImageOfAd"
        component={PreviewImageOfAd}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
              opacity: current.progress,
            },
          }),
        }}
      />
      <Stack.Screen name="MainStack" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <RootStackNavigator />
  );
}