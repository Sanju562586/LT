// ProblemList.js
import React from 'react';
import StarRating from './StarRating';

const ProblemList = ({ problems, onToggle }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="checkbox-cell">✓</th>
                        <th>#</th>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Date Solved</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((p, index) => (
                        <tr key={p._id} className={p.completed ? 'completed' : ''}>
                            <td className="checkbox-cell">
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={p.completed}
                                    onChange={() => onToggle(p._id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
                            <td>
                                <a href={p.link} target="_blank" rel="noopener noreferrer">Link</a>
                            </td>
                            <td>
                                {new Date(p.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                            </td>
                            <td><StarRating count={p.difficulty} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProblemList;
