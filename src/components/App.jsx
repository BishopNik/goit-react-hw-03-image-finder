/** @format */

import { Component } from 'react';
import {
	BsFillSkipForwardFill,
	BsFillSkipBackwardFill,
	BsArrowRightSquareFill,
	BsArrowLeftSquareFill,
} from 'react-icons/bs';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { fetchImage } from './service/fetch_api';
import Button from './button';
import Loader from './loader';
import Searchbar from './searchbar';
import Gallery from './gallery';
import Modal from './modal';
import { ErrorComponent } from './service/error';
import './style.css';

var debounce = require('debounce');

class App extends Component {
	state = {
		searchItem: '',
		page: 1,
		isModalShow: false,
		isSearch: null,
		pageStart: 1,
		bigImgShow: '',
		value: '',
		perPage: 12,
		foundImages: [],
		countFoundItem: 0,
		countPage: 0,
		statusComponent: null,
		error: null,
		idChange: null,
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { page, perPage, countPage, searchItem, isSearch, pageStart } = this.state;
		if (
			prevState.searchItem !== searchItem ||
			prevState.isSearch !== isSearch ||
			prevState.page !== page ||
			prevState.perPage !== perPage
		) {
			const currentPage = searchItem !== prevState.searchItem ? pageStart : page;
			this.setState({
				statusComponent: 'pending',
				searchItem,
				page: prevState.perPage !== perPage ? 1 : currentPage,
			});
			fetchImage({
				searchItem,
				page: prevState.perPage !== perPage ? 1 : page,
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
						value: perPage,
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

	changePage = pg => {
		const { countPage } = this.state;
		this.setState(
			prevState => {
				const newPage = prevState.page + pg;
				if (1 <= newPage && newPage <= countPage) {
					return {
						page: newPage,
					};
				}
				return null;
			},
			() => {
				const { page, countPage } = this.state;
				switch (page) {
					case 1:
						Notify.info('First page');
						return;
					case countPage:
						Notify.info('Last page');
						return;
					default:
						break;
				}
			}
		);
	};

	handlerChangeSearchValue = value => {
		this.setState({ searchItem: value, isSearch: nanoid(), pageStart: 1, foundImages: [] });
	};

	handleClick = bigImageSrc => {
		this.setState({ isModalShow: true, bigImgShow: bigImageSrc });
	};

	handlerCloseModal = () => {
		this.setState(({ isModalShow }) => ({ isModalShow: !isModalShow }));
	};

	changePerPage = val => {
		if (val) {
			this.setState({ perPage: parseInt(val) });
		}
	};

	handlerChangeCountItem = ({ target }) => {
		this.setState({ value: target.value.trim() });
	};

	handlerSubmitCountItem = debounce(e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const { value } = this.state;
			if (value) {
				this.changePerPage(e.target.value.trim());
			}
			return;
		}

		this.changePerPage(e.target.value.trim());
	}, 1000);

	render() {
		const {
			searchItem,
			page,
			countPage,
			countFoundItem,
			statusComponent,
			foundImages,
			error,
			value,
			isModalShow,
			bigImgShow,
		} = this.state;
		return (
			<div className='container'>
				{isModalShow && (
					<Modal onClose={this.handlerCloseModal}>
						<img src={bigImgShow} alt='Big Search Element' />
					</Modal>
				)}

				<Searchbar handlerSearch={this.handlerChangeSearchValue} />

				{statusComponent === 'pending' && <Loader />}

				{statusComponent === 'resolved' && (
					<>
						{foundImages.length > 0 ? (
							<>
								<Gallery images={foundImages} onClickBigImage={this.handleClick} />
								<div className='status-container'>
									{page > 0 && countPage > 0 && (
										<div className='page-stat'>
											<p className='page-count'>item in page:</p>
											<input
												type='number'
												className='page-item'
												value={value}
												min={3}
												max={countFoundItem >= 200 ? 200 : countFoundItem}
												onInput={this.handlerChangeCountItem}
												onChange={this.handlerSubmitCountItem}
												onKeyDown={this.handlerSubmitCountItem}
											/>
											<div className='page-count'>
												page: {page} / {countPage}
											</div>
										</div>
									)}
									{countPage > 1 && (
										<>
											<Button
												className={'loadmore'}
												type={'button'}
												onClick={() => {
													this.setState({ page: 1 });
													Notify.info('First page');
												}}
											>
												<BsFillSkipBackwardFill />
											</Button>
											<Button
												className={'loadmore'}
												type={'button'}
												onClick={() => this.changePage(-1)}
											>
												<BsArrowLeftSquareFill />
											</Button>
											{page !== countPage && (
												<>
													<Button
														className={'loadmore'}
														type={'button'}
														onClick={() => this.changePage(1)}
													>
														<BsArrowRightSquareFill />
													</Button>
													<Button
														className={'loadmore'}
														type={'button'}
														onClick={() => {
															this.setState({ page: countPage });
															Notify.info('Last page');
														}}
													>
														<BsFillSkipForwardFill />
													</Button>
												</>
											)}
										</>
									)}
								</div>
							</>
						) : (
							<ErrorComponent>
								Images <span className='search-item'>{searchItem}</span> not found
							</ErrorComponent>
						)}
					</>
				)}

				{statusComponent === 'rejected' && (
					<ErrorComponent className={'error'}>{error}</ErrorComponent>
				)}
			</div>
		);
	}
}

export default App;
