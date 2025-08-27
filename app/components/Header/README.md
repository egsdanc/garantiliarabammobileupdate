# Header Component

Modern React Native standartlarına uygun Header component'i.

## Özellikler

- ✅ Functional Component (Hooks kullanımı)
- ✅ useEffect ile lifecycle management
- ✅ TypeScript desteği
- ✅ Modern prop validation
- ✅ StyleSheet kullanımı
- ✅ BaseColor theme sistemi
- ✅ Güvenli render fonksiyonları
- ✅ Native Text component kullanımı

## Kullanım

```jsx
import Header from '@components/Header';

const MyScreen = () => {
  return (
    <Header
      title="Başlık"
      subTitle="Alt başlık"
      renderLeft={() => <Icon name="arrow-left" />}
      renderRight={() => <Icon name="menu" />}
      onPressLeft={() => navigation.goBack()}
      onPressRight={() => navigation.openDrawer()}
    />
  );
};
```

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `title` | string | 'Title' | Header başlığı |
| `subTitle` | string | '' | Alt başlık |
| `white` | boolean | false | Beyaz tema |
| `barStyle` | string | 'dark-content' | Status bar stili |
| `renderLeft` | function \| null | null | Sol buton render fonksiyonu (opsiyonel) |
| `renderRight` | function \| null | null | Sağ buton render fonksiyonu (opsiyonel) |
| `renderRightSecond` | function \| null | null | İkinci sağ buton render fonksiyonu (opsiyonel) |
| `onPressLeft` | function | () => {} | Sol buton tıklama fonksiyonu |
| `onPressRight` | function | () => {} | Sağ buton tıklama fonksiyonu |
| `onPressRightSecond` | function | () => {} | İkinci sağ buton tıklama fonksiyonu |

## Stil Props

| Prop | Tip | Açıklama |
|------|-----|----------|
| `style` | ViewStyle | Ana container stili |
| `styleLeft` | ViewStyle | Sol bölüm stili |
| `styleCenter` | ViewStyle | Orta bölüm stili |
| `styleRight` | ViewStyle | Sağ bölüm stili |
| `styleRightSecond` | ViewStyle | İkinci sağ bölüm stili |
| `titleStyle` | TextStyle | Başlık metni stili |
| `subStyle` | TextStyle | Alt başlık metni stili |

## Güvenlik Özellikleri

- ✅ Render fonksiyonları opsiyonel
- ✅ Fonksiyon tipi kontrolü
- ✅ Null/undefined kontrolü
- ✅ Güvenli fonksiyon çağrısı
- ✅ Native component kullanımı

## Modern React Native Best Practices

1. **Functional Components**: Class component yerine functional component kullanımı
2. **Hooks**: useEffect ile lifecycle management
3. **TypeScript**: Tip güvenliği için TypeScript desteği
4. **StyleSheet**: Performans için StyleSheet kullanımı
5. **Theme System**: BaseColor ile tutarlı renk sistemi
6. **Prop Validation**: PropTypes ile prop validation
7. **Clean Code**: Temiz ve okunabilir kod yapısı
8. **Error Prevention**: Güvenli prop handling
9. **Native Components**: React Native'in kendi component'lerini kullanma

## Güncellemeler

- ✅ Class component → Functional component
- ✅ componentDidMount/componentWillUnmount → useEffect
- ✅ Inline styles → StyleSheet
- ✅ PropTypes → TypeScript interface
- ✅ Modern prop defaults
- ✅ Theme system integration
- ✅ Güvenli render fonksiyonları
- ✅ Error prevention
- ✅ Native Text component kullanımı
- ✅ Import sorunları çözüldü

## Son Değişiklikler

- **Text Component**: Custom Text component yerine React Native'in native Text component'i kullanılıyor
- **Import Güvenliği**: Import sorunları önlendi
- **Error Handling**: Daha güvenli error handling 