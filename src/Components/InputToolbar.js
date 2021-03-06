/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { StyleSheet, View, Keyboard, ViewPropTypes } from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';

export default class InputToolbar extends React.Component {
    constructor(props) {
        super(props);

        // this.keyboardWillShow = this.keyboardWillShow.bind(this);
        // this.keyboardWillHide = this.keyboardWillHide.bind(this);

        this.state = {
            // position: 'absolute'
            position: 'relative'
        };
    }

    // componentDidMount() {
    //   this.keyboardWillShowListener = Keyboard.addListener(
    //     'keyboardWillShow',
    //     this.keyboardWillShow
    //   );
    //   this.keyboardWillHideListener = Keyboard.addListener(
    //     'keyboardWillHide',
    //     this.keyboardWillHide
    //   );
    // }

    // componentWillUnmount() {
    //   this.keyboardWillShowListener.remove();
    //   this.keyboardWillHideListener.remove();
    // }

    // keyboardWillShow() {
    //   if (this.state.position !== 'relative') {
    //     this.setState({
    //       position: 'relative'
    //     });
    //   }
    // }

    // keyboardWillHide() {
    //   if (this.state.position !== 'absolute') {
    //     this.setState({
    //       position: 'absolute'
    //     });
    //   }
    // }

    renderActions() {
        if (this.props.renderActions) {
            return this.props.renderActions(this.props);
        } else if (this.props.onPressActionButton) {
            return <Actions {...this.props} />;
        }
        return null;
    }

    renderSend() {
        if (this.props.renderSend) {
            return this.props.renderSend(this.props);
        }
        return <Send {...this.props} />;
    }

    renderComposer() {
        if (this.props.renderComposer) {
            return this.props.renderComposer(this.props);
        }

        return <Composer {...this.props} />;
    }

    renderAccessory() {
        if (this.props.renderAccessory) {
            return (
                <div style={[styles.accessory, this.props.accessoryStyle]}>
                    {this.props.renderAccessory(this.props)}
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div
                className={'giftedChatInputToolbarContainer'}
                style={[
                    styles.container,
                    this.props.containerStyle,
                    { position: this.state.position }
                ]}>
                <div
                    className={'giftedChatInputToolbar'}
                    style={[styles.primary, this.props.primaryStyle]}>
                    {this.renderActions()}
                    {this.renderComposer()}
                    {this.renderSend()}
                </div>
                {this.renderAccessory()}
            </div>
        );
    }
}

const styles = {
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
        bottom: 0,
        left: 0,
        right: 0
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    accessory: {
        height: 44
    }
};

InputToolbar.defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    onPressActionButton: () => {}
};

InputToolbar.propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: stylePropType,
    primaryStyle: stylePropType,
    accessoryStyle: stylePropType
};
