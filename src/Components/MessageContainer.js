/* eslint
    no-console: 0,
    no-param-reassign: 0,
    no-use-before-define: ["error", { "variables": false }],
    no-return-assign: 0,
    react/no-string-refs: 0,
    react/sort-comp: 0
*/

import PropTypes from 'prop-types';
import React from 'react';

// import { FlatList, View, StyleSheet, Keyboard } from 'react-native';

// import LoadEarlier from './LoadEarlier';
import Message from './Message';

export default class MessageContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.attachKeyboardListeners = this.attachKeyboardListeners.bind(this);
        // this.detatchKeyboardListeners = this.detatchKeyboardListeners.bind(this);

        // if (props.messages.length === 0) {
        //   this.attachKeyboardListeners(props);
        // }
    }

    // componentDidUpdate(prevProps) {
    //   if (this.props.messages.length === 0 && prevProps.messages.length > 0) {
    //     this.detatchKeyboardListeners();
    //   } else if (
    //     this.props.messages.length > 0 &&
    //     prevProps.messages.length === 0
    //   ) {
    //     this.attachKeyboardListeners(nextProps);
    //   }
    // }

    // attachKeyboardListeners(props) {
    //   Keyboard.addListener(
    //     'keyboardWillShow',
    //     props.invertibleScrollViewProps.onKeyboardWillShow
    //   );
    //   Keyboard.addListener(
    //     'keyboardDidShow',
    //     props.invertibleScrollViewProps.onKeyboardDidShow
    //   );
    //   Keyboard.addListener(
    //     'keyboardWillHide',
    //     props.invertibleScrollViewProps.onKeyboardWillHide
    //   );
    //   Keyboard.addListener(
    //     'keyboardDidHide',
    //     props.invertibleScrollViewProps.onKeyboardDidHide
    //   );
    // }

    // detatchKeyboardListeners() {
    //   Keyboard.removeListener(
    //     'keyboardWillShow',
    //     this.props.invertibleScrollViewProps.onKeyboardWillShow
    //   );
    //   Keyboard.removeListener(
    //     'keyboardDidShow',
    //     this.props.invertibleScrollViewProps.onKeyboardDidShow
    //   );
    //   Keyboard.removeListener(
    //     'keyboardWillHide',
    //     this.props.invertibleScrollViewProps.onKeyboardWillHide
    //   );
    //   Keyboard.removeListener(
    //     'keyboardDidHide',
    //     this.props.invertibleScrollViewProps.onKeyboardDidHide
    //   );
    // }

    // renderFooter = () => {
    //   if (this.props.renderFooter) {
    //     const footerProps = {
    //       ...this.props
    //     };
    //     return this.props.renderFooter(footerProps);
    //   }
    //   return null;
    // }

    // renderLoadEarlier = () => {
    //   if (this.props.loadEarlier === true) {
    //     const loadEarlierProps = {
    //       ...this.props
    //     };
    //     if (this.props.renderLoadEarlier) {
    //       return this.props.renderLoadEarlier(loadEarlierProps);
    //     }
    //     return <LoadEarlier {...loadEarlierProps} />;
    //   }
    //   return null;
    // }

    // scrollTo = (options) => {
    //   if (this.flatListRef) {
    //     this.flatListRef.scrollToOffset(options);
    //   }
    // }

    renderRow = (item, index) => {
        // console.log('MessageContainer - item', item);
        if (!item._id && item._id !== 0) {
            console.warn(
                'GiftedChat: `_id` is missing for message',
                JSON.stringify(item)
            );
        }
        if (!item.user) {
            if (!item.system) {
                console.warn(
                    'GiftedChat: `user` is missing for message',
                    JSON.stringify(item)
                );
            }
            item.user = {};
        }
        const { messages, ...restProps } = this.props;
        const previousMessage = messages[index + 1] || {};
        const nextMessage = messages[index - 1] || {};

        const messageProps = {
            ...restProps,
            key: item._id,
            currentMessage: item,
            previousMessage,
            nextMessage,
            position: item.user._id === this.props.user._id ? 'right' : 'left'
        };

        if (this.props.renderMessage) {
            return this.props.renderMessage(messageProps);
        }
        return <Message {...messageProps} key={item._id} />;
    };

    // renderHeaderWrapper() {
    //   return <div style={styles.headerWrapper}>{this.renderLoadEarlier()}</div>;
    // }

    RenderItemsList = (messages, index) => {
        const listItems = messages.map((message, index) => {
            // console.log(
            //   'MessageContainer - RenderItemsList - message,index',
            //   message,
            //   index
            // );
            return this.renderRow(message, index);
        });
        return <ul className={'giftedChatMessageList'}>{listItems}</ul>;
    };

    render() {
        // console.log('MessageContainer - this.props', this.props);

        if (this.props.messages.length === 0) {
            return <div style={styles.container} />;
        }
        // return (
        //   <div style={styles.container}>
        //     <FlatList7
        //       ref={ref => (this.flatListRef = ref)}
        //       extraData={this.props.extraData}
        //       keyExtractor={this.keyExtractor}
        //       enableEmptySections
        //       automaticallyAdjustContentInsets={false}
        //       inverted={this.props.inverted}
        //       data={this.props.messages}
        //       style={styles.listStyle}
        //       contentContainerStyle={styles.contentContainerStyle}
        //       renderItem={this.renderRow}
        //       {...this.props.invertibleScrollViewProps}
        //       ListFooterComponent={this.renderHeaderWrapper}
        //       ListHeaderComponent={this.renderFooter}
        //       {...this.props.listViewProps}
        //     />
        //   </div>
        // );
        return (
            <div
                className={'giftedChatMessagesContainer'}
                style={styles.container}>
                {this.RenderItemsList(this.props.messages)}
            </div>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    contentContainerStyle: {
        justifyContent: 'flex-end'
    },
    headerWrapper: {
        flex: 1
    },
    listStyle: {
        flex: 1
    }
};

MessageContainer.defaultProps = {
    messages: [],
    user: {},
    renderFooter: null,
    renderMessage: null,
    onLoadEarlier: () => {},
    inverted: true,
    loadEarlier: false,
    listViewProps: {},
    invertibleScrollViewProps: {}, // TODO: support or not?
    extraData: null
};

MessageContainer.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    renderFooter: PropTypes.func,
    renderMessage: PropTypes.func,
    renderLoadEarlier: PropTypes.func,
    onLoadEarlier: PropTypes.func,
    listViewProps: PropTypes.object,
    inverted: PropTypes.bool,
    loadEarlier: PropTypes.bool,
    invertibleScrollViewProps: PropTypes.object, // TODO: support or not?
    extraData: PropTypes.object
};
