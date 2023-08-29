/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
	static propTypes = {
		class: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		children: PropTypes.node.isRequired,
	};

	render() {
		return (
			<button
				className={this.props.class}
				type={this.props.type}
				onClick={this.props.onClick}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
