import {StyleSheet} from "react-native";
import {BaseColor} from "../../config";

export default StyleSheet.create({
  default: {
    height: 40
  },
  outline: {
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: BaseColor.primaryColor
  },
  full: {
    width: "100%",
    alignSelf: "auto"
  },
  shadow: {
    shadowColor: BaseColor.blackColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  disabledTouch: {
    borderWidth: 1,
    borderColor: "#999999",
    backgroundColor: BaseColor.fieldColor
  }
});
