import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        // Call onLogin and wait for it to complete
        // onLogin will handle the verification and only set password if correct
        await onLogin(password);

        // Clear the input field after submission
        setPassword('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>🔐 Admin Access</h2>
                <p>Enter your password to manage problems.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={error ? 'error' : ''}
                        autoFocus
                    />
                    <button type="submit">Unlock</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
