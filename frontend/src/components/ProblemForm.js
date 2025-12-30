// ProblemForm.js
import React, { useState } from 'react';

const ProblemForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        link: '',
        date: '',
        difficulty: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const keyMap = {
            'problemName': 'name',
            'problemLink': 'link',
            'solveDate': 'date',
            'difficulty': 'difficulty'
        };
        const key = keyMap[id] || id;

        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.date || !formData.difficulty) return;

        onAdd({
            ...formData,
            difficulty: parseInt(formData.difficulty)
        });
        setFormData({ name: '', link: '', date: '', difficulty: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="problemName"
                placeholder="Problem Name"
                required
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                type="url"
                id="problemLink"
                placeholder="Problem URL"
                required
                value={formData.link}
                onChange={handleInputChange}
            />
            <input
                type="date"
                id="solveDate"
                required
                value={formData.date}
                onChange={handleInputChange}
            />
            <select
                id="difficulty"
                required
                value={formData.difficulty}
                onChange={handleInputChange}
            >
                <option value="" disabled>Difficulty</option>
                <option value="1">⭐☆☆☆☆</option>
                <option value="2">⭐⭐☆☆☆</option>
                <option value="3">⭐⭐⭐☆☆</option>
                <option value="4">⭐⭐⭐⭐☆</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            <button type="submit">Add Entry</button>
        </form>
    );
};

export default ProblemForm;
