/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { fetchImage } from '../service/fetch_api';
import ImageItem from '../galleryitem';
import Button from '../button';
import Loader from '../loader';
import './style.css';

class ImageGallery extends Component {
	state = {
		searchItem: '',
		page: 1,
		perPage: 12,
		foundImages: [],
		countFoundItem: 0,
		countPage: 0,
		isLoading: false,
		statusComponent: null,
		error: null,
	};

	static propTypes = {
		searchItem: PropTypes.string.isRequired,
		pageStart: PropTypes.number.isRequired,
		onClickBigImage: PropTypes.func.isRequired,
	};

	addPage = () => {
		this.setState(prevState => ({
			page: prevState.page + 1,
		}));
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { page, perPage, countPage } = this.state;
		const { searchItem, pageStart } = this.props;
		if (searchItem !== prevProps.searchItem || prevState.page !== page) {
			const currentPage = searchItem !== prevProps.searchItem ? pageStart : page;
			this.setState({
				statusComponent: 'pending',
				searchItem,
				page: currentPage,
			});
			fetchImage({
				searchItem,
				page,
				perPage,
			})
				.then(({ hits, totalHits }) => {
					const foundImages = [];
					hits.forEach(({ id, webformatURL, largeImageURL, tags }) => {
						if (id && webformatURL && largeImageURL && tags) {
							foundImages.push({ id, webformatURL, largeImageURL, tags });
						}
					});
					const pages = page === 1 ? Math.ceil(totalHits / perPage) : countPage;
					this.setState(prevState => ({
						...prevState,
						foundImages,
						countFoundItem: totalHits,
						countPage: pages,
						statusComponent: 'resolved',
					}));
				})
				.catch(({ message }) => {
					this.setState({
						statusComponent: 'rejected',
						error: message,
					});
					Notify.failure('Unable to load results. ' + message);
				});
		}
	};

	handleClick = ({ target }) => {
		const bigImageSrc = target.dataset.largeurl;
		this.props.onClickBigImage(bigImageSrc);
	};

	render() {
		const { page, countPage, statusComponent, foundImages, error } = this.state;
		if (statusComponent === 'pending') {
			return <Loader />;
		}

		if (statusComponent === 'resolved') {
			return (
				<>
					<ul className='gallery-container'>
						{foundImages.length > 0 ? (
							foundImages.map(item => (
								<ImageItem
									key={item.id}
									srcUrl={item.webformatURL}
									dataset={item.largeImageURL}
									tags={item.tags}
									onClick={this.handleClick}
								/>
							))
						) : (
							<h2 className='error-found'>Images not found</h2>
						)}
					</ul>
					{page > 0 && page !== countPage && (
						<Button class={'loadmore'} type={'button'} onClick={this.addPage}>
							<span>Loadmore</span>
						</Button>
					)}
				</>
			);
		}

		if (statusComponent === 'rejected') {
			return <h2 className='error-found'>{error}</h2>;
		}
	}
}

export default ImageGallery;
