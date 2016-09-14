
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isDateValid(date) {
  return isDate(date) && !isNaN(date.getTime());
}

export function removeProps(component, propsToRemove) {
  const props = {};
  Object.keys(component.props).forEach(key => {
    if (! {}.hasOwnProperty.call(propsToRemove, key)) {
      props[key] = component.props[key];
    }
  });
  return props;
}