import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { likePostRequest } from '../backend/repositories/PostRepository';
import ProtectComponent from '../auth/ProtectComponent';
import ErrorAlert from './ErrorAlert';
import { ApiError } from '../Types/IApiError';
import { useAxios } from '../auth/AxiosProvider';
import { SLikeButton } from './styles/Button.styled';

const SLikeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  likeCount: number;
  onSuccess: () => void;
};

function LikeButton({ postId, liked, likeCount, onSuccess }: LikeButtonProps) {
  const axios = useAxios();
  const likePostMutation = useMutation<undefined, ApiError>(
    () => likePostRequest(axios, postId, !liked),
    {
      onSuccess,
    }
  );
  return (
    <SLikeButtonContainer>
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
      {likeCount} Likes
    </SLikeButtonContainer>
  );
}

export default LikeButton;
