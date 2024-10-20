import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import CreateRule from './pages/CreateRule';
import CombineRules from './pages/CombineRules';
import ModifyRule from './pages/ModifyRule';
import EvaluateRule from './pages/EvaluateRule';
import './index.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn setToken={setToken} />} />

                {/* Protected Routes */}
                <Route
                    path="/create-rule"
                    element={
                        <PrivateRoute>
                            <CreateRule />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/combine-rule"
                    element={
                        <PrivateRoute>
                            <CombineRules />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/modify-rule"
                    element={
                        <PrivateRoute>
                            <ModifyRule />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/evaluate-rule"
                    element={
                        <PrivateRoute>
                            <EvaluateRule />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
