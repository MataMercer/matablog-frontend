import Link from 'next/link';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { PostCategory } from '../Types/enums/PostCategory';
import { IGetPostsForm } from '../Types/requestTypes/IGetPostsRequest';
import PostListDisplay from './PostListDisplay';

type PostCategoryTabsProps = {
  postSearchForm: IGetPostsForm;
};

export default function PostCategoryTabs({
  postSearchForm,
}: PostCategoryTabsProps) {
  return (
    <Tabs id="controlled-tab-example" defaultActiveKey="ROOT" className="mb-3">
      <Tab eventKey="ROOT" title="All">
        <PostListDisplay
          getPostsForm={{ ...postSearchForm, category: 'ROOT' }}
          noPostsLabel="This blog has not made any posts yet."
        />
      </Tab>
      <Tab eventKey="MEDIA" title="Media">
        <PostListDisplay
          getPostsForm={{ ...postSearchForm, category: 'MEDIA' }}
          noPostsLabel="This blog has not made any posts with media yet."
        />
      </Tab>
      <Tab eventKey="REPLY" title="Replies">
        <PostListDisplay
          getPostsForm={{ ...postSearchForm, category: 'REPLY' }}
          noPostsLabel="This blog has not replied to anyone yet."
        />
      </Tab>
    </Tabs>
  );
}
