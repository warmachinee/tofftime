import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: 'relative',
    margin: '16px 32px'
  },
  slide: {
    padding: 15,
    minHeight: 300,
    color: 'black',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

class Slider extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div style={styles.root}>
        <AutoPlaySwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>Match 1</div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>Match 2</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>Match 3</div>
        </AutoPlaySwipeableViews>
      </div>
    );
  }
}

export default Slider;
