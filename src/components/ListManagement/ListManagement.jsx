import axios from 'axios';

function ListManagement(props) {
    const reset = (event) => {
        event.preventDefault();

        console.log("deleting!");

        axios({
            method: 'DELETE',
            url: '/items',
        }).then((response) => {
            console.log("deleted!");
            props.fetchItems();
        }).catch((error) => {
            console.log('whoopsie:', error);
        })
    }

    const clear = (event) => {
        event.preventDefault();

        console.log("clearing!");

        axios({
            method: 'PUT',
            url: '/items',
        }).then((response) => {
            console.log("UPDATED!");
            props.fetchItems();
        }).catch((error) => {
            console.log('whoopsie:', error);
        })

    }

    return (
        <>
            <h2>Shopping List</h2>
            <button type="button" onClick={reset}>Reset</button>
            <button type="button" onClick={clear}>Clear</button>
        </>
    );
}

export default ListManagement;
