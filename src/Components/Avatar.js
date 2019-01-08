import PropTypes from 'prop-types';
import React from 'react';
// import { StyleSheet, View, ViewPropTypes } from 'react-native';
import GiftedAvatar from './GiftedAvatar';
import { isSameUser, isSameDay } from './utils';
import stylePropType from 'react-style-proptype';

export default class Avatar extends React.PureComponent {
    renderAvatar() {
        if (this.props.renderAvatar) {
            const { renderAvatar, ...avatarProps } = this.props;
            return this.props.renderAvatar(avatarProps);
        }
        return (
            <GiftedAvatar
                avatarStyle={{
                    ...styles[this.props.position].image,
                    ...this.props.imageStyle[this.props.position]
                }}
                user={this.props.currentMessage.user}
                onPress={() =>
                    this.props.onPressAvatar &&
                    this.props.onPressAvatar(this.props.currentMessage.user)
                }
            />
        );
    }

    render() {
        const { renderAvatarOnTop, showAvatarForEveryMessage } = this.props;
        const messageToCompare = renderAvatarOnTop
            ? this.props.previousMessage
            : this.props.nextMessage;
        const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom';

        if (this.props.renderAvatar === null) {
            return null;
        }

        if (
            !showAvatarForEveryMessage &&
            isSameUser(this.props.currentMessage, messageToCompare) &&
            isSameDay(this.props.currentMessage, messageToCompare)
        ) {
            return (
                <div
                    style={[
                        styles[this.props.position].container,
                        this.props.containerStyle[this.props.position]
                    ]}>
                    <GiftedAvatar
                        avatarStyle={{
                            ...styles[this.props.position].image,
                            ...this.props.imageStyle[this.props.position]
                        }}
                    />
                </div>
            );
        }

        return (
            <div
                className={`giftedChatAvatarContainer-${this.props.position}`}
                style={[
                    styles[this.props.position].container,
                    styles[this.props.position][computedStyle],
                    this.props.containerStyle[this.props.position]
                ]}>
                {this.renderAvatar()}
            </div>
        );
    }
}

const styles = {
    left: {
        container: {
            marginRight: 8
        },
        onTop: {
            alignSelf: 'flex-start'
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18
        }
    },
    right: {
        container: {
            marginLeft: 8
        },
        onTop: {
            alignSelf: 'flex-start'
        },
        onBottom: {},
        image: {
            height: 36,
            width: 36,
            borderRadius: 18
        }
    }
};

Avatar.defaultProps = {
    renderAvatarOnTop: false,
    showAvatarForEveryMessage: false,
    position: 'left',
    currentMessage: {
        user: null
    },
    previousMessage: {},
    nextMessage: {},
    containerStyle: {},
    imageStyle: {},
    onPressAvatar: () => {}
};

Avatar.propTypes = {
    renderAvatarOnTop: PropTypes.bool,
    showAvatarForEveryMessage: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    onPressAvatar: PropTypes.func,
    renderAvatar: PropTypes.func,
    containerStyle: PropTypes.shape({
        left: stylePropType,
        right: stylePropType
    }),
    imageStyle: PropTypes.shape({
        left: stylePropType,
        right: stylePropType
    })
};
