import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const PostPicture = styled.img`
  object-fit: scale-down;
  width: 100%;
  height: 80vh;
`;

const Nav = styled(Row)`
  padding: 0.5em;
`;

const NavItemButton = styled.button`
  background-color: #1e1e24;
  border: none;
  padding: 0;
  border-radius: 0;
  font-size: x-large;
  height: 3em;
`;

type NavItemImageProps = {
  active: boolean;
};
const NavItemImage = styled.img<NavItemImageProps>`
  object-fit: contain;
  width: 5em;
  height: 5em;
  filter: brightness(70%);
  ${(props) =>
    props.active
      ? `
      filter: brightness(100%);
      outline: 0.3em solid ${props.theme.colors.primary};
      outline-offset: -0.3em;;
    `
      : ``}
`;

type ThumbnailCarouselProps = {
  pictureUrls: string[];
};

const ThumbnailCarousel = ({ pictureUrls }: ThumbnailCarouselProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleDirectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = (e.target as HTMLButtonElement).value;
    if (direction === 'left' && index - 1 >= 0) {
      setIndex(index - 1);
    }
    if (direction === 'right' && index + 1 < pictureUrls.length) {
      setIndex(index + 1);
    }
  };

  const handleDirectionKeyPress = (e: KeyboardEvent) => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    if (e.keyCode === LEFT_KEY && index - 1 >= 0) {
      setIndex(index - 1);
    }
    if (e.keyCode === RIGHT_KEY && index + 1 < pictureUrls.length) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleDirectionKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleDirectionKeyPress, false);
    };
  });

  return (
    <Container>
      <Row>
        {pictureUrls.map((pictureUrl, i) => (
          <PostPicture
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            src={pictureUrl}
            alt="Screenshot of app"
            hidden={i !== index}
          />
        ))}
      </Row>

      <Row className="thumbnail-carousel-nav">
        <Button
          value="left"
          disabled={index === 0}
          onClick={handleDirectionClick}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{ pointerEvents: 'none' }}
          />
        </Button>
        {pictureUrls.map((pictureUrl, i) => (
          <NavItemButton
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
            }}
          >
            <NavItemImage
              alt="thumbnail for selection"
              src={pictureUrl}
              active={i === index}
            />
          </NavItemButton>
        ))}
        <Button
          value="right"
          disabled={index === pictureUrls.length - 1}
          onClick={handleDirectionClick}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{ pointerEvents: 'none' }}
          />
        </Button>
      </Row>
    </Container>
  );
};

export default ThumbnailCarousel;
