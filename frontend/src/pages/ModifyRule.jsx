import React, { useState } from 'react';
import axios from 'axios';

const ModifyRule = () => {
    const [ruleId, setRuleId] = useState(''); // State to store the rule ID
    const [newRuleString, setNewRuleString] = useState(''); // State to store the new rule string
    const [response, setResponse] = useState(null); // Store the response from the server
    const [error, setError] = useState(null); // Store errors

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Get JWT token
            const res = await axios.put('http://localhost:5000/api/rules/modify', {
                ruleId,
                ruleString: newRuleString,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in Authorization header
                },
            });

            setResponse(res.data); // Store the response from the server
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to modify rule.');
            setResponse(null); // Clear previous successful response
        }
    };

    return (
        <div className="modify-rule">
            <h2>Modify Rule</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rule ID:
                    <input
                        type="text"
                        value={ruleId}
                        onChange={(e) => setRuleId(e.target.value)}
                        placeholder="Enter Rule ID"
                        required
                    />
                </label>
                <label>
                    New Rule String:
                    <input
                        type="text"
                        value={newRuleString}
                        onChange={(e) => setNewRuleString(e.target.value)}
                        placeholder="Enter new rule (e.g., age > 35 AND salary < 50000)"
                        required
                    />
                </label>
                <button type="submit">Modify Rule</button>
            </form>

            {response && (
                <div>
                    <h3>Rule Modified Successfully</h3>
                    <p><strong>Rule ID:</strong> {response._id}</p>
                    <p><strong>New Rule:</strong> {response.ruleString}</p>
                    <h4>New AST:</h4>
                    <pre>{JSON.stringify(response.ast, null, 2)}</pre>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ModifyRule;
