/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { useAuth } from '../auth/auth';
import ThemeToggler from './ThemeToggler';

const AuthenticatedMenu = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <li
        className={`navbar-item ${
          router.pathname === '/settings' ? 'navbar-item-active' : ''
        }`}
      >
        <Link href="/settings">
          <a>Settings</a>
        </Link>
      </li>
      <li className="navbar-item" onClick={logout}>
        <a>Logout</a>
      </li>
    </>
  );
};

const UnauthenticatedMenu = () => {
  const router = useRouter();

  return (
    <>
      <li className="col-span-1">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
    </>
  );
};

const NavBar = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-white shadow-md z-50">
      <nav>
        <ul className="grid gap-4 grid-cols-12">
          <li className="col-span-3">
            <Link href="/">
              <div className="flex">
                <ReactSVG
                  className="w-12"
                  src="/matamercerlogo2020.svg"
                  loading={() => <span>Loading</span>}
                  wrapper="div"
                />
                <span className="flex-grow">MataBlog</span>
              </div>
            </Link>
          </li>
          <li className="col-span-1">
            <ThemeToggler />
          </li>
          <li className="col-span-3">
            <Link href="/">
              <a>{user ? user.username : 'null'}</a>
            </Link>
          </li>
          {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
