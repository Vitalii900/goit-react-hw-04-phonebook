import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../components/App.css';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  reset = () => {
    this.setState({
      filter: '',
    });
  };

  formSubmitHandler = data => {
    this.setState(prevState => {
      const prevContacts = prevState.contacts;
      const contactId = nanoid();
      const findRepeateName = prevContacts.find(contact => {
        return contact.name.includes(data.name);
      });
      if (findRepeateName) {
        alert(`${findRepeateName.name} is already in contacts`);
        return;
      }
      return {
        contacts: [
          ...prevContacts,
          { id: contactId, name: data.name, number: data.number },
        ],
      };
    });
    this.reset();
  };

  handleFilterInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterInput}></Filter>
        {contacts.length !== 0 && (
          <ContactList
            deleteContact={this.deleteContact}
            filter={filter}
            contacts={contacts}
          ></ContactList>
        )}
      </div>
    );
  }
}
