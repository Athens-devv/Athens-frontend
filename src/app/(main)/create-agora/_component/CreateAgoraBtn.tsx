'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useCreateAgora } from '@/store/create';
import { useRouter } from 'next/navigation';
import { useAgora } from '@/store/agora';
import Loading from '@/app/_components/atoms/loading';
import {
  MAX_DISCUSSION_TIME,
  MIN_DISCUSSION_TIME,
} from '@/constants/createAgora';
import showToast from '@/utils/showToast';
import { postCreateAgora } from '../../_lib/postCreateAgora';

type Agora = {
  title: string;
  category: string;
  color: string;
  capacity: number;
  duration: number | null;
};

function CreateAgoraBtn() {
  const [createAgora, setCreateAgora] = useState<Agora>({
    title: '',
    category: '1',
    color: 'bg-agora-point-color1',
    capacity: 5,
    duration: 60,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const info = {
        ...createAgora,
      };
      return postCreateAgora(info);
    },
    onSuccess: async (response) => {
      const { setSelectedAgora } = useAgora.getState();
      if (response) {
        setSelectedAgora({
          id: response.id,
          title: createAgora.title,
          status: 'QUEUED',
        });

        const { reset } = useCreateAgora.getState();
        reset();

        setIsLoading(false);
        router.push(`/flow/enter-agora/${response.id}`);
      } else {
        showToast('아고라 생성에 실패했습니다.', 'error');
        setIsLoading(false);
      }
    },
    onError: () => {
      showToast('아고라 생성에 실패했습니다.', 'error');
      setIsLoading(false);
    },
  });

  const handleClick = () => {
    const { title, category, color, capacity, duration } =
      useCreateAgora.getState();

    if (
      title.trim() === '' ||
      !color ||
      !category ||
      !duration ||
      duration > MAX_DISCUSSION_TIME ||
      duration < MIN_DISCUSSION_TIME
    ) {
      showToast('입력값을 확인해주세요.', 'error');
      return;
    }

    setCreateAgora({
      title,
      category,
      color,
      capacity,
      duration,
    });

    setIsLoading(true);
    mutation.mutate();
  };
  useEffect(() => {
    return () => {
      const { reset } = useCreateAgora.getState();
      reset(); // 언마운트시 초기화
    };
  }, []);
  return (
    <div className="mt-1rem w-full">
      <button
        onClick={handleClick}
        type="button"
        disabled={isLoading}
        aria-label="아고라 생성하기"
        className="w-full bg-athens-main text-white font-semibold pt-10 pb-10 under-mobile:pt-10 under-mobile:pb-10 under-mobile:mt-1rem text-base rounded-lg"
      >
        {isLoading ? <Loading w="16" h="16" /> : '아고라 생성'}
      </button>
    </div>
  );
}

export default React.memo(CreateAgoraBtn);
