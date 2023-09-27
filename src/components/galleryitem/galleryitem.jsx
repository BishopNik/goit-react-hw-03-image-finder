/** @format */

import PropTypes from 'prop-types';
import './style.css';

const GalleryItem = () => {
	return (
		<li className='gallery-item' onClick={this.props.onClick}>
			<img
				className='gallery-img'
				src={this.props.srcUrl}
				alt={this.props.tags}
				data-largeurl={this.props.dataset}
			/>
		</li>
	);
};

GalleryItem.propTypes = {
	srcUrl: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
	dataset: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default GalleryItem;
