/** @format */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Filter from './filter';
import ContactList from './contact';
import ContactForm from './forms';
import './style.css';

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	};

	static propTypes = {
		name: PropTypes.string,
		number: PropTypes.string,
	};

	componentDidMount = () => {};

	componentDidUpdate = () => {};

	handlerOnChange = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	handlerOnFitred = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	handleAddContact = ({ name, number }) => {
		this.setState(prevState => {
			const newState = {
				contacts: [
					...prevState.contacts,
					{
						id: nanoid(),
						name,
						number,
					},
				],
			};

			return newState;
		});
	};

	handleDelClick = e => {
		this.setState(prevState => {
			const updatedContacts = prevState.contacts.filter(
				contact => contact.id !== e.target.id
			);
			return { contacts: updatedContacts };
		});
	};

	handleClick = ({ target }) => {
		target.style.scale = '0.9';
		setTimeout(() => (target.style.scale = '1'), 80);
	};

	render() {
		return (
			<div className='container'>
				<h1 className='title-name'>Phonebook</h1>

				<ContactForm onSubmitForm={this.handleAddContact} contacts={this.state.contacts} />

				<h2 className='title-name'>Contacts</h2>

				<Filter onFiltred={this.handlerOnFitred} value={this.state.filter} />

				<ContactList
					contacts={this.state.contacts}
					filter={this.state.filter}
					onDeleteContact={this.handleDelClick}
				/>
			</div>
		);
	}
}

export default App;
