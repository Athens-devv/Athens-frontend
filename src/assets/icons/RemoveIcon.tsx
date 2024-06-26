import { useDarkMode } from '@/store/darkMode';
import React from 'react';

type Props = {
  className?: string;
  onClick?: () => void;
  label?: string;
};

function RemoveIcon({
  className = '',
  onClick = () => {},
  label = 'X 아이콘',
}: Props) {
  const { darkMode } = useDarkMode();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={darkMode ? '#ffff' : '#282828'}
      className={className}
      onClick={onClick}
      aria-label={label}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

export default RemoveIcon;
