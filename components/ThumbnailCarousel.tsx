import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="project-entry-screenshot"
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
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`thumbnail-carousel-nav-item ${
              i === index ? 'thumbnail-carousel-nav-item-active' : ''
            }`}
            type="button"
            onClick={() => {
              setIndex(i);
            }}
          >
            <img alt="thumbnail for selection" src={pictureUrl} />
          </button>
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
