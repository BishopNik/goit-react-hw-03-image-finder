/** @format */

import PropTypes from 'prop-types';
import './style.css';

const GalleryItem = ({ srcUrl, tags, dataset, onClick }) => {
	return (
		<li className='gallery-item' onClick={onClick}>
			<img className='gallery-img' src={srcUrl} alt={tags} data-largeurl={dataset} />
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
