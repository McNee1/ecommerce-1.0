import { ButtonHTMLAttributes } from 'react';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton = ({ children, className, ...rest }: AppButtonProps) => {
  return (
    <button
      className={['btn ', className].join('')}
      {...rest}
    >
      {children}
    </button>
  );
};
