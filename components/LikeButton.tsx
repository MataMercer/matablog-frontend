import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { likePostRequest } from '../backend/repositories/PostRepository';
import ProtectComponent from '../auth/ProtectComponent';

type LikeButtonProps = {
  postId: string;
  liked: boolean;
  likeCount: number;
};

function LikeButton({ postId, liked, likeCount }: LikeButtonProps) {
  return (
    <>
      <ProtectComponent>
        <Button
          onClick={() => {
            likePostRequest(postId, !liked);
          }}
          variant="outline-danger"
        >
          <FontAwesomeIcon icon={liked ? faHeart : farHeart} />
        </Button>
      </ProtectComponent>
      {likeCount} Likes
    </>
  );
}

export default LikeButton;
