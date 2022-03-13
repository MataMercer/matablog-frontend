import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProtectComponent from '../auth/ProtectComponent';
import IBlog from '../Types/IBlog';
import { useMutation } from 'react-query';
import { deletePostRequest } from '../backend/repositories/PostRepository';
import { ApiError } from '../Types/IApiError';
import { useAxios } from '../auth/AxiosProvider';

type PostOptionsProps = {
  blog: IBlog;
  postId: string;
  onSuccess: () => void;
};
export default function PostOptions({
  blog,
  postId,
  onSuccess,
}: PostOptionsProps) {
  const axios = useAxios();
  const deletePostMutation = useMutation<undefined, ApiError>(
    () => deletePostRequest(axios, postId),
    { onSuccess }
  );
  return (
    <ProtectComponent requiredAuthority="POST_UPDATE" componentBlog={blog}>
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          <FontAwesomeIcon icon={faEllipsisH} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Link href={`/post/update/${postId}`} passHref>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Link>
          <Dropdown.Item
            onClick={() => {
              deletePostMutation.mutate();
            }}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ProtectComponent>
  );
}
