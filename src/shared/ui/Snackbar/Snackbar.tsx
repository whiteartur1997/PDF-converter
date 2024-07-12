import { FC } from 'react';

interface Props {
  message: string;
  onClose: () => void;
}

export const Snackbar: FC<Props> = ({ message, onClose }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-md fixed bottom-4 right-4 flex justify-between items-center">
      {message}
      <button className="text-white" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
