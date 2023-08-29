/** @format */

import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import './style.css';

class Loader extends Component {
	render() {
		return (
			<div className='loading-container'>
				{/* <span className='loading'></span> */}
				<ColorRing
					visible={true}
					height='240'
					width='240'
					ariaLabel='blocks-loading'
					wrapperStyle={{}}
					wrapperClass='blocks-wrapper'
					colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
				/>
			</div>
		);
	}
}

export default Loader;
