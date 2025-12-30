import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProblemForm from './components/ProblemForm';
import ProblemList from './components/ProblemList';
import LoginModal from './components/LoginModal';
const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// fetchProblems will be defined inside the App component


function App() {
  const [problems, setProblems] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [password, setPassword] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Theme Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = async (pass) => {
    try {
      const res = await fetch(`${API}/verify-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass })
      });

      // Check response status first
      if (!res.ok) {
        alert("Invalid Password");
        return;
      }

      const data = await res.json();

      // Double-check the success flag
      if (data.success === true) {
        setPassword(pass);
        setIsLoginOpen(false);
      } else {
        alert("Invalid Password");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Verification failed. Please try again.");
    }
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleLock = () => {
    setPassword('');
  };

  const fetchProblems = async () => {
    try {
      const res = await fetch(`${API}/problems`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setProblems(data);
    } catch (err) {
      console.error('Error loading problems:', err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // Add Problem
  const handleAddProblem = async (newProblem) => {
    try {
      await fetch(`${API}/problems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProblem, password })
      });

      await fetchProblems();
    } catch (err) {
      console.error('Error adding problem:', err);
      alert('Failed to add problem. Please try again.');
    }
  };

  // Toggle Complete (no password required)
  const handleToggleComplete = async (id) => {
    const problem = problems.find(p => p._id === id);
    if (!problem) return;

    try {
      await fetch(`${API}/problems/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !problem.completed })
      });
      await fetchProblems();
    } catch (err) {
      console.error('Error updating completion status:', err);
    }
  };

  return (
    <div className="container">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenLogin={handleOpenLogin}
        onLock={handleLock}
        isLoggedIn={!!password}
      />
      {password && <ProblemForm onAdd={handleAddProblem} />}
      <ProblemList problems={problems} onToggle={handleToggleComplete} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      <div className="footer">
        &copy; 2025 LeetCode Tracker. All rights reserved.
      </div>
    </div>
  );
}

export default App;
