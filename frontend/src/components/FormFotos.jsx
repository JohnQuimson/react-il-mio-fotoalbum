import { useState } from 'react';
import { useGlobal } from '../contexts/GlobalContext';

export default function FormFotos({ initialData, onSubmit }) {
  const { categories } = useGlobal();

  const defaultData = initialData || {
    title: '',
    description: '',
    img: '',
    visible: true,
    categories: [],
  };

  const [formData, setFormData] = useState(defaultData);

  const handleField = (name, value) => {
    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the backend
    console.log('FormData', formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(defaultData).map((name, index) => {
        const value = defaultData[name];
        if (Array.isArray(value)) {
          return (
            <div key={`formElement${index}`}>
              <p>Categorie:</p>
              <ul>
                {categories.map(({ id, name }, index) => (
                  <li key={`cat${index}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(id)}
                        onChange={() => {
                          const curr = formData.categories;
                          const newCategories = curr.includes(id)
                            ? curr.filter((el) => el !== id)
                            : [...curr, parseInt(id)];
                          handleField('categories', newCategories);
                        }}
                      />
                      {name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        switch (typeof value) {
          case 'boolean':
            return (
              <label key={`formElement${index}`}>
                {name}
                <input
                  name={name}
                  type="checkbox"
                  checked={formData[name]}
                  onChange={(e) => handleField(name, e.target.checked)}
                />
              </label>
            );
          default:
            if (name === 'img') {
              return (
                <label key={`formElement${index}`}>
                  {name}
                  <input
                    type="file"
                    onChange={(e) => handleField(name, e.target.files[0])}
                  />
                </label>
              );
            }
            return (
              <input
                key={`formElement${index}`}
                required
                name={name}
                type={typeof value === 'number' ? 'number' : 'text'}
                placeholder={name}
                value={formData[name] || ''}
                onChange={(e) =>
                  handleField(
                    name,
                    typeof value === 'number'
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              />
            );
        }
      })}
      <button>Salva</button>
    </form>
  );
}
