import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  faEllipsisH,
  faSearch,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import IUser from '../Types/IUser';
import { useAuth } from '../auth/AuthContext';
import useBlog from '../backend/hooks/blog/useBlog';
import IBlog from '../Types/IBlog';
import ErrorAlert from './ErrorAlert';
import ProtectComponent from '../auth/ProtectComponent';
import { Button } from './ui/Button';
import usePostsSearch from '../backend/hooks/post/usePostsSearch';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from './ui/Dropdown';
import { getFileUrl, useFileUrl } from '../backend/repositories/FileRepository';

const Nav = styled.nav`
  font-family: Arial, sans-serif;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 15px 20px;
  z-index: 999;
  position: relative;
  height: 3em;
  background-color: ${({ theme }) => theme.colors.primary};
`;
const NavList = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const NavItem = styled.div`
  align-items: center;
  margin: 0px 10px 0px;
`;
const Brand = styled.a`
  display: flex;
  cursor: pointer;
`;
const BrandImage = styled.img`
  width: 2.5em;
`;
const AvatarImage = styled.img`
  width: 2em;
  margin-right: 0.5em;
`;
const H1 = styled.h1`
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  margin: 6px 0 6px 10px;
  color: white;
  text-decoration: none;
`;

const IconText = styled.span`
  margin-left: 10px;
`;
interface AuthenticatedMenuProps {
  blogId: string;
}
function AuthenticatedMenu({ blogId }: AuthenticatedMenuProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const { data: blog, status, error } = useBlog({ blogId });

  const avatarUrl = useFileUrl(
    blog?.blogProfile?.avatar?.id,
    blog?.blogProfile?.avatar?.name
  );

  if (!blog) {
    return <ErrorAlert error={error} />;
  }
  return (
    <>
      <ProtectComponent requiredAuthority="POST_CREATE_NEW">
        <NavItem>
          <Link href="/post/create">
            <Button color="light">
              <FontAwesomeIcon icon={faPen} />
              <IconText>Create Post</IconText>
            </Button>
          </Link>
        </NavItem>
      </ProtectComponent>
      <Dropdown>
        <DropdownToggle>
          <div>
            <AvatarImage src={avatarUrl} alt="blogAvatar" />
            {`@${blog.blogName}`}
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <Link href={`/blog/${blog.id}`} passHref>
            <DropdownItem>Profile</DropdownItem>
          </Link>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem
            onClick={() => {
              logout();
            }}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

function UnauthenticatedMenu() {
  return (
    <NavItem>
      <Link href="/login">
        <Button color="light">
          <a>Login</a>
        </Button>
      </Link>
    </NavItem>
  );
}

const StyledSearch = styled(Search)`
  max-width: 35em;
  display: flex;
  flex-grow: 1;
  > Button {
    border-bottom-left-radius: 0%;
    border-top-left-radius: 0%;
  }
  > Input {
    border-radius: 0%;
    min-width: 20em;
  }
`;
const Autocomplete = styled.div`
  position: relative;
  display: inline-block;
  display: flex;
  align-items: stretch;
`;
const AutocompleteItemList = styled.div`
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.3);
  top: 100%;
  left: 0;
  right: 0;
  > div {
    padding: 5px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
    &:hover {
      background-color: gray !important;
      color: white;
    }
  }
`;

type AutocompleteItemProps = {
  active: boolean;
};
const AutocompleteItem = styled.div<AutocompleteItemProps>`
  ${({ active, theme }) =>
    active &&
    `
  background-color: ${theme.colors.secondary} !important;
  color: white;
`}
`;
type SearchProps = {
  className?: string;
};
function Search({ className }: SearchProps) {
  const [val, setVal] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);
  const autocompleteThresholdLength = 1;
  const open = val.length >= autocompleteThresholdLength;

  const {
    data: postsSearchPage,
    status,
    error,
  } = usePostsSearch({
    searchPostsForm: {
      query: val,
      page: 0,
      pageSize: 5,
    },
  });
  const list = postsSearchPage?.content || [];

  return (
    <form onSubmit={() => {}} className={className}>
      <Autocomplete>
        <input
          id="myInput"
          type="text"
          name="myCountry"
          placeholder="Search Matablog..."
          value={val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVal(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setIndex(index >= 0 ? index - 1 : 0);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              setIndex(index < list.length - 1 ? index + 1 : list.length - 1);
            } else if (e.key === 'Enter') {
              e.preventDefault();
              if (index > -1) {
                Router.push(`/post/${list[index].id}`);
                setVal('');
                setIndex(-1);
                e.target.blur();
              } else {
                Router.push(`/search`);
              }
            }
          }}
        />
        <AutocompleteItemList>
          {open &&
            list.map((it, i) => (
              <AutocompleteItem
                active={i === index}
                onClick={() => {
                  setVal('');
                  setIndex(-1);
                  Router.push(`/post/${it.id}`);
                }}
              >
                <div>{it.content}</div>
                <div>@{it.blog.blogName}</div>
              </AutocompleteItem>
            ))}
        </AutocompleteItemList>
      </Autocomplete>
      <Button color="secondary" type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </form>
  );
}

export default function NavBar({}) {
  const { user } = useAuth();
  return (
    <header>
      <Nav>
        <Link href="/">
          <Brand>
            <BrandImage src="/matamercerlogo2020.svg" />
            <H1>MataBlog</H1>
          </Brand>
        </Link>
        <StyledSearch />
        <NavList>
          {user?.activeBlog.id ? (
            <AuthenticatedMenu blogId={user.activeBlog.id} />
          ) : (
            <UnauthenticatedMenu />
          )}
        </NavList>
      </Nav>
    </header>
  );
}
