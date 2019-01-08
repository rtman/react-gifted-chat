/* eslint no-use-before-define: ["error", { "variables": false }] */

import React from 'react';
import stylePropType from 'react-style-proptype';
// import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Color from './Color';

export default function SystemMessage({
    currentMessage,
    containerStyle,
    wrapperStyle,
    textStyle
}) {
    return (
        <div
            className={'giftedChatSystemMessageContainer'}
            style={[styles.container, containerStyle]}>
            <div
                className={'giftedChatSystemMessageWrapper'}
                style={[styles.wrapper, wrapperStyle]}>
                <div
                    className={'giftedChatSystemMessageText'}
                    style={[styles.text, textStyle]}>
                    {currentMessage.text}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        marginBottom: 10
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.defaultColor,
        fontSize: 12,
        fontWeight: '300'
    }
};

SystemMessage.defaultProps = {
    currentMessage: {
        system: false
    },
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {}
};

SystemMessage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: stylePropType,
    wrapperStyle: stylePropType,
    textStyle: stylePropType
};
