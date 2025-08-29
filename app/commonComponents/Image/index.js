import React from "react";
import { StyleSheet, Image as RNImage } from "react-native";
import PropTypes from "prop-types";

export const Image = ({ style, resizeMode = "cover", ...rest }) => {
  return (
    <RNImage
      style={StyleSheet.flatten([style && style])}
      resizeMode={resizeMode}
      {...rest}
    />
  );
};

Image.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resizeMode: PropTypes.oneOf(["cover", "contain", "stretch", "center", "repeat"])
};

Image.defaultProps = {
  style: {},
  resizeMode: "cover"
};

export default Image;