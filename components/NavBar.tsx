import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';
import { IUser } from '../modelTypes/IUser';
import ThemeToggler from './ThemeToggler';
import {
  faUser,
  faBars,
  faBell,
  faEnvelope,
  faEllipsisH,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import React from 'react';

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
  user: IUser | null;
}
const AuthenticatedMenu: React.FC<AuthenticatedMenuProps> = ({ user }) => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <NavItem>
        <Link href="/postformpage">
          <Button>Create Post</Button>
        </Link>
      </NavItem>
      <DropdownButton
        id="dropdown-basic-button"
        title={user?.username}
        variant="link"
      >
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
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
};

const UnauthenticatedMenu = () => {
  return (
    <>
      <li className="col-span-1">
        <Link href="/login">
          <Button>
            <a>Login</a>
          </Button>
        </Link>
      </li>
    </>
  );
};

const Search: React.FC<{ className?: string }> = ({ className }) => {
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
};

const StyledSearch = styled(Search)`
  width: 35em;
`;

export const NavBar: React.FC<{}> = ({}) => {
  const { isAuthenticated, user } = useAuth();
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
          {isAuthenticated ? (
            <AuthenticatedMenu user={user} />
          ) : (
            <UnauthenticatedMenu />
          )}
        </NavList>
      </Nav>
    </header>
  );
};
