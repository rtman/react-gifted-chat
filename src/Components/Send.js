/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';

export default function Send({
    text,
    containerStyle,
    onSend,
    children,
    textStyle,
    label,
    alwaysShowSend
}) {
    if (alwaysShowSend || text.trim().length > 0) {
        return (
            <button
                testID="send"
                // accessible
                // accessibilityLabel="send"
                className={'giftedChatSendButton'}
                style={[styles.container, containerStyle]}
                onClick={() => {
                    onSend({ text: text.trim() }, true);
                }}
                // accessibilityTraits="button"
            >
                <div className={'giftedChatSendText'}>
                    {children || (
                        <div style={[styles.text, textStyle]}>{label}</div>
                    )}
                </div>
            </button>
        );
    }
    return <div />;
}

const styles = {
    container: {
        height: 44,
        justifyContent: 'flex-end'
    },
    text: {
        color: Color.defaultBlue,
        fontWeight: '600',
        fontSize: 17,
        backgroundColor: Color.backgroundTransparent,
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 10
    }
};

Send.defaultProps = {
    text: '',
    onSend: () => {},
    label: 'Send',
    containerStyle: {},
    textStyle: {},
    children: null,
    alwaysShowSend: false
};

Send.propTypes = {
    text: PropTypes.string,
    onSend: PropTypes.func,
    label: PropTypes.string,
    containerStyle: stylePropType,
    textStyle: stylePropType,
    children: PropTypes.element,
    alwaysShowSend: PropTypes.bool
};
