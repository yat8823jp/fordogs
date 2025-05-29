import { useState } from 'react'
import './App.css'

const Form = () => {
  const ingredients = [
    { id: 'protein',  name: 'プロテイン', value: '' },
    { id: 'lipid',    name: '脂質',      value: '' },
    { id: 'fiber',    name: '粗繊維',    value: '' },
    { id: 'ash',      name: '灰分',      value: '' },
    { id: 'moisture', name: '水分',      value: '' }
  ];

  const [formValues, setFormValues] = useState(
    ingredients.reduce((acc, ingredient) => ({
      ...acc,
      [ingredient.id]: ''
    }), {})
  );

  const handleChange = ( event ) => {
    const { id, value } = event.target;
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = ( event ) => {
    event.preventDefault();
    const total = Object.values(formValues).reduce((sum, value) => {
      return sum + (Number(value) || 0);
    }, 0);
    
    const calculatedResult = (100 - total);
    const resultField = document.getElementById('result');
    if (resultField) {
      resultField.value = Math.floor(calculatedResult);
    }
  }

  const Input = ( { id, name } ) => {
    return (
      <li className="flex items-center mb-4">
        <h2 className="w-32 text-right mr-2">
          <label htmlFor={id}>{name}</label>
        </h2>
        <input
          type="number"
          id={id}
          name={id}
          className="border border-orange-400 p-1"
          value={formValues[id]}
          onChange={handleChange}
        />
      </li>
    );
  }

  const inputList = ingredients.map((ingredient) => (
    <Input
      key={ingredient.id}
      id={ingredient.id}
      name={ingredient.name}
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {inputList}
      </ul>
      <button type="submit">
        計算開始
      </button>
    </form>
  )
}

const App =() => {
  return (
    <>
      <h1 className="mb-12">Fat calculator</h1>
      <div>
        <div className="flex items-center justify-center mb-2">
          <span>
            糖質：
          </span>
          <input 
            id="result" 
            type="text" 
            className="border border-amber-600 p-1" 
            placeholder="糖質が自動計算されます"
            readOnly 
          />
          <span className="ml-2">
            %
          </span>
        </div>
        <p className="ml-2 mb-8 text-sm">
          = ( 100 - ( タンパク質 + 脂質 + 粗繊維 + 灰分 + 水分 ) )
        </p>
        <Form />
      </div>
    </>
  )
}

export default App
