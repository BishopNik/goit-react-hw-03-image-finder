/** @format */

import PropTypes from 'prop-types';

const Button = ({ className, type, onClick, children }) => {
	return (
		<button className={className} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

Button.propTypes = {
	class: PropTypes.string,
	type: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

export default Button;
