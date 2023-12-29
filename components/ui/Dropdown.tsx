/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Button } from './Button';

const SDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

type SDropdownContentProps = {
  active: string;
};
const SDropdownContent = styled.div<SDropdownContentProps>`
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  ${({ active, theme }) =>
    active !== 'false' &&
    `
    display:block
`}
`;

type DropdownToggleProps = {
  children: JSX.Element;
};

export function DropdownToggle({ children }: DropdownToggleProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
type DropdownProps = {
  children: JSX.Element[];
};

export function Dropdown({ children }: DropdownProps) {
  const [active, setActive] = useState(false);
  const clickOutsideRef = useOnclickOutside(() => {
    setActive(false);
  });

  return (
    <SDropdown>
      <Button
        onClick={() => {
          setActive(!active);
        }}
      >
        {children.find(({ type }) => type === DropdownToggle)}
      </Button>

      <SDropdownContent ref={clickOutsideRef} active={active.toString()}>
        {children.find(({ type }) => type === DropdownMenu)}
      </SDropdownContent>
    </SDropdown>
  );
}

type DropdownMenuProps = {
  children: React.ReactNode[];
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

const SDropdownItem = styled.div`
  display: block;
  padding: 6px 12px 6px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
export { SDropdownItem as DropdownItem };
