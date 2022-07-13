import { useEffect, useState } from 'react';
import { ApiError } from 'next/dist/server/api-utils';
import { useQuery } from 'react-query';
import { IGetPostsForm } from '../../../Types/requestTypes/IGetPostsRequest';
import { IPage } from '../../../Types/IPage';
import IPost from '../../../Types/IPost';
import { searchPostsRequest } from '../../repositories/PostRepository';
import { useAxios } from '../../../auth/AxiosProvider';
import { ISearchPostsForm } from '../../../Types/requestTypes/ISearchPostsForm';

type UsePostsProps = {
  searchPostsForm: ISearchPostsForm;
};

function usePostsSearch({ searchPostsForm }: UsePostsProps) {
  const axios = useAxios();
  return useQuery<IPage<IPost>, ApiError>(
    ['postsSearch', searchPostsForm],
    () =>
      searchPostsRequest(axios, {
        page: searchPostsForm.page,
        query: searchPostsForm.query,
      })
  );
}

export default usePostsSearch;
