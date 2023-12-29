import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Link from 'next/link';
import { likePostRequest } from '../backend/repositories/PostRepository';
import ProtectComponent from '../auth/ProtectComponent';
import ErrorAlert from './ErrorAlert';
import { ApiError } from '../Types/IApiError';
import { useAxios } from '../auth/AxiosProvider';
import { SLikeButton } from './ui/Button';
import { useAuth } from '../auth/AuthContext';
import useLikes from '../backend/hooks/blog/useLikes';

const SLikeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

type LikeIconProps = {
  blogId: string;
  postId: string;
  onSuccess: () => void;
};

function LikeIcon({ blogId, postId, onSuccess }: LikeIconProps) {
  const axios = useAxios();
  const { data: likes, status, error } = useLikes({ blogId });

  const liked = !!likes?.content.find((it) => it.postId === postId);
  const likePostMutation = useMutation<undefined, ApiError>(
    () => likePostRequest(axios, postId, !liked),
    {
      onSuccess,
    }
  );
  return (
    <ProtectComponent>
      <div>
        <ErrorAlert error={likePostMutation.error} />
        <SLikeButton
          type="button"
          onClick={() => {
            likePostMutation.mutate();
          }}
        >
          <FontAwesomeIcon icon={liked ? faHeart : farHeart} />
        </SLikeButton>
      </div>
    </ProtectComponent>
  );
}

type LikeButtonProps = {
  postId: string;
  likeCount: number;
  onSuccess: () => void;
};

function LikeButton({ postId, likeCount, onSuccess }: LikeButtonProps) {
  const { user } = useAuth();

  return (
    <SLikeButtonContainer>
      {/* i hate this code but what am i gonna do? */}
      {user ? (
        <LikeIcon
          postId={postId}
          blogId={user?.activeBlog.id}
          onSuccess={onSuccess}
        />
      ) : null}

      <Link href={`/post/${postId}/likes`}>{likeCount} Likes</Link>
    </SLikeButtonContainer>
  );
}

export default LikeButton;
