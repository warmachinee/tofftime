import React from 'react';
import PropTypes from 'prop-types';
import PaginationDot from './PaginationDot';

const styles = {
  root: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    display: 'flex',
    flexDirection: 'row',
    WebkitFlexDirection: 'row',
  },
};

class Pagination extends React.Component {

  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const { index, dots } = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
      );
    }
    return(
      <React.Fragment>
        { ( window.innerWidth >= 600 && dots < 6 ) ?
          <div style={styles.root}>{children}</div>
          :
          <div style={{
              ...styles.root,
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 600
            }}>{index + 1} {"/"} {dots}</div>
        }
      </React.Fragment>
    );
  }
}

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
};

export default Pagination;
