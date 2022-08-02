import React, { useEffect, useState } from 'react';
import { Form, Spinner, Stack } from 'react-bootstrap';
import Router from 'next/router';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import MarkdownEditorInput from '../inputs/MarkdownEditorInput';
import UploadInput, { FileInput } from '../inputs/UploadInput';
import ErrorAlert from '../ErrorAlert';
import { IPostRequest } from '../../Types/requestTypes/IPostRequest';
import usePost from '../../backend/hooks/post/usePost';
import IPost from '../../Types/IPost';
import {
  createPostRequest,
  updatePostRequest,
} from '../../backend/repositories/PostRepository';
import IPostTag from '../../Types/IPostTag';
import { ApiError } from '../../Types/IApiError';
import { useAxios } from '../../auth/AxiosProvider';
import IFile from '../../Types/IFile';
import {
  getFileUrl,
  getFileUrls,
} from '../../backend/repositories/FileRepository';
import { Button } from '../ui/Button';

const FlagInputWrapper = styled.div`
  display: flex;
`;

type PostFormProps = {
  postId: string;
  parentPostId?: string;
  onSuccess: () => void;
};

type PostFormData = {
  postForm: IPost;
  pictureFiles: FileInput[];
  reactTags: Tag[];
};

export default function PostForm({
  postId,
  parentPostId,
  onSuccess,
}: PostFormProps) {
  const axios = useAxios();
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
    (data: IPostRequest) => createPostRequest(axios, data),
    {
      onSuccess,
    }
  );

  const updatePostMutation = useMutation<IPost, ApiError, any, IPostRequest>(
    (data: IPostRequest) => updatePostRequest(axios, data),
    {
      onSuccess,
    }
  );

  const loading =
    fetchedPostStatus === 'loading' || createPostMutation.status === 'loading';

  const { error: createPostError } = createPostMutation;

  useEffect(() => {
    if (fetchedPost && postId) {
      reset({
        postForm: fetchedPost,
        reactTags: fetchedPost.postTags.map((postTag) => ({
          id: postTag.id,
          text: postTag.name,
        })),
        pictureFiles: fetchedPost.attachments?.map((it) => ({
          url: getFileUrl(it),
          id: it.id,
        })),
      });
    }
  }, [postId, fetchedPost, reset]);

  const onSubmit = (published: boolean) => (data: PostFormData) => {
    const { pictureFiles } = data;
    console.log(data.reactTags);
    const convertReactTagsToITags = () =>
      data.reactTags.map((reactTag) => ({ name: reactTag.text } as IPostTag));
    const filesToUpload = pictureFiles
      .filter((it) => it.data)
      .map((it) => it.data);

    const attachments = pictureFiles.filter((it) => it.id);
    const attachmentInsertions = pictureFiles
      .reverse()
      .flatMap((it, index) => (it.data ? index : []));
    console.log(attachmentInsertions);
    console.log(pictureFiles);
    if (postId) {
      updatePostMutation.mutate({
        ...data.postForm,
        postTags: convertReactTagsToITags(),
        files: filesToUpload,
        attachments,
        published,
        attachmentInsertions,
      });
    } else {
      createPostMutation.mutate({
        ...data.postForm,
        parentPostId,
        postTags: convertReactTagsToITags(),
        files: filesToUpload,
        published,
      });
    }
  };

  const onSubmitPublish = onSubmit(true);
  const onSubmitDraft = onSubmit(false);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (
    <Form onSubmit={handleSubmit(onSubmitPublish)}>
      <ErrorAlert error={createPostError} />

      <Controller
        name="postForm.content"
        control={control}
        defaultValue={fetchedPost?.content || ''}
        render={({ field }) => (
          <MarkdownEditorInput
            name="content"
            label="Content"
            id="content"
            handleTextChange={field.onChange}
            text={field.value}
            isReply={!!parentPostId}
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
              autofocus={false}
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

      <Stack direction="horizontal" gap={3}>
        <Form.Group>
          <Form.Label>Mark as sensitive</Form.Label>
          <Controller
            name="postForm.sensitive"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Form.Check
                value={field.value as any}
                onChange={field.onChange}
              />
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
              <Form.Check
                value={field.value as any}
                onChange={field.onChange}
              />
            )}
          />
        </Form.Group>
      </Stack>
      {/* <Button onClick={handleSubmit(onSubmitDraft)} disabled={loading}>
        Save Draft
      </Button> */}
      <Button type="submit" value="publish" disabled={loading}>
        Publish
      </Button>
      {loading ? <Spinner animation="border" /> : null}
    </Form>
  );
}
