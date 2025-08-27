import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";

export default class EkspertizPaketi extends Component {
    render() {
        const {
            style,
            name,
            checkIn,
            checkOut,
            price,
            total,
            onPress
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.nameContent}>
                    <Text body2 whiteColor semibold>
                        {name}
                    </Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={{ flex: 1 }}>
                        <Text caption2 whiteColor>
                            {name} / {price}
                        </Text>
                    </View>
                </View>
                <View style={styles.validContent}>
                    
                </View>
            </TouchableOpacity>
        );
    }
}

EkspertizPaketi.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    total: PropTypes.string,
    price: PropTypes.string,
    onPress: PropTypes.func
};

EkspertizPaketi.defaultProps = {
    style: {},
    name: "",
    checkIn: "",
    checkOut: "",
    total: "",
    price: "",
    onPress: () => {}
};
