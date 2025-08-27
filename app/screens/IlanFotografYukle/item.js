import React, {useState, useCallback, memo} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './styles';
import {Image} from '@common';
import {ActionSheet} from '@components';
import ImagePicker from 'react-native-image-crop-picker';

const Item = memo(({item, index, onDelete, onEdit}) => {
  const [visible, setVisible] = useState(false);

  const onClose = useCallback(() => setVisible(false), [setVisible]);

  const onSelect = useCallback(
    selectIndex => {
      if (selectIndex === 0) {
        onDelete(index);
      } else if (selectIndex === 1) {
        ImagePicker.openCropper({
          path: item.path,
          width: 400,
          height: 300,
          cropping: true,
          includeBase64: true,
        }).then(_image => {
          onEdit(_image, index);
        });
      }
    },
    [onDelete, index, item, onEdit],
  );
  return (
    <>
      <TouchableOpacity
        style={styles.photoWrapper}
        onPress={() => setVisible(true)}>
        <Image
          source={{uri: `data:${item.mime};base64,${item.data}`}}
          style={styles.image}
        />
      </TouchableOpacity>
      <ActionSheet
        visible={visible}
        onClose={onClose}
        title="Islem Seciniz"
        onSave={onSelect}
        list={[
          {
            title: 'Sil',
            icon: 'trash',
            id: '0',
          },
          {
            title: 'Duzenle',
            icon: 'edit',
            id: '1',
          },
        ]}
        type="bottomSheet"
      />
    </>
  );
});

export default Item;
