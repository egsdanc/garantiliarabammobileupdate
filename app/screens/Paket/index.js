import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {BaseColor} from '@config';
import {Header} from '@components';
import {
  Block,
  Button,
  Icon,
  Text as Txt,
  TouchableOpacity,
  Radio,
  XCard,
  SafeAreaView,
  BreadCrumb,
} from '@common';
import {set, adjust, lensProp, map, pipe, tap, omit, find, propEq} from 'ramda';
import {withAlertModal, compose, withHooks, withLoadingScreen} from '@hocs';
import {withProps} from '../../hocs';
import {usePaket} from '../../state/ducks/ucretsizIlanVer/PaketReducer';
const CardComponent = compose(
  withAlertModal,
  React.forwardRef,
)(
  (
    {
      more = 'lorem1',
      title = 'title1',
      subTitle = 'subTitle1',
      active = true,
      onActivateThis = () => {},
      openModal = () => {},
    },
    _,
  ) => {
    const bgColor = active ? BaseColor.primaryColor : BaseColor.whiteColor;
    const txtColor = active ? BaseColor.whiteColor : BaseColor.textPrimaryColor;
    return (
      <XCard
        style={{borderRadius: 5}}
        shadow={8}
        color={bgColor}
        m4
        p4
        onPress={onActivateThis}>
        <Block row right color="transparent">
          <TouchableOpacity
            color="transparent"
            p1
            flex={false}
            onPress={() =>
              openModal({
                disableCloseBtn: false,
                title,
                body: () => (
                  <Block>
                    <Txt p4>{more}</Txt>
                  </Block>
                ),
              })
            }>
            <Icon
              solid
              color="#0562ED"
              type="antdesign"
              name="questioncircle"
              size={15}
            />
          </TouchableOpacity>
        </Block>
        <Block row color="transparent" center>
          <Radio checked={active} color={BaseColor.primaryColor} />
          <Txt flex={1} mx4 color={txtColor}>
            {title}
          </Txt>
        </Block>
        <Block color="transparent">
          <Txt center color={txtColor}>
            {subTitle}
          </Txt>
        </Block>
      </XCard>
    );
  },
);
/** actıve updater */
const activeLens = lensProp('active');
const setActive = set(activeLens);
const setActiveToFalse = setActive(false);
const setActiveToTrue = setActive(true);
/** Page Component */
const Paket = React.forwardRef(({navigation, actions}, _) => {
  /** mount olunca photolari temizle */
  useEffect(() => {
    actions.resetPaket();
  }, [actions]);

  const [nodes, setNodes] = useState([
    {
      more: 'lorem1',
      title: 'title1',
      subTitle: 'subTitle1',
      value: 1,
      active: true,
    },
    {
      more: 'lorem2',
      title: 'title2',
      subTitle: 'subTitle2',
      value: 2,
      active: false,
    },
    {
      more: 'lorem3',
      title: 'title3',
      subTitle: 'subTitle3',
      value: 3,
      active: false,
    },
  ]);

  const activateThis = useCallback(
    index => () => {
      setNodes(
        compose(
          adjust(index, setActiveToTrue),
          map(setActiveToFalse),
        ),
      );
    },
    [setNodes],
  );

  const devamEt = useCallback(() => {
    const nextPage = () => navigation.navigate('CarDetail');
    pipe(
      find(propEq('active', true)),
      tap(actions.setPaket),
      tap(nextPage),
    )(nodes);
  }, [nodes, navigation, actions]);

  return (
    <SafeAreaView>
      <Header
        title="Ücretsiz İlan ver"
        subTitle="Galeriden Fotograf Yükleyin Yada Fotgraf Çekín"
        subStyle={{textAlign: 'center', margin: 0, padding: 0}}
        titleStyle={{textAlign: 'center', margin: 0, padding: 0}}
        styleCenter={{marginBottom: 0, paddingBottom: 0}}
        renderLeft={() => (
          <Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <BreadCrumb {...{navigation, activeKey: 'k11'}} />
      <ScrollView style={{flex: 2}}>
        <Block margin={0}>
          {nodes.map((item, index) => (
            <CardComponent
              {...item}
              key={JSON.stringify(omit(['active'], item))}
              onActivateThis={activateThis(index)}
            />
          ))}
        </Block>
      </ScrollView>
      <Block margin={[10, 20]} row space="between" flex={false}>
        <Button full onPress={devamEt}>
          Devam Et
        </Button>
      </Block>
    </SafeAreaView>
  );
});

export default compose(
  withProps(a => {
    const result = usePaket(a);
    return result;
  }),
  withLoadingScreen({}),
)(Paket);
