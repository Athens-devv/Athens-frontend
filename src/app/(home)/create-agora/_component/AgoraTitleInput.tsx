'use client';

import { useCreateAgora } from '@/store/create';
import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

function AgoraTitleInput() {
  const [input, setInput] = useState<string>('');
  const { setTitle } = useCreateAgora(useShallow((state) => ({ setTitle: state.setTitle })));

  const changeInput:ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setInput(() => {
      setTitle(e.target.value);
      return e.target.value;
    });
  }, [setTitle]);

  return (
    <input
      aria-label="생성할 아고라 주제 입력창"
      type="text"
      value={input}
      onChange={changeInput}
      placeholder="토론 할 주제를 입력해주세요."
      className="placeholder:text-athens-gray-thick w-full p-0.5rem text-sm border-1 border-gray-300 rounded-md dark:bg-dark-light-300 dark:placeholder:text-white dark:placeholder:text-opacity-85 dark:border-0 dark:text-white"
    />
  );
}

export default React.memo(AgoraTitleInput);