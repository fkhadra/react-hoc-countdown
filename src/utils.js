
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isDateValid(date) {
  return isDate(date) && isNaN(date.getTime());
}

export function extractProps(component) {
  const props = {};
  Object.keys(component.props).forEach(key => {
    if (!{}.hasOwnProperty.call(component.defaultProps, key)) {
      props[key] = component.props[key];
    }
  });
  return props;
}