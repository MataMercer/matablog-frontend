import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { faEllipsisH, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
  FormControl,
  Navbar,
} from 'react-bootstrap';
import React from 'react';
import IUser from '../Types/IUser';
import { useAuth } from '../auth/AuthContext';
import ThemeToggler from './ThemeToggler';
import useBlog from '../backend/hooks/useBlog';
import IBlog from '../Types/IBlog';
import ErrorAlert from './ErrorAlert';
import ProtectComponent from '../auth/ProtectComponent';

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
`;
const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const NavItem = styled.li`
  align-items: center;
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
  color: ${({ theme }) => theme.colors.primary};
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
            <Button>Create Post</Button>
          </Link>
        </NavItem>
      </ProtectComponent>
      <DropdownButton
        id="dropdown-basic-button"
        title={`@${blog.blogName}`}
        variant="link"
      >
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
    <li className="col-span-1">
      <Link href="/login">
        <Button>
          <a>Login</a>
        </Button>
      </Link>
    </li>
  );
}

type SearchProps = {
  className?: string;
};
function Search({ className }: SearchProps) {
  return (
    <InputGroup className={className}>
      <DropdownButton
        variant="outline-secondary"
        title="Post Category"
        id="input-group-dropdown-1"
      >
        <Dropdown.Item href="#">All</Dropdown.Item>
        <Dropdown.Item href="#">Media</Dropdown.Item>
        <Dropdown.Item href="#">Replies</Dropdown.Item>
      </DropdownButton>
      <FormControl aria-label="Text input with dropdown button" />
      <Button>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
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
          <NavItem>
            <ThemeToggler />
          </NavItem>
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
