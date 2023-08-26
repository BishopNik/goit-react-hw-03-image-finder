/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ContactList extends Component {
	static propTypes = {
		contacts: PropTypes.arrayOf(
			PropTypes.exact({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				number: PropTypes.string.isRequired,
			})
		).isRequired,
		filter: PropTypes.string,
		onDeleteContact: PropTypes.func.isRequired,
	};

	render() {
		return (
			<>
				{this.props.contacts
					.filter(contact => {
						const searchName = contact.name.toLowerCase();
						const filterName = this.props.filter.toLowerCase();
						return searchName.includes(filterName);
					})
					.map(({ id, name, number }) => (
						<div className='contact-containet' key={id}>
							<p className='contact'>
								{name} {number}
							</p>
							<button
								id={id}
								className='del-button button'
								type='submit'
								onClick={this.props.onDeleteContact}
							>
								Delete
							</button>
						</div>
					))}
			</>
		);
	}
}

export default ContactList;
