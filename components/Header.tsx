import React from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { User } from '../modelTypes/User';

export interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Wrapper = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  box-shadow: -6px 0 white, 6px 0 white, 0 7px 10px -3px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5em;
`;

const Brand = styled.div`
  display: flex;
`;

const BrandImage = styled.img`
  display: inline-block;
  vertical-align: top;
  width: 4em;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
`;

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}) => (
  <header>
    <Wrapper>
      <Brand>
        <BrandImage src="/matamercerlogo2020.svg" alt="Mercer Denholm Logo" />
        <H1>Matablog</H1>
      </Brand>
      <div>
        {user ? (
          <DropdownButton
            id="dropdown-basic-button"
            title={user.username}
            variant="link"
          >
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
          </DropdownButton>
        ) : (
          <>
            <Button type="primary" onClick={onLogin}>
              {' '}
              Login
            </Button>
            <Button type="primary" color="primary" onClick={onCreateAccount}>
              Register
            </Button>
          </>
        )}
      </div>
    </Wrapper>
  </header>
);
