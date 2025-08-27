import hoistStatics from "hoist-non-react-statics";
import createElement from "../utils/createElement";
import {curry, merge} from "ramda";
import React from "react";
/**
 * @param {Object|Function} extraProps used to add extra props to compose
 */
// withProps:: Object -> Component -> Component
export const withProps = curry((extraProps, Component) => {
  extraProps = extraProps || {};
  const displayName = `withProps(${Component.displayName || Component.name})`;
  const C = React.forwardRef((remainingProps, ref) => {
    const innerRef = React.useRef(null);
    const attachRef = (el) => {
      innerRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else {
        ref = el;
      }
    };
    return createElement(
      Component,
      merge(
        {...remainingProps, ref: attachRef},
        typeof extraProps === "function"
          ? extraProps(remainingProps)
          : extraProps
      )
    );
  });
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /** used to copy static methods */
  return hoistStatics(C, Component);
});

export default withProps;

// import React from "react";
// import hoistStatics from "hoist-non-react-statics";

// export const getDisplayName = (Component) =>
//   Component.displayName ||
//   Component.name ||
//   (typeof Component === "string" && Component.length > 0
//     ? Component
//     : "Unknown");

// export const WithProps = (extraProps) => (WrappedComponent) => {
//   const Comp = (rest, ref) => {
//     let extra =
//       typeof extraProps === "function"
//         ? extraProps(rest, WrappedComponent, ref)
//         : extraProps;
//     let Props = {...rest, ref, ...extra};
//     return React.createElement(Props.$ || WrappedComponent, Props);
//   };
//   Comp.displayName = `withI18nextTranslation(${getDisplayName(
//     WrappedComponent
//   )})`;
//   Comp.WrappedComponent = WrappedComponent;
//   return hoistStatics(React.forwardRef(Comp), WrappedComponent);
// };

// // usage:
// const NormalComponent = (props) => <button {...props}>{props.title}</button>;

// export const ButtonWithModifiedTitle = WithProps((ownProps, _FComCopy, _) => ({
//   title: ownProps.title + " HEllo From callback "
// }))(NormalComponent);
