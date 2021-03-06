/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import moment from 'moment';

import Color from './Color';
import { TIME_FORMAT } from './Constant';

export default function Time(
     {
          position,
          containerStyle,
          currentMessage,
          timeFormat,
          textStyle,
          timeTextStyle
     },
     context
) {
     return (
          <div
               className={`giftedChatMessageTimeContainer-${position}`}
               style={[styles[position].container, containerStyle[position]]}>
               <div
                    className={`giftedChatMessageTime-${position}`}
                    style={[
                         styles[position].text,
                         textStyle[position],
                         timeTextStyle[position]
                    ]}>
                    {moment(currentMessage.createdAt)
                         .locale(context.getLocale())
                         .format(timeFormat)}
               </div>
          </div>
     );
}

const containerStyle = {
     marginLeft: 10,
     marginRight: 10,
     marginBottom: 5
};

const textStyle = {
     fontSize: 10,
     backgroundColor: 'transparent',
     textAlign: 'right'
};

const styles = {
     left: {
          container: {
               ...containerStyle
          },
          text: {
               color: Color.timeTextColor,
               ...textStyle
          }
     },
     right: {
          container: {
               ...containerStyle
          },
          text: {
               color: Color.white,
               ...textStyle
          }
     }
};

Time.contextTypes = {
     getLocale: PropTypes.func
};

Time.defaultProps = {
     position: 'left',
     currentMessage: {
          createdAt: null
     },
     containerStyle: {},
     textStyle: {},
     timeFormat: TIME_FORMAT,
     timeTextStyle: {}
};

Time.propTypes = {
     position: PropTypes.oneOf(['left', 'right']),
     currentMessage: PropTypes.object,
     containerStyle: PropTypes.shape({
          left: stylePropType,
          right: stylePropType
     }),
     textStyle: PropTypes.shape({
          left: stylePropType,
          right: stylePropType
     }),
     timeFormat: PropTypes.string,
     timeTextStyle: PropTypes.shape({
          left: stylePropType,
          right: stylePropType
     })
};
