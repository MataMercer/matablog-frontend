import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const FooterCust = styled.footer`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 100vh 0 100vh ${({ theme }) => theme.colors.primary};
  padding: 2em;
  justify-content: center;
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding-left: 0px;
`;

const StyledAnchor = styled.a`
  color: white;
`;

const CopyrightText = styled.p`
  display: flex;
  justify-content: center;
`;

export default function Footer() {
  return (
    <FooterCust>
      <LinkList>
        <li>
          <StyledAnchor href="https://github.com/MataMercer/matablog-frontend">
            <FontAwesomeIcon icon={faGithub} /> Github
          </StyledAnchor>
        </li>
      </LinkList>

      <CopyrightText>© {new Date().getFullYear()} Mercer Denholm</CopyrightText>
    </FooterCust>
  );
}
