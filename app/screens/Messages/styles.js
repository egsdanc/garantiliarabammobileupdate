import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    headerLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    headerImage: {
        width: 48,
        height: 48,
        marginRight: 10
    },
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    footerText: {
        fontSize: 14,
        color: "#aaa"
    },
    blockedMessage:{
        width: '100%',
        paddingHorizontal: 20,
    }
});
