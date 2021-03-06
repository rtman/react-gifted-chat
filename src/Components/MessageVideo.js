import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import React from 'react';
// import { StyleSheet, View, ViewPropTypes } from 'react-native';
// import Video from 'react-native-video';

export default function MessageVideo({
    containerStyle,
    videoProps,
    videoStyle,
    currentMessage
}) {
    return (
        // eslint-disable-next-line no-use-before-define
        <View style={[styles.container, containerStyle]}>
            <Video
                {...videoProps}
                ref={(r) => {
                    this.player = r;
                }}
                source={{ uri: currentMessage.video }}
                style={videoStyle}
                resizeMode="cover"
                onBuffer={this.onBuffer}
                onLoadStart={this.onLoadStart}
                onLoad={this.onLoad}
            />
        </View>
    );
}

const styles = {
    container: {}
};

MessageVideo.defaultProps = {
    currentMessage: {
        // video: null,
    },
    containerStyle: {},
    videoStyle: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover'
    },
    videoProps: {}
};

MessageVideo.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: stylePropType,
    videoStyle: stylePropType,
    videoProps: PropTypes.object
};
