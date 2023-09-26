/** @format */

import PropTypes from 'prop-types';
import GalleryItem from '../galleryitem';
import './style.css';

const Gallery = ({ images, onClickBigImage }) => {
	const handleClick = ({ target }) => {
		const bigImageSrc = target.dataset.largeurl;
		onClickBigImage(bigImageSrc);
	};
	return (
		<ul className='gallery-container'>
			{images.map(item => (
				<GalleryItem
					key={item.id}
					srcUrl={item.webformatURL}
					dataset={item.largeImageURL}
					tags={item.tags}
					onClick={handleClick}
				/>
			))}
		</ul>
	);
};

Gallery.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.number.isRequired,
			webformatURL: PropTypes.string.isRequired,
			largeImageURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired,
		})
	).isRequired,
	onClickBigImage: PropTypes.func.isRequired,
};

export default Gallery;
