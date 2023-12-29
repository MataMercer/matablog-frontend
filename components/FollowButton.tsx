import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import ProtectComponent from '../auth/ProtectComponent';
import ErrorAlert from './ErrorAlert';
import { ApiError } from '../Types/IApiError';
import { useAxios } from '../auth/AxiosProvider';
import { followBlogRequest } from '../backend/repositories/BlogRepository';
import { Button } from './ui/Button';

type FollowButtonProps = {
  blogId: string;
  followed: boolean;
  onSuccess: () => void;
};

function FollowButton({ blogId, followed, onSuccess }: FollowButtonProps) {
  const axios = useAxios();
  const followBlogMutation = useMutation<undefined, ApiError>(
    () =>
      followBlogRequest(axios, blogId, !followed, {
        muted: false,
        notificationsEnabled: false,
      }),
    {
      onSuccess,
    }
  );
  return (
    <ProtectComponent>
      <div>
        <ErrorAlert error={followBlogMutation.error} />
        <Button
          type="button"
          onClick={() => {
            followBlogMutation.mutate();
          }}
          color={followed ? 'secondary' : 'primary'}
        >
          {followed ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </ProtectComponent>
  );
}

export default FollowButton;
