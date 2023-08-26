/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Filter extends Component {
	static propTypes = {
		value: PropTypes.string.isRequired,
		onFiltred: PropTypes.func.isRequired,
	};

	render() {
		return (
			<label className='filter-field'>
				Find contacts by name
				<input
					className='input-field filter'
					value={this.props.value}
					type='text'
					name='filter'
					autoComplete='off'
					onChange={this.props.onFiltred}
				/>
			</label>
		);
	}
}
export default Filter;
