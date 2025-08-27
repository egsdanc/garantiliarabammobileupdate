import React, { useEffect } from 'react';
import {
    Image, SafeAreaView, ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Text,
    Button,
    Header,
    Icon,
} from '@components';
import {BaseColor} from "../../config";

const GarantiAIMyExpertises = ({navigation}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header
                title="Yapay Zeka Ekspertiz"
                renderLeft={() => {
                    return (
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={BaseColor.primaryColor}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    }
});

export default GarantiAIMyExpertises;
