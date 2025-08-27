import axios from './index';

console.log("aaaax", axios.interceptors);
export default {
  getUsers() {
    return axios.get('api/?results=10');
  },
  auth(data) {
    return axios.post('auth/login', data);
  },
  forgotPassword(data) {
    return axios.post('forgotPassword', data);
  },
  confirmPinCode(data) {
    return axios.post('verifyPinCode', data);
  },
  resetPasswordPublic(data) {
    return axios.post('resetPasswordPublic', data);
  },
  changePassword(data) {
    return axios.post('member/password/reset', data);
  },
  changePhone(data) {
    return axios.post('member/me/contact/phone/change', data);
  },
  confirmChangePhone(data) {
    return axios.post('member/me/contact/phone/change/check', data);
  },
  getHomeData() {
    return axios.get('view/1');
  },
  payTerminalTicket(data) {
    return axios.post('payTerminalTicket', data);
  },
  registerWithMail(data) {
    return axios.post('register/i', data);
  },
  registerWithPhone(data) {
    return axios.post('register/i/phone', data);
  },
  verifyPhone(data) {
    return axios.post('register/i/phone/verify', data);
  },
  checkToken() {
    return axios.post('auth/check');
  },
  getCategory(id) {
    console.log("getCategory çagrildi")
    return axios.get(`search/getchilds/${id}`);
  },
  getConfig(data) {
    return axios.post('member/config', data);
  },
  setConfig(data) {
    return axios.post('member/config/set', data);
  },
  verifyTCKN(data) {
    return axios.post('member/config/set/tcKimlikNo', data);
  },
  serchAll(data) {
    return axios.post('search/first_step', data);
  },
  getPersonalInfo() {
    return axios.get('member/me/personalDatas');
  },
  postPersonalInfo(data) {
    return axios.post('member/me/personalDatas/set', data);
  },
  getIlListOptions() {
    return axios.get('/search/cities');
  },
  getIlceListOptions(data) {
    return axios.post('/search/towns', data);
  },
  getMahalleListOptions(data) {
    return axios.get(`/search/districts/${data}`);
  },
  getSearchResultsFilterOptions(data) {
    return axios.post('search/renderFilters', data);
  },
  selectCategory(data) {
    return axios.post('add_advertisement/getoptions', data);
  },
  getSearchList() {
    return axios.get('member/list/favoriteSearch');
  },
  saveSearch(data) {
    return axios.post('member/save/favoriteSearch', data);
  },
  removeSearch(id) {
    return axios.post('member/delete/favoriteSearch', { id });
  },
  renderFiltersForAdd(data) {
    return axios.post('search/renderFiltersForAdd', data);
  },
  adsCreate(data) {
    return axios.post('advertisement/add', data);
  },
  getEmail() {
    return axios.get('member/me/checkEmailValidation');
  },
  updateEmail(data) {
    return axios.post('member/me/updateEmail', data);
  },
  membershipCancellation(data) {
    return axios.post('member/me/closeMyAccount', data);
  },
  getNotificationPermissions() {
    return axios.get('member/me/getNotificationPermissions');
  },
  setNotificationPermissions(data) {
    return axios.post('member/me/getNotificationPermissions/set', data);
  },
  getElectronicNotificationPermissions() {
    return axios.get('member/me/getLegalPermissions');
  },
  setElectronicNotificationPermissions(data) {
    return axios.post('member/me/getLegalPermissions/set', data);
  },
  getUserActivities() {
    return axios.get('member/me/getUserActivities');
  },
  static_specification(data) {
    return axios.post('search/get_staticspecs', data);
  },
  setFirebaseToken(data) {
    return axios.post('member/me/settoken', data);
  },
  getDealersList() {
    return axios.get('expertise/listDealers');
  },
  getDealersByCity(data) {
    return axios.post('search/expertise/getDealersByCity', data);
  },
  getPackagesDealer(data) {
    return axios.post('expertise/getPackagesOfDealer', data);
  },
  getCarDetail(data) {
    return axios.get(`view/detail/${data}`);
  },
  setAdFavorite(data) {
    return axios.post(`favorite/addListItem/1/${data}`);
  },
  getCarCategoryList() {
    return axios.get('search/optionsForKaportaBoya');
  },
  checkUserForExpertise(data) {
    return axios.post('expertise/checkUserForExpertise', data);
  },
  payForExpertise(data) {
    return axios.post('expertise/payForExpertise', data);
  },
  likeUser(data) {
    return axios.post('advertisement/likeUser', data);
  },
  reportAd(data) {
    return axios.post('advertisement/reportAd', data);
  },
  compareCars(data) {
    return axios.post('favorite/addListItem/1/', data); //TODO need to add url
  },

  getBlockedUsers() {
    return axios.get('blockuser/list');
  },
  updateBlockedUser(id) {
    return axios.post(`blockuser/${id}`);
  },
  getChatList() {
    return axios.get('messages/getMessages');
  },
  getMessages({ ad_code, user_id }) {
    return axios.get(
      `messages/getMessagesOfConversation/${ad_code}/${user_id}`,
    );
  },
  deleteMessages({ ad_code, chatGroupId }) {
    return axios.get(`messages/deleteMessage/${chatGroupId}/${ad_code}`);
  },
  sendMessage({ me, ad_code, user_id, messageText }) {
    return axios.post(`messages/sendMessage/${me}/${ad_code}/${user_id}`, {
      messageText,
    });
  },
  getExpertiseResult(data) {
    return axios.post('expertise/search', data);
  },
  getProfileAds(user_id) {
    return axios.get(`userprofile/${user_id}`);
  },
  saveInspection(data) {
    return axios.post('ai/saveInspection', data);
  },
};
