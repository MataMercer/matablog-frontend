import React, { useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Router from 'next/router';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useForm, Controller } from 'react-hook-form';
import MarkdownEditorInput from '../inputs/MarkdownEditorInput';
import UploadInput, { FileInput } from '../inputs/UploadInput';
import ErrorAlert from '../ErrorAlert';
import { IPostForm } from '../../modelTypes/formTypes/IPostForm';
import usePost from '../../backend/hooks/usePost';

type PostFormProps = {
  postId: string;
};

type PostFormData = {
  postForm: IPostForm;
  reactTags: Tag[];
};

export default function PostForm({ postId }: PostFormProps) {
  const { reset, setValue, control, handleSubmit } = useForm<PostFormData>({
    criteriaMode: 'all',
  });
  const {
    post: fetchedPost,
    createPost,
    updatePost,
    errors: postErrors,
    status: postStatus,
  } = usePost({
    initialLoad: !!postId,
    postId,
  });

  const {
    tags: tagSuggestions,
    errors: tagSuggestionsErrors,
    status: tagSuggestionsStatus,
  } = useTags({ initialLoad: true });

  const disabled =
    storageStatus === 'loading' ||
    postStatus === 'loading' ||
    tagSuggestionsStatus === 'loading';

  useEffect(() => {
    if (fetchedPost) {
      reset({
        postForm: fetchedPost,
        pictureFiles: fetchedPost.pictureUrls.map((url) => ({ url })),
        reactTags: Object.keys(fetchedPost.tags).map((tagName) => ({
          id: tagName,
          text: tagName,
        })),
      });
    }
  }, [postId, fetchedPost, reset]);

  const onSubmit = (data: PostFormData) => {
    const { pictureFiles } = data;

    const uploadPictures = async (picturesToUpload: File[]) => {
      return Promise.all(
        picturesToUpload.map((picture: File) => uploadFile(picture))
      );
    };

    const deletePictures = async () => {
      const existingPictureUrls = fetchedPost?.pictureUrls;
      if (!existingPictureUrls) {
        return null;
      }
      const pictureUrls = pictureFiles
        .filter((files) => !files.data)
        .map((file) => file.url);
      return Promise.all(
        existingPictureUrls.map((existingPictureUrl) => {
          if (!pictureUrls.includes(existingPictureUrl)) {
            return deleteFile(existingPictureUrl);
          }
          return null;
        })
      );
    };

    const convertReactTagsToFirebaseObject = () => {
      const obj: { [name: string]: true } = {};
      data.reactTags.forEach((reactTag) => {
        obj[reactTag.id] = true;
      });
      return obj;
    };

    const submit = async () => {
      const filesToUpload = pictureFiles
        .map((file) => file.data)
        .filter((file) => file) as File[];
      const successUploadedPictureUrls = await uploadPictures(filesToUpload);
      await deletePictures();

      const fileUrlsToKeep = pictureFiles
        .filter((file) => !file.data)
        .map((file) => file.url);

      if (postId && fetchedPost) {
        await updatePost({
          ...data.postForm,
          pictureUrls: [...fileUrlsToKeep, ...successUploadedPictureUrls],
        });
      } else {
        await createPost({
          ...data.postForm,
        });
      }
      Router.push('/');
    };
    submit();
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ErrorAlert errors={[...postErrors, ...tagSuggestionsErrors]} />
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Controller
            name="postForm.title"
            control={control}
            defaultValue=""
            render={({ field }) => <Form.Control type="text" {...field} />}
          />
        </Form.Group>

        <Controller
          name="postForm.content"
          control={control}
          defaultValue={fetchedPost?.content}
          render={({ field }) => (
            <MarkdownEditorInput
              name="content"
              label="Content"
              id="content"
              handleTextChange={field.onChange}
              text={field.value}
            />
          )}
        />

        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Controller
            name="reactTags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <ReactTags
                id="tags"
                tags={field.value}
                handleAddition={(tag) => {
                  setValue('reactTags', [...field.value, tag]);
                }}
                handleDelete={(i) => {
                  setValue(
                    'reactTags',
                    field.value.filter((tag, index) => index !== i)
                  );
                }}
                handleDrag={(tag, currPos, newPos) => {
                  const newTags = field.value.slice();
                  newTags.splice(currPos, 1);
                  newTags.splice(newPos, 0, tag);
                  setValue('reactTags', newTags);
                }}
                delimiters={delimiters}
                suggestions={tagSuggestions.map((tag: string) => ({
                  id: tag,
                  text: tag,
                }))}
              />
            )}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Pictures</Form.Label>
          <Controller
            name="pictureFiles"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <UploadInput
                id="pictures"
                setFileInputs={(files: FileInput[]) => {
                  setValue('pictureFiles', files);
                }}
                fileInputs={field.value}
              />
            )}
          />
        </Form.Group>
        <Button color="primary" type="submit" disabled={disabled}>
          save
        </Button>
        {loading ? <Spinner animation="border" /> : null}
      </Form>
    </>
  );
}
