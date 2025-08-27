import { ViewStyle, TextStyle } from 'react-native';

export interface HeaderProps {
    style?: ViewStyle | ViewStyle[];
    styleLeft?: ViewStyle | ViewStyle[];
    styleCenter?: ViewStyle | ViewStyle[];
    styleRight?: ViewStyle | ViewStyle[];
    styleRightSecond?: ViewStyle | ViewStyle[];
    title?: string;
    subTitle?: string;
    onPressLeft?: () => void;
    onPressRight?: () => void;
    onPressRightSecond?: () => void;
    white?: boolean;
    subStyle?: TextStyle | TextStyle[];
    titleStyle?: TextStyle | TextStyle[];
    renderLeft?: (() => React.ReactNode) | null;
    renderRight?: (() => React.ReactNode) | null;
    renderRightSecond?: (() => React.ReactNode) | null;
    barStyle?: 'default' | 'light-content' | 'dark-content';
} 