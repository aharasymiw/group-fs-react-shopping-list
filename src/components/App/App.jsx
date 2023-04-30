import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header.jsx'
import ItemInput from '../ItemInput/ItemInput.jsx'
import ListManagement from '../ListManagement/ListManagement.jsx'
import ItemList from '../ItemList/ItemList.jsx'

import './App.css';


function App() {

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        axios({
            method: 'GET',
            url: '/items'
        }).then((response) => {
            const items = response.data;
            console.log('items:', items);
            setItemList(items);

        }).catch((error) => {
            console.log('whoopsie:', error);
        })
    }


    return (
        <div className="App">
            <Header />
            <main>
                <section>
                    <ItemInput fetchItems={fetchItems} />
                </section>
                <section>
                    <ListManagement fetchItems={fetchItems} />
                </section>
                <section className='item-list'>
                    <ItemList itemList={itemList} fetchItems={fetchItems} />
                </section>
            </main>
        </div >
    );
}

export default App;
