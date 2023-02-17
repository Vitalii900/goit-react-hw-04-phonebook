import { useState } from 'react';
import PropTypes from 'prop-types';
import '../ContactForm/ContactForm.css';


export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('')

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(value)
        break;
      default:
        console.log('Something wrong')
        break;
    }
  };

  const sendData = event => {
    event.preventDefault();
    onSubmit(name, number)
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

    return (
      <form className="form" onSubmit={sendData}>
        <label className="label">
          Name
          <input
            className="input"
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="label">
          Number
          <input
            className="input"
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className="submitButton" type="submit">
          Add contact
        </button>
      </form>
    );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
