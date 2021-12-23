import Link from 'next/link';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { PostCategory } from '../Types/enums/PostCategory';
import { IPostSearchForm } from '../Types/requestTypes/IPostSearchRequest';
import PostListDisplay from './PostListDisplay';

type PostCategoryTabsProps = {
  postSearchForm: IPostSearchForm;
};

export default function PostCategoryTabs({
  postSearchForm,
}: PostCategoryTabsProps) {
  return (
    <Tabs id="controlled-tab-example" defaultActiveKey="ROOT" className="mb-3">
      <Tab eventKey="ROOT" title="All">
        <PostListDisplay
          postSearchForm={{ ...postSearchForm, category: 'ROOT' }}
        />
      </Tab>
      <Tab eventKey="MEDIA" title="Media">
        <PostListDisplay
          postSearchForm={{ ...postSearchForm, category: 'MEDIA' }}
        />
      </Tab>
      <Tab eventKey="REPLY" title="Replies">
        <PostListDisplay
          postSearchForm={{ ...postSearchForm, category: 'REPLY' }}
        />
      </Tab>
    </Tabs>
  );
}
