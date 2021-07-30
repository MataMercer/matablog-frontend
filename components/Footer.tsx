import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a href="https://github.com/MataMercer">
            <FontAwesomeIcon icon={faGithub} /> Github
          </a>
        </li>
      </ul>

      <p>© {new Date().getFullYear()} Mercer Denholm</p>
    </footer>
  );
}
