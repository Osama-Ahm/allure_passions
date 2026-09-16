// Joins class names, skipping falsy values: cx('a', isOn && 'b') -> 'a b'
export default function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}
