import React, { useEffect, useState, useCallback } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  GiftedChat,
  InputToolbar
} from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SafeAreaView, Icon, Text, Image } from '@components';
import {
  getMessages_action,
  sendMessage_action,
  deleteMessages_action
} from '@state/ducks/messages';
import {
  updateBlockedUser_action
} from '@state/ducks/blockedUsers';
import { compose, withLoadingScreen } from '@hocs';
import { withProps } from '../../hocs';
import { Block } from '../../commonComponents';
import styles from './styles';

const Messages = ({ navigation, data, screenProps, route }) => {

  const [chatInfo, setChatInfo] = useState(route.params.chatInfo || {})
  const dispatch = useDispatch();

  const getMessages = useCallback(
    () => dispatch(getMessages_action({
      ad_code: chatInfo?.ad_code,
      user_id: chatInfo?.me === "seller" ? chatInfo?.customer_id : chatInfo?.seller_id
    })),
    [dispatch, chatInfo],
  );

  const sendMessage = useCallback(
    (messageText) => dispatch(sendMessage_action({
      me: chatInfo?.me,
      ad_code: chatInfo?.ad_code,
      user_id: chatInfo?.me === "seller" ? chatInfo?.customer_id : chatInfo?.seller_id,
      messageText
    },
      () => getMessages(),
      reject
    )),
    [dispatch, chatInfo],
  );

  const deleteMessages = useCallback(
    () => dispatch(deleteMessages_action({
      chatGroupId: data?.chatGroupId,
      ad_code: data?.ad?.ad_code
    },
      resolve,
      reject
    )),
    [dispatch, data],
  );

  const blockUser = useCallback(
    () =>
      dispatch(
        updateBlockedUser_action(
          chatInfo?.me === "seller" ? chatInfo?.customer_id : chatInfo?.seller_id,
          () => {
            screenProps.openModalSuccess({
              body: () => (
                <Block p4 m4>
                  <Text center middle>
                    {'Kullanıcıyı engellediniz. Engellenen kullanıcıları profilinizden görebilir ve engellerini kaldırabilirsiniz'}
                  </Text>
                </Block>
              ),
              onClose: () => {
                navigation.goBack();
              },
            });
          },
          reject),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, chatInfo],
  );

  const onSend = useCallback((messages = []) => {
    if (messages.length > 0) {
      sendMessage(messages[0]?.text)
    }
  }, [])

  const resolve = (res) => {
    screenProps.openModalSuccess({
      body: () => (
        <Block p4 m4>
          <Text center middle>
            {res?.message || res || 'Beklenmedik hata oluştu'}
          </Text>
        </Block>
      ),
      onClose: () => {
        getMessages()
      },
    });
  }

  const reject = res => {
    screenProps.openModalError({
      body: () => (
        <Block p4 m4>
          <Text center middle>
            {res?.message || res || 'Beklenmedik hata oluştu'}
          </Text>
        </Block>
      ),
      onClose: () => {
        getMessages()
      },
    });
  }

  const getFormattedMessages = useCallback(() => {
    return data?.messages ?
      data?.messages.map(message => ({
        text: message.message,
        createdAt: new Date(Number(message.unix_time) * 1000),
        user: {
          _id: message.sender === "seller" ? chatInfo.seller_id : chatInfo.customer_id
        }
      })).reverse() : []
  }, [data, chatInfo])

  const getTitle = useCallback(() => {
    let user = chatInfo?.me === "seller" ? data?.customerUser : data?.sellerUser;
    if (user?.is_active === 1) {
      return (
        user?.name + " " + user?.surname
      )
    }
    return "Silinmiş Kullanıcı"
  }, [data, chatInfo])

  const renderInputToolbar = useCallback((props) => {
    let user = chatInfo?.me === "seller" ? data?.customerUser : data?.sellerUser;
    if (data?.blockType === "noBlock" && user?.is_active === 1) {
      return <InputToolbar {...props} />
    }
    else if (user?.is_active !== 1) {
      return <Text body2 primaryColor semibold style={styles.blockedMessage}>Kullanıcı üyeliği silinmiş, mesaj gönderemezsiniz.</Text>
    }
    else if (data?.blockType === "youBlockedUser") {
      return <Text body2 primaryColor semibold style={styles.blockedMessage}>Bu kullanıcıyı engellediniz mesaj gönderemezsiniz.</Text>
    } else if (data?.blockType === "userBlockedYou") {
      return <Text body2 primaryColor semibold style={styles.blockedMessage}>Bu kullanıcı sizi engelledi mesaj gönderemezsiniz.</Text>
    }
    return null
  }, [data, chatInfo])

  const renderAdInfo = useCallback(() => {
    if (data?.ad?.ad_title) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('CarDetail', { ad_code: data?.ad?.ad_code })}
          style={styles.header}>
          <View style={styles.headerLeftContent}>
            <Image source={{ uri: data?.ad?.thumb }} style={styles.headerImage} />
            <View style={{ flex: 1 }}>
              <Text headline semiBold>{data?.ad?.ad_title}</Text>
              <Text body2 primaryColor semibold>{data?.ad?.ad_price}</Text>
            </View>
          </View>
          <Icon
            name="arrow-right"
            size={20}
            color={BaseColor.primaryColor}
          />
        </TouchableOpacity>
      )
    }
    return null
  }, [data])


  useEffect(() => {
    getMessages()
  }, [])

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={getTitle()}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          );
        }}
        renderRightSecond={() => {
          if (data?.blockType !== "youBlockedUser") {
            return (
              <Icon
                name="ban"
                size={16}
                color={BaseColor.primaryColor}
              />
            );
          }
          return null
        }}
        renderRight={() => {
          if (data?.messages?.length > 0) {
            return (
              <Icon
                name="trash-alt"
                size={16}
                color={BaseColor.primaryColor}
              />
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRightSecond={() => {
          if (data?.blockType !== "youBlockedUser") {
            Alert.alert(
              "Bu kullanıcıyı engellerseniz ondan mesaj alamazsiniz",
              "",
              [
                {
                  text: "Devam Et",
                  onPress: () => blockUser()
                },
                {
                  text: "İptal",
                  onPress: () => { },
                  style: "cancel"
                }
              ]
            );
          }
        }}
        onPressRight={() => {
          if (data?.messages?.length > 0) {
            Alert.alert(
              "Mesajları silmek üzeresiniz ?",
              "",
              [
                {
                  text: "Devam Et",
                  onPress: () => deleteMessages()
                },
                {
                  text: "İptal",
                  onPress: () => { },
                  style: "cancel"
                }
              ]
            );
          }
        }}
      />
      {
        renderAdInfo()
      }
      <GiftedChat
        messages={getFormattedMessages()}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        placeholder="Mesajınızı buraya yazabilirsiniz"
        renderUsernameOnMessage={true}
        user={{
          _id: chatInfo?.me === "seller" ? data?.sellerUser?.id : data?.customerUser?.id
        }}
      />
    </SafeAreaView>

  )
}
export default compose(
  withProps(() => {
    const { loader, data } = useSelector(state => state.messages);
    const blockLoader = useSelector(state => state.blockedUsers.loader);
    return {
      data,
      loading: loader || blockLoader,
    };
  }),
  withLoadingScreen({}),
)(Messages);
