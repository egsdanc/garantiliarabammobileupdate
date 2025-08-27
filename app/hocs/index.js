export { createElement } from './utils/createElement';
export {
  isClassComponent,
  isFunctionComponent,
  isReactComponent,
  isElement,
  isDOMTypeElement,
  isCompositeTypeElement,
  renderer,
} from './utils/isClassComponent';
export { withColors } from './withColors';
export { withMarginPaddings } from './withMarginPaddings';
export { withShadows } from './withShadows';
export { withFont } from './withFont';
export { withStyles } from './withStyles';
export { withProps } from './withProps';
export { withTranslateFactory } from './withTranslateFactory';
export { withHooksFactory } from './withHooksFactory';
export { withSkeletone } from './withSkeletone';
export { compose, curry } from 'ramda';
export { withLoadingScreen } from './withLoadingScreen';
export { withAlertModal } from './withAlertModal';
export { withErrorHandler } from './withErrorHandler';
export { withSecureText } from './withSecureText';
export { withMask } from './withMask';
export { withHideFormElement } from './withHideFormElement';
export { withDateFormatFormElement } from './withDateFormatFormElement';
export { withPagination } from './withPagination';
export default {};
/** imports */
import { withHooksFactory } from './withHooksFactory';
import { withErrorHandler } from './withErrorHandler';
import { compose } from 'ramda';
import { Hooks } from '@duck';
export const withHooks = config =>
  compose(
    withHooksFactory(Hooks)(config),
    withErrorHandler,
  );
