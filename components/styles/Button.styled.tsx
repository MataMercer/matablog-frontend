import styled, { TypeColors } from 'styled-components';
import { darken } from 'polished';

interface SButtonProps {
  color?: TypeColors;
}

const SLikeButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: #ff686b;
  border: none;
  font-size: 1.5em;
  &:hover {
    filter: brightness(90%);
  }
`;

const SButton = styled.button<SButtonProps>`
  background-color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.primary};
  padding: 6px 12px 6px;
  font-size: large;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ color, theme }) =>
    color === 'info' || color === 'light' ? '#000000' : '#FFFFFF'};
  &:hover {
    background-color: ${({ color, theme }) =>
      darken(0.05, color ? theme.colors[color] : theme.colors.primary)};
  }
`;

export { SLikeButton, SButton };
