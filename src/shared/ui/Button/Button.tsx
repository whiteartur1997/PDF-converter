import { ButtonHTMLAttributes, FC } from 'react';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-[100px] rounded">
      {children}
    </button>
  );
};
