import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart } from '../utils/cartSlice';
import { fetchUsers } from '../utils/userSlice';


const Home = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const items = useSelector((store) => store.cart.item);
    const users = useSelector((store) => store.users);

    console.log('store:', items);
    console.log('users:', users);

    useEffect(() => {
        if (users.status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.status]);

    if (users.status === 'loading') {
        return <h1>Loading Data from Api</h1>;
    } else if (users.status === 'failed') {
        return <h1>{users.error}</h1>;
    }

    return (
        <div className="container">
            <div className="input-group">
                <input 
                    type="text" 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Add an item" 
                />
                <button onClick={() => dispatch(addItem(input))}>Add Item</button>
                <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>

            <ul className="items-list">
                {items.map((val, index) => (
                    <li key={index}>{val}</li>
                ))}
            </ul>

            <ul className="users-list">
                {users.users.map((val, index) => (
                    <li key={index}>{val.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
