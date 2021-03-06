import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 50%;
  padding: 0.3em 0.55em;
  border: none;
`;

const ThemeToggler = () => {
  const [theme, setTheme] = useState(false);

  const handleChange = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme === 'dark') {
      setTheme(true);
    } else if (getTheme === 'light') {
      setTheme(false);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <div>
      <Button onClick={handleChange} className="theme-toggler">
        {theme ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggler;
