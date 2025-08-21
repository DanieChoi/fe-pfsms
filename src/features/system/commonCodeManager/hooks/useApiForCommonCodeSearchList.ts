import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { ApiErrorDto } from '@/types/interface/response';
import { GetCommonCodeListResponseDto } from '@/types/interface/response/system';
import { getCommonCodeSearchList } from '../api/getCommonCodeSearchList';

export function useApiForCommonCodeSearchList(
  options?: UseMutationOptions<GetCommonCodeListResponseDto, ApiErrorDto, null>
) {
  return useMutation({
    mutationKey: ['getCommonCodeSearchList'],
    mutationFn: getCommonCodeSearchList,
    onSuccess(data, variables, context) {
      console.log('API Response:', {
        code: data.rtnCode,
        message: data.rtnMessage,
        data: data.commonCodeList
      });

      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: ApiErrorDto, variables: null, context: unknown) => {
      options?.onError?.(error, variables, context);
    },
  });
}