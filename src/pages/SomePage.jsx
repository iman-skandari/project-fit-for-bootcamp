import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SomePage = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <div>
            {auth ? (
                <div>
                    <h1>Welcome!</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <h1>Please log in</h1>
            )}
        </div>
    );
};

export default SomePage; 