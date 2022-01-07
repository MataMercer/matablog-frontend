import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect } from 'react';
import { likePostRequest } from '../backend/repositories/PostRepository';
import ProtectComponent from '../auth/ProtectComponent';
import useGenericRequest from '../backend/hooks/util/useGenericRequest';
import ErrorAlert from './ErrorAlert';

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  likeCount: number;
  fetchPost: () => void;
};

function LikeButton({ postId, liked, likeCount, fetchPost }: LikeButtonProps) {
  const { callRequest, data, status, errors } = useGenericRequest<any>();

  const handleLikeClick = useCallback(() => {
    callRequest(likePostRequest(postId, !liked));
  }, [callRequest, postId, liked]);

  useEffect(() => {
    if (status === 'succeeded') {
      fetchPost();
    }
  }, [status, fetchPost]);

  return (
    <>
      <ProtectComponent>
        <div>
          <ErrorAlert errors={errors} />
          <Button onClick={handleLikeClick} variant="outline-danger">
            <FontAwesomeIcon icon={liked ? faHeart : farHeart} />
          </Button>
        </div>
      </ProtectComponent>
      {likeCount} Likes
    </>
  );
}

export default LikeButton;
