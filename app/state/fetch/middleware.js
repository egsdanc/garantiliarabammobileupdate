import {all} from 'redux-saga/effects';
import {watch_getUsers} from '../ducks/getUsers';
import {watch_signIn} from '../ducks/signIn';
import {watch_registerWithMail} from '../ducks/registerWithMail';
import {watch_registerWithPhone} from '../ducks/registerWithPhone';
import {watch_verifyPhone} from '../ducks/verifyPhone';
import {
  watch_forgotPassword,
  watch_confirmPinCode,
  watch_resetPassword,
} from '../ducks/forgotPassword';
import {watch_getHomeData} from '../ducks/home';
import {watch_checkToken} from '../ducks/checkToken';
import {watch_getCategory} from '../ducks/kategori';
import {watch_changePassword} from '../ducks/changePassword';
import {watch_getConfig, watch_setConfig} from '../ducks/config';
import {watch_getCategoryList} from '../ducks/KategoryArama';
import {watch_verifyTCKN} from '../ducks/verifyTCKN';
import {watch_searchAll} from '../ducks/KategoryAramaSonuc';
import {
  watch_getPersonalInfo,
  watch_postPersonalInfo,
} from '../ducks/personalInfo';
import {watch_get_il_list_options} from '../ducks/ilList';
import {watch_getIlceListOptions} from '../ducks/ilceList';
import {watch_getMahalleListOptions} from '../ducks/mahalleList';
import {watch_SearchResultsFilterOptions} from '../ducks/SearchResultsFilter';
import {watch_selectCategory} from '../ducks/selectCategory';
import {
  watch_changePhone,
  watch_confirmChangePhone,
} from '../ducks/changePhoneNumber';
import {
  watch_searchManagerGetSearchList,
  watch_searchManagerSaveSearch,
  watch_searchManagerRemoveSearch,
} from '../ducks/SearchManager';
import {watch_selectModel} from '../ducks/selectModel';
import {watch_adsCreate} from '../ducks/adsCreate';
import {watch_getEmail, watch_changeEmail} from '../ducks/changeEmail';
import {watch_membershipCancellation} from '../ducks/membershipCancellation';
import {
  watch_getNotificationPermissions,
  watch_setNotificationPermissions,
} from '../ducks/notificationPermissions';
import {
  watch_getElectronicNotificationPermissions,
  watch_setElectronicNotificationPermissions,
} from '../ducks/electronicNotificationPermissions';
import {watch_getUserActivities} from '../ducks/userActivities';
import {watch_specification} from '../ducks/IlanVer/ozellikler';
import {watch_getpackages} from '../ducks/IlanVer/packages';
import {watch_setFirebaseToken} from '../ducks/setFirebaseToken';
import {
  watch_getDealersList,
  watch_getPackagesList,
  watch_getDealersListCallBack,
} from '../ducks/getDealersList';
import {watch_getCarDetail, watch_setAdFavorite} from '../ducks/carDetail';
import {watch_getCarCategoryList} from '../ducks/kaportaBoya';
import {
  watch_checkUserForExpertise,
  watch_sendPaymentRequuest,
} from '../ducks/ekspertizTalep';
import {watch_likeUser} from '../ducks/likeUser';
import {watch_ilanSikayetEt} from '../ducks/ilanSikayetEt';
import {
  watch_getBlockedUsers,
  watch_updateBlockedUser,
} from '../ducks/blockedUsers';
import {
  watch_getChatList,
  watch_getMessages,
  watch_sendMessage,
  watch_deleteMessages,
} from '../ducks/messages';
import {
  watch_getExpertiseQuery,
  watch_getProfileAds,
} from '../ducks/expertiseQuery';
import {
  watch_getIller,
  watch_getIlceler,
  watch_getBayiler,
} from '../ducks/getIlIlceler';

import {
  watch_saveInspection,
} from '../ducks/ai';

export default function* Sagas() {
  yield all([
    watch_getUsers(),
    watch_signIn(),
    watch_registerWithMail(),
    watch_registerWithPhone(),
    watch_verifyPhone(),
    watch_forgotPassword(),
    watch_confirmPinCode(),
    watch_resetPassword(),
    watch_getHomeData(),
    watch_checkToken(),
    watch_getCategory(),
    watch_changePassword(),
    watch_getConfig(),
    watch_setConfig(),
    watch_getCategoryList(),
    watch_verifyTCKN(),
    watch_searchAll(),
    watch_getPersonalInfo(),
    watch_postPersonalInfo(),
    watch_SearchResultsFilterOptions(),
    watch_get_il_list_options(),
    watch_getIlceListOptions(),
    watch_getMahalleListOptions(),
    watch_selectCategory(),
    watch_changePhone(),
    watch_confirmChangePhone(),
    watch_searchManagerGetSearchList(),
    watch_searchManagerSaveSearch(),
    watch_searchManagerRemoveSearch(),
    watch_selectModel(),
    watch_adsCreate(),
    watch_getEmail(),
    watch_changeEmail(),
    watch_membershipCancellation(),
    watch_getNotificationPermissions(),
    watch_setNotificationPermissions(),
    watch_getElectronicNotificationPermissions(),
    watch_setElectronicNotificationPermissions(),
    watch_getUserActivities(),
    watch_specification(),
    watch_getpackages(),
    watch_setFirebaseToken(),
    watch_getDealersList(),
    watch_getPackagesList(),
    watch_getDealersListCallBack(),
    watch_getCarDetail(),
    watch_setAdFavorite(),
    watch_getCarCategoryList(),
    watch_checkUserForExpertise(),
    watch_sendPaymentRequuest(),
    watch_likeUser(),
    watch_ilanSikayetEt(),
    //add other operation
    watch_getBlockedUsers(),
    watch_updateBlockedUser(),
    watch_getChatList(),
    watch_getMessages(),
    watch_sendMessage(),
    watch_deleteMessages(),
    watch_getExpertiseQuery(),
    watch_getProfileAds(),
    watch_getIller(),
    watch_getIlceler(),
    watch_getBayiler(),
    watch_saveInspection(),
  ]);
}
