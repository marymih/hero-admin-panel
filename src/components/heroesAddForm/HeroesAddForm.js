import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

import { selectAll } from '../heroesFilters/filtersSlice';
import { useAddHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  //states for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [element, setElement] = useState('');

  const [addHero] = useAddHeroMutation();

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name,
      description,
      element,
    };

    addHero(newHero).unwrap();

    // Clear the form after submission
    setName('');
    setDescription('');
    setElement('');
  };

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Elements are loading</option>;
    } else if (status === 'error') {
      return <option>Loading error</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name of the new hero
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="My name is..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="My superpower is..."
          style={{ height: '130px' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Choose the hero's element
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={element}
          onChange={(e) => setElement(e.target.value)}
        >
          <option value="">My element is...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
