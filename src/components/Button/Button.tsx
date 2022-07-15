import classNames from 'classnames';

import styles from './Button.module.css';

const Button = ({
  children,
  size,
  inverse,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { className: string; size?: string; inverse?: boolean }) => {
  return (
    <button
      className={classNames(styles.Button, className, size, { inverse })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
