import { ButtonHTMLAttributes } from 'react';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton = ({ className, children, ...rest }: AppButtonProps) => {
  return (
    <button
      className={['btn btn-', className].join('')}
      {...rest}
    >
      {children}
    </button>
  );
};
