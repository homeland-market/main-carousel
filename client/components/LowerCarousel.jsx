/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import Button from './Button';

const GridWrapper = styled.div`
  width: 500px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 48px auto 48px;
  grid-template-rows: 100%;
  margin: 0 auto;
  width: 500px;
`;

const CarouselWrapper = styled.div`
  padding: 12px 4px;
  width: ${(props) => props.numOfThumbnails * 70}px;
  overflow: hidden;
`;

const InnerCarousel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 0px;
  width: 100%;
`;

class LowerCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstVisibleThumbnail: 0,
      // Calculates number of thumbnails that will fit evenly into the carousel width
      // TODO: make this generate dynamically based on width of parent div
      numOfThumbnails: Math.floor((500 - 48 * 2 - 8) / 70),
      carouselPosition: 0,
    };
    this.thumbnailLoader = this.thumbnailLoader.bind(this);
  }

  componentDidUpdate() {
    const { activeThumbnail, images } = this.props;
    const { firstVisibleThumbnail, numOfThumbnails } = this.state;

    // checks if new selected Thumbnail is currently hidden to the right
    const isHidden = activeThumbnail > firstVisibleThumbnail + numOfThumbnails - 1
      && activeThumbnail < images.length;

    console.log('isHidden: ', isHidden);
    if (isHidden) {
      // if so, move the carousel to the left
      this.setState((state) => {
        state.carouselPosition -= 70;
        state.firstVisibleThumbnail += 1;
        return {
          carouselPosition: state.carouselPosition,
          firstVisibleThumbnail: state.firstVisibleThumbnail,
        };
      });
    }
  }

  thumbnailLoader() {
    const { images, activeThumbnail, handleThumbnailClick } = this.props;
    // checks to see if images have loaded yet
    if (images.length > 0) {
      // if so, constructs thumbnails in the carousel
      return images.map((image) => (
        <Thumbnail
          id={image.index}
          activeIndex={activeThumbnail}
          src={image.thumbnailURL}
          onClick={handleThumbnailClick}
        />
      ));
    }
    return <div />;
  }

  render() {
    const { handleButtonClick, numberOfImages, activeThumbnail } = this.props;
    const { numOfThumbnails } = this.state;

    return (
      <GridWrapper>
        <GridContainer className="lower-carousel-wrapper">
          <Button className="left-button" onClick={handleButtonClick} number={numberOfImages} activeThumbnail={activeThumbnail}>
            &lt;
          </Button>
          <CarouselWrapper className="lower-carousel" numOfThumbnails={numOfThumbnails}>
            <InnerCarousel>
              {this.thumbnailLoader()}
            </InnerCarousel>
          </CarouselWrapper>
          <Button className="right-button" onClick={handleButtonClick} number={numberOfImages} activeThumbnail={activeThumbnail}>
            &gt;
          </Button>
        </GridContainer>
      </GridWrapper>
    );
  }
}

export default LowerCarousel;
