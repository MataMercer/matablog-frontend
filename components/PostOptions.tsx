import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProtectComponent from '../auth/ProtectComponent';
import IBlog from '../Types/IBlog';
import { useMutation } from 'react-query';
import { deletePostRequest } from '../backend/repositories/PostRepository';
import { ApiError } from '../Types/IApiError';
import { useAxios } from '../auth/AxiosProvider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from './ui/Dropdown';

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
        <DropdownToggle>
          <FontAwesomeIcon icon={faEllipsisH} />
        </DropdownToggle>
        <DropdownMenu>
          <Link href={`/post/update/${postId}`} passHref>
            <DropdownItem>Edit</DropdownItem>
          </Link>
          <DropdownItem
            onClick={() => {
              deletePostMutation.mutate();
            }}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ProtectComponent>
  );
}
