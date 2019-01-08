/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
// import Lightbox from 'react-native-lightbox';

export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage
}) {
  return (
    <div style={[styles.container, containerStyle]}>
      <img
        {...imageProps}
        style={[styles.image, imageStyle]}
        // source={{ uri: currentMessage.image }}
        src={currentMessage.image}
      />
    </div>
  );
}

/*
      <Lightbox
        activeProps={{
          style: styles.imageActive,
        }}
        {...lightboxProps}
      >
        <img
          {...imageProps}
          style={[styles.image, imageStyle]}
          // source={{ uri: currentMessage.image }}
          src={currentMessage.image}
        />
      </Lightbox>
*/

const styles = {
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover'
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain'
  }
};

MessageImage.defaultProps = {
  currentMessage: {
    image: null
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {}
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: stylePropType,
  imageStyle: stylePropType,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
