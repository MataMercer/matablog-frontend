import { useEffect, useState } from 'react';
import { ApiError } from 'next/dist/server/api-utils';
import { useQuery } from 'react-query';
import { IPostSearchForm } from '../../Types/requestTypes/IPostSearchRequest';
import { IPage } from '../../Types/IPage';
import IPost from '../../Types/IPost';
import { getPostsRequest } from '../repositories/PostRepository';

type UsePostsProps = {
  postSearchForm: IPostSearchForm;
};

function usePosts({ postSearchForm }: UsePostsProps) {
  return useQuery<IPage<IPost>, ApiError>(['posts', postSearchForm], () =>
    getPostsRequest({
      page: postSearchForm.page,
      category: postSearchForm.category,
      blogName: postSearchForm.blogName,
    })
  );
}

export default usePosts;
