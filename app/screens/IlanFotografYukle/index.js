import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {Header} from '@components';
import {
  Block,
  Button,
  Icon,
  Selector,
  StepProgress,
  SafeAreaView,
} from '@common';

import {setImages_action} from '@state/ducks/IlanVer';
import ImagePicker from 'react-native-image-crop-picker';
import {BaseColor} from '@config';
import {adsCreate_action} from '@state/ducks/adsCreate';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import Item from './item';
export default function AdPhotoUpload({navigation}) {
  const [tempPhotos, setTempPhotos] = useState([]);
  const dispatch = useDispatch();

  const addAndFilter = (oldPhotos = [], newPhotos = []) =>
    oldPhotos
      .filter(
        photo => newPhotos.findIndex(item => photo.path === item.path) === -1,
      )
      .concat(newPhotos.map(item => ({...item, checked: true})));
  const onSelect = useCallback(
    photo => {
      setTempPhotos(addAndFilter(tempPhotos, photo));
    },
    [setTempPhotos, tempPhotos],
  );
  const showError = err => {
    Alert.alert('HATA', 'Lutfen Fotograf seciniz', [{text: 'Tamam'}]);
  };
  const _continue = () => {
    if (tempPhotos.length > 0) {
      dispatch(setImages_action(tempPhotos));
      navigation.navigate('IlanKonumSecme');
    } else {
      showError({title: 'text'});
    }
  };
  const upload = () => {
    const data = {
      metaData: null,
      photos: [...tempPhotos.map(i => `data:${i.mime};base64,${i.data}`)],
    };
    dispatch(adsCreate_action(data));
  };
  const onEdit = useCallback(
    (item, index) => {
      setTempPhotos(photo => photo.map((t, idx) => (idx === index ? item : t)));
    },
    [setTempPhotos],
  );
  const onDelete = useCallback(
    index => {
      setTempPhotos(t => t.filter((i, idx) => idx !== index));
    },
    [setTempPhotos],
  );

  const RenderItem = useCallback(
    ({item, index}) => (
      <Item item={item} index={index} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onEdit, onDelete],
  );
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
      <FlatList
        data={tempPhotos || []}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
        numColumns={3}
        keyExtractor={item => item.id}
      />
      <Block margin={[10, 10]} flex={false}>
        <PhotoChooserBtn onSelect={onSelect} />
      </Block>
      <Block margin={[10, 10]} row space="between" flex={false}>
        <StepProgress step={2} />
        <Button onPress={_continue}>Devam Et</Button>
      </Block>
    </SafeAreaView>
  );
}
const PhotoChooserBtn = ({onSelect}) => {
  const [visible, setVisible] = useState(false);
  const options = {
    mediaType: 'photo',
    includeBase64: true,
    multiple: true,
    maxFiles: 15,
  };
  const openGallery = useCallback(() => {
    ImagePicker.openPicker(options).then(images => {
      const _images = Array.isArray(images)
        ? images.map((i, idx) => ({...i, id: idx.toString()}))
        : null;
      onSelect(Array.isArray(_images) ? _images : [_images]);
      setVisible(a => !a);
    });
  }, [options, onSelect, setVisible]);
  const openCamera = useCallback(() => {
    ImagePicker.openCamera(options).then(images => {
      onSelect(Array.isArray(images) ? images : [images]);
      setVisible(a => !a);
    });
  }, [options, onSelect, setVisible]);
  return (
    <>
      <Selector
        onCloseModal={() => setVisible(a => !a)}
        title={'Nerden Yüklemek İstersiniz?'}
        isVisible={visible}
        cancel="İptal"
        list={[
          {
            title: 'Fotoğraf Çek',
            onPress: openCamera,
          },
          {
            title: 'Galeriden Seç',
            onPress: openGallery,
          },
        ]}
      />
      <Button
        icon={
          <Icon solid color="white" type="entypo" name="picasa" size={20} />
        }
        onPress={() => setVisible(a => !a)}>
        Fotoğraf Yukle
      </Button>
    </>
  );
};
