/* eslint no-use-before-define: ["error", { "variables": false }], react-native/no-inline-styles: 0 */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import {
//   ActivityIndicator,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewPropTypes,
// } from 'react-native';
import Color from './Color';

export default class LoadEarlier extends React.Component {
    renderLoading() {
        if (this.props.isLoadingEarlier === false) {
            return (
                <div style={[styles.text, this.props.textStyle]}>
                    {this.props.label}
                </div>
            );
        }
        return (
            <div>
                <div
                    style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
                    {this.props.label}
                </div>
                {/*<ActivityIndicator
          color="white"
          size="small"
          style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
        />*/}
            </div>
        );
    }
    render() {
        return (
            <button
                style={[styles.container, this.props.containerStyle]}
                onClick={() => {
                    if (this.props.onLoadEarlier) {
                        this.props.onLoadEarlier();
                    }
                }}
                disabled={this.props.isLoadingEarlier === true}
                // accessibilityTraits="button"
            >
                <div style={[styles.wrapper, this.props.wrapperStyle]}>
                    {this.renderLoading()}
                </div>
            </button>
        );
    }
}

const styles = {
    container: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.defaultColor,
        borderRadius: 15,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        backgroundColor: Color.backgroundTransparent,
        color: Color.white,
        fontSize: 12
    },
    activityIndicator: {
        // marginTop: Platform.select({
        //   ios: -14,
        //   android: -16
        // })
        marginTop: 0
    }
};

LoadEarlier.defaultProps = {
    onLoadEarlier: () => {},
    isLoadingEarlier: false,
    label: 'Load earlier messages',
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    activityIndicatorStyle: {}
};

LoadEarlier.propTypes = {
    onLoadEarlier: PropTypes.func,
    isLoadingEarlier: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: stylePropType,
    wrapperStyle: stylePropType,
    textStyle: stylePropType,
    activityIndicatorStyle: stylePropType
};
