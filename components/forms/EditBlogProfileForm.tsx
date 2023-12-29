import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Toast from 'react-bootstrap/Toast';
import { useAuth } from '../../auth/AuthContext';
import { useAxios } from '../../auth/AxiosProvider';
import useBlog from '../../backend/hooks/blog/useBlog';
import { editBlogProfileRequest } from '../../backend/repositories/BlogRepository';
import appconfig from '../../config/appconfig';
import { ApiError } from '../../Types/IApiError';
import IBlogProfile from '../../Types/IBlogProfile';
import { IBlogProfileRequest } from '../../Types/requestTypes/IBlogProfileRequest';
import UploadInput, { FileInput } from '../inputs/UploadInput';
import { Button } from '../ui/Button';

type EditBlogProfileFormData = {
  editBlogProfileRequest: IBlogProfileRequest;
  pictureFiles: FileInput[];
};

export default function EditBlogProfileForm() {
  const { register, setValue, handleSubmit, watch, control, reset } =
    useForm<EditBlogProfileFormData>();
  const axios = useAxios();
  const { user } = useAuth();

  const {
    data: fetchedBlog,
    error: fetchedBlogError,
    status: fetchedBlogStatus,
  } = useBlog({ blogId: user?.activeBlog.id || '' });
  const fetchedBlogProfile = fetchedBlog?.blogProfile;
  const queryClient = useQueryClient();

  const editBlogProfileMutation = useMutation<
    IBlogProfile,
    ApiError,
    any,
    EditBlogProfileFormData
  >(
    (data: EditBlogProfileFormData) =>
      editBlogProfileRequest(axios, data.editBlogProfileRequest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser');
      },
    }
  );

  useEffect(() => {
    if (fetchedBlogProfile) {
      reset({
        pictureFiles: [{ url: fetchedBlogProfile.avatarUrl }],
      });
    }
  }, [fetchedBlogProfile, reset]);

  const onSubmit = handleSubmit((data) => {
    editBlogProfileMutation.mutate(data);
  });
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Avatar Picture</Form.Label>
        <Controller
          name="pictureFiles"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <UploadInput
              id="pictures"
              isSingleFile
              setFileInputs={(files: FileInput[]) => {
                setValue(
                  'pictureFiles',
                  files.length > 0 ? [files[files.length - 1]] : []
                );
              }}
              fileInputs={field.value}
            />
          )}
        />
      </Form.Group>
      <Form.Label>Preferred Blog Name</Form.Label>
      <Form.Control
        type="text"
        defaultValue={fetchedBlogProfile?.preferredBlogName}
        {...register('editBlogProfileRequest.preferredBlogName')}
      />

      <Form.Label> Location </Form.Label>
      <Form.Control
        type="text"
        defaultValue={fetchedBlogProfile?.location}
        {...register('editBlogProfileRequest.location')}
      />
      <Form.Label> Twitter Link</Form.Label>
      <Form.Control
        type="text"
        defaultValue={fetchedBlogProfile?.twitterLink}
        {...register('editBlogProfileRequest.twitterLink')}
      />
      <Form.Label> Github Link</Form.Label>
      <Form.Control
        type="text"
        defaultValue={fetchedBlogProfile?.githubLink}
        {...register('editBlogProfileRequest.githubLink')}
      />
      <Form.Label>Interface Color Theme</Form.Label>
      <Form.Select
        defaultValue={appconfig.defaultInterfaceColor}
        {...register('editBlogProfileRequest.interfaceColorTheme')}
      >
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="tan">Tan</option>
        <option value="purple">Purple</option>
      </Form.Select>
      <Button type="submit">Save</Button>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
    </Form>
  );
}
