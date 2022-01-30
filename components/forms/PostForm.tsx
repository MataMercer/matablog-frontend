import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Router from 'next/router';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import MarkdownEditorInput from '../inputs/MarkdownEditorInput';
import UploadInput, { FileInput } from '../inputs/UploadInput';
import ErrorAlert from '../ErrorAlert';
import { IPostRequest } from '../../Types/requestTypes/IPostRequest';
import usePost from '../../backend/hooks/usePost';
import IPost from '../../Types/IPost';
import { createPostRequest } from '../../backend/repositories/PostRepository';
import IPostTag from '../../Types/IPostTag';
import { RequestStatus } from '../../Types/enums/RequestStatus';
import { ApiError } from '../../Types/IApiError';

type PostFormProps = {
  postId: string;
};

type PostFormData = {
  postForm: IPost;
  pictureFiles: FileInput[];
  reactTags: Tag[];
};

export default function PostForm({ postId }: PostFormProps) {
  const { reset, setValue, control, handleSubmit } = useForm<PostFormData>({
    criteriaMode: 'all',
  });
  const {
    data: fetchedPost,
    error: fetchedPostError,
    status: fetchedPostStatus,
  } = usePost({
    postId,
    enabled: !!postId,
  });
  // const {
  //   tags: tagSuggestions,
  //   errors: tagSuggestionsErrors,
  //   status: tagSuggestionsStatus,
  // } = useTags({ initialLoad: true });
  // tagSuggestionsStatus === 'loading';
  const createPostMutation = useMutation<IPost, ApiError, any, IPostRequest>(
    (data: IPostRequest) => createPostRequest(data),
    {
      onSuccess: () => {
        Router.push('/');
      },
    }
  );
  const loading =
    fetchedPostStatus === 'loading' || createPostMutation.status === 'loading';

  const { error: createPostError } = createPostMutation;

  useEffect(() => {
    if (fetchedPost && postId) {
      console.log(fetchedPost);
      reset({
        postForm: fetchedPost,
        reactTags: Object.keys(fetchedPost.postTags).map((tagName) => ({
          id: tagName,
          text: tagName,
        })),
      });
    }
  }, [postId, fetchedPost, reset]);

  const onSubmit = (data: PostFormData) => {
    const { pictureFiles } = data;

    const convertReactTagsToITags = () =>
      data.reactTags.map((reactTag) => ({ name: reactTag.id } as IPostTag));
    const submit = async () => {
      const filesToUpload = pictureFiles
        .map((file) => file.data)
        .filter((file) => file) as File[];

      const fileUrlsToKeep = pictureFiles
        .filter((file) => !file.data)
        .map((file) => file.url);

      if (postId && fetchedPost) {
        // await updatePost({
        //   ...data.postForm,
        //   pictureUrls: [...fileUrlsToKeep, ...successUploadedPictureUrls],
        // });
      }
      data.postForm.published = true;
      createPostMutation.mutate({
        ...data.postForm,
        tags: convertReactTagsToITags(),
        files: filesToUpload,
        published: true,
      });
    };
    submit();
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ErrorAlert error={createPostError} />
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

      <Form.Group>
        <Form.Label>Mark as sensitive</Form.Label>
        <Controller
          name="postForm.sensitive"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Form.Check value={field.value as any} onChange={field.onChange} />
          )}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Allow Community Tagging</Form.Label>
        <Controller
          name="postForm.communityTaggingEnabled"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Form.Check value={field.value as any} onChange={field.onChange} />
          )}
        />
      </Form.Group>

      <Button color="primary" type="submit" disabled={loading}>
        Save Draft
      </Button>
      <Button color="primary" type="submit" disabled={loading}>
        Create
      </Button>
      {loading ? <Spinner animation="border" /> : null}
    </Form>
  );
}
