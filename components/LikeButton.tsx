import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { likePostRequest } from '../backend/repositories/PostRepository';
import ProtectComponent from '../auth/ProtectComponent';
import ErrorAlert from './ErrorAlert';
import { ApiError } from '../Types/IApiError';

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  likeCount: number;
  onSuccess: () => void;
};

function LikeButton({ postId, liked, likeCount, onSuccess }: LikeButtonProps) {
  const likePostMutation = useMutation<undefined, ApiError>(
    () => likePostRequest(postId, !liked),
    {
      onSuccess,
    }
  );
  return (
    <>
      <ProtectComponent>
        <div>
          <ErrorAlert error={likePostMutation.error} />
          <Button
            onClick={() => {
              likePostMutation.mutate();
            }}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={liked ? faHeart : farHeart} />
          </Button>
        </div>
      </ProtectComponent>
      {likeCount} Likes
    </>
  );
}

export default LikeButton;
