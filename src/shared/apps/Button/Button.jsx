import classNames from 'classnames/bind'
import * as styles from './Button.module.css'

const cx = classNames.bind(styles);

const Button = ({ children, className, fluid, size, ...restProps }) => (
  <button
    className={cx('root', size, { fluid })}
    {...restProps}
  >
    {children}
  </button>
)

export default Button
