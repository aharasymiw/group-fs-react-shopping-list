import { useState } from 'react';
import axios from 'axios';

function ItemInput(props) {

    const [name, setName] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [unit, setUnit] = useState([]);

    const addItem = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: '/items',
            data: { name: name, quantity: quantity, unit: unit }
        }).then((response) => {
            console.log('post response:', response);
            props.fetchItems();
        }).catch((error) => {
            console.log('whoopsie:', error);
        })

        setName('');
        setQuantity('');
        setUnit('');
    }

    return (
        <>
            <h2>Add an Item</h2>
            <form onSubmit={addItem}>
                <label for="name">Item: </label>
                <input value={name} type="text" maxLength="80" onChange={(event) => { setName(event.target.value) }} />
                <br />
                <label for="quantity">Quantity: </label>
                <input value={quantity} type="number" onChange={(event) => { setQuantity(event.target.value) }} />
                <label for="unit">Unit: </label>
                <input value={unit} type="text" maxLength="20" onChange={(event) => { setUnit(event.target.value) }} />
                <br />
                <button type="submit">Save</button>
            </form>
        </>
    );
}

// onClick={() => { addItem(name, quantity, unit) }}

export default ItemInput;
