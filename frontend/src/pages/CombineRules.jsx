import React, { useState } from 'react';
import axios from 'axios';

const CombineRules = () => {
    const [rules, setRules] = useState(['']);
    const [operator, setOperator] = useState('AND');
    const [combinedAST, setCombinedAST] = useState(null);
    const [error, setError] = useState(null);

    const handleAddRule = () => {
        setRules([...rules, '']); // Add an empty rule input
    };

    const handleRuleChange = (index, value) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');

            // Send request with JWT token in the Authorization header
            const response = await axios.post(
                'http://localhost:5000/api/rules/combine',
                { rules, operator },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include JWT token in the header
                    },
                }
            );
            setCombinedAST(response.data.combinedAST);
            setError(null);
        } catch (err) {
            setError('Failed to combine rules. Authorization error or server issue.');
        }
    };

    return (
        <div className="combine-rules">
            <h2>Combine Rules</h2>
            <form onSubmit={handleSubmit}>
                <label>Operator:
                    <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                    </select>
                </label>

                {rules.map((rule, index) => (
                    <div key={index}>
                        <label>Rule {index + 1}:</label>
                        <input
                            type="text"
                            value={rule}
                            onChange={(e) => handleRuleChange(index, e.target.value)}
                            placeholder="Enter rule string"
                            required
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddRule}>Add Rule</button>
                <button type="submit">Combine Rules</button>
            </form>

            {combinedAST && (
                <div>
                    <h3>Combined AST</h3>
                    <pre>{JSON.stringify(combinedAST, null, 2)}</pre> {/* Display the combined AST */}
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CombineRules;
