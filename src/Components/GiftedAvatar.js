/* eslint no-use-before-define: ["error", { "variables": false }], padded-blocks: 0 */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { Image, Text, TouchableOpacity, View } from 'react-native';
import Color from './Color';

const {
    carrot,
    emerald,
    peterRiver,
    wisteria,
    alizarin,
    turquoise,
    midnightBlue
} = Color;
// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class GiftedAvatar extends React.PureComponent {
    setAvatarColor() {
        const userName = this.props.user.name || '';
        const name = userName.toUpperCase().split(' ');
        if (name.length === 1) {
            this.avatarName = `${name[0].charAt(0)}`;
        } else if (name.length > 1) {
            this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
        } else {
            this.avatarName = '';
        }

        let sumChars = 0;
        for (let i = 0; i < userName.length; i += 1) {
            sumChars += userName.charCodeAt(i);
        }

        // inspired by https://github.com/wbinnssmith/react-user-avatar
        // colors from https://flatuicolors.com/
        const colors = [
            'carrot',
            'emerald',
            'peterRiver',
            'wisteria',
            'alizarin',
            'turquoise',
            'midnightBlue'
        ];

        this.avatarColor = colors[sumChars % colors.length];
    }

    renderAvatar() {
        if (typeof this.props.user.avatar === 'function') {
            return this.props.user.avatar();
        } else if (typeof this.props.user.avatar === 'string') {
            return (
                <img
                    // src={{ uri: this.props.user.avatar }}
                    src={this.props.user.avatar}
                    style={[styles.avatarStyle, this.props.avatarStyle]}
                />
            );
        } else if (typeof this.props.user.avatar === 'number') {
            return (
                <img
                    // source={this.props.user.avatar}
                    src={this.props.user.avatar}
                    style={[styles.avatarStyle, this.props.avatarStyle]}
                />
            );
        }
        return null;
    }

    renderInitials() {
        return (
            <div
                className={'giftedChatGiftedAvatarInitials'}
                style={[styles.textStyle, this.props.textStyle]}>
                {this.avatarName}
            </div>
        );
    }

    render() {
        if (!this.props.user.name && !this.props.user.avatar) {
            // render placeholder
            return (
                <div
                    style={[
                        styles.avatarStyle,
                        styles.avatarTransparent,
                        this.props.avatarStyle
                    ]}
                    // accessibilityTraits="image"
                />
            );
        }
        if (this.props.user.avatar) {
            return (
                <button
                    disabled={!this.props.onPress}
                    onClick={() => {
                        const { onPress, ...other } = this.props;
                        if (this.props.onPress) {
                            this.props.onPress(other);
                        }
                    }}
                    // accessibilityTraits="image">
                >
                    {this.renderAvatar()}
                </button>
            );
        }

        this.setAvatarColor();

        return (
            <div className={`giftedChatGiftedAvatar ${this.avatarColor}`}>
                <button
                    disabled={!this.props.onPress}
                    onClick={() => {
                        const { onPress, ...other } = this.props;
                        if (this.props.onPress) {
                            this.props.onPress(other);
                        }
                    }}
                    className={'giftedChatButton'}
                    style={[
                        styles.avatarStyle,
                        { backgroundColor: this.avatarColor },
                        this.props.avatarStyle
                    ]}
                    // accessibilityTraits="image"
                >
                    {this.renderInitials()}
                </button>
            </div>
        );
    }
}

const styles = {
    avatarStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20
    },
    avatarTransparent: {
        backgroundColor: Color.backgroundTransparent
    },
    textStyle: {
        color: Color.white,
        fontSize: 16,
        backgroundColor: Color.backgroundTransparent,
        fontWeight: '100'
    }
};

GiftedAvatar.defaultProps = {
    user: {
        name: null,
        avatar: null
    },
    onPress: null,
    avatarStyle: {},
    textStyle: {}
};

GiftedAvatar.propTypes = {
    user: PropTypes.object,
    onPress: PropTypes.func,
    avatarStyle: stylePropType,
    textStyle: stylePropType
};
