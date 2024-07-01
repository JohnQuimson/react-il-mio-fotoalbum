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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-fotos">
      {Object.keys(defaultData).map((name, index) => {
        const value = defaultData[name];
        if (Array.isArray(value)) {
          return (
            <div key={`formElement${index}`} className="categories">
              <p className="m-0 form-title">Categorie:</p>
              <ul>
                {categories.map(({ id, name }) => (
                  <li key={`cat${id}`}>
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
                      <span>{name}</span>
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
                <p className="form-title">Visibilità</p>
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
                <label key={`formElement${index}`} className="img-form">
                  <span className="form-title">{name}</span>
                  <input
                    type="file"
                    onChange={(e) => handleField(name, e.target.files[0])}
                  />
                </label>
              );
            }
            return (
              <label key={`formElement${index}`} className="text">
                <p className="form-title">{name}</p>
                <input
                  required
                  name={name}
                  type={typeof value === 'number' ? 'number' : 'text'}
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
              </label>
            );
        }
      })}
      <button className="salva">Salva</button>
    </form>
  );
}
