import '../Filter/Filter.css'
import PropTypes from 'prop-types';

export function Filter({ filter, onChange }) {
  return (
    <label className="label">
      Find contacts by name
      <input
        className="input"
        type="text"
        name="filter"
        onChange={onChange}
        value={filter}
      ></input>
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
