import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  faEllipsisH,
  faSearch,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import React from 'react';
import IUser from '../Types/IUser';
import { useAuth } from '../auth/AuthContext';
import useBlog from '../backend/hooks/useBlog';
import IBlog from '../Types/IBlog';
import ErrorAlert from './ErrorAlert';
import ProtectComponent from '../auth/ProtectComponent';
import { SButton } from './styles/Button.styled';

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
  if (!blog) {
    return <ErrorAlert error={error} />;
  }
  return (
    <>
      <ProtectComponent requiredAuthority="POST_CREATE_NEW">
        <NavItem>
          <Link href="/post/create">
            <SButton color="light">
              <FontAwesomeIcon icon={faPen} />
              <IconText>Create Post</IconText>
            </SButton>
          </Link>
        </NavItem>
      </ProtectComponent>
      <DropdownButton id="dropdown-basic-button" title={`@${blog.blogName}`}>
        <Link href={`/blog/${blog.id}`} passHref>
          <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

function UnauthenticatedMenu() {
  return (
    <NavItem>
      <Link href="/login">
        <SButton color="light">
          <a>Login</a>
        </SButton>
      </Link>
    </NavItem>
  );
}

type SearchProps = {
  className?: string;
};
function Search({ className }: SearchProps) {
  return (
    <InputGroup className={className}>
      <DropdownButton
        variant="secondary"
        title="Post Category"
        id="input-group-dropdown-1"
      >
        <Dropdown.Item href="#">All</Dropdown.Item>
        <Dropdown.Item href="#">Media</Dropdown.Item>
        <Dropdown.Item href="#">Replies</Dropdown.Item>
      </DropdownButton>
      <FormControl aria-label="Text input with dropdown button" />
      <SButton color="secondary">
        <FontAwesomeIcon icon={faSearch} />
      </SButton>
    </InputGroup>
  );
}

const StyledSearch = styled(Search)`
  width: 35em;
`;

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
