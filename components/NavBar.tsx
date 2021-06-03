/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/auth';
import ThemeToggler from './ThemeToggler';

const NavBar = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <Link href="/">
        <div className="navbar-brand">
          <img
            className="navbar-brand-image"
            src="/icon.png"
            alt="Mercer Denholm Logo"
          />
          <span className="navbar-brand-text">MataBlog</span>
        </div>
      </Link>

      <nav>
        <ul className="navbar-items">
          <li>
            <ThemeToggler />
          </li>
          <li
            className={`navbar-item ${
              router.pathname === '/' ? 'navbar-item-active' : ''
            }`}
          >
            <Link href="/">
              <a>Posts</a>
            </Link>
          </li>
        </ul>

        {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      </nav>
    </header>
  );
};

const AuthenticatedMenu = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <ul className="navbar-items">
      <li
        className={`navbar-item ${
          router.pathname === '/admindashboard' ? 'navbar-item-active' : ''
        }`}
      >
        <Link href="/admindashboard">
          <a>Settings</a>
        </Link>
      </li>
      <li className="navbar-item" onClick={logout}>
        <a>Logout</a>
      </li>
    </ul>
  );
};

const UnauthenticatedMenu = () => {
  const router = useRouter();

  return (
    <ul className="navbar-items">
      <li
        className={`navbar-item ${
          router.pathname === '/login' ? 'navbar-item-active' : ''
        }`}
      >
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
    </ul>
  );
};
export default NavBar;
