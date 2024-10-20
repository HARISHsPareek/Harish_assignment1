import React, { useState } from 'react';
import { evaluateRule } from '../services/api';

const EvaluateRule = () => {
    const [ruleId, setRuleId] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(data); // Convert string input to object
            const res = await evaluateRule(ruleId, parsedData);
            setResult(res.result);
            setError(null); // Clear previous errors
        } catch (err) {
            setError('Failed to evaluate rule. Ensure the data format is correct.');
        }
    };

    return (
        <div className="evaluate-rule">
            <h2>Evaluate Rule</h2>
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
                    Data (JSON format):
                    <textarea
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder='Enter data (e.g., {"age": 35, "salary": 45000})'
                        required
                    />
                </label>
                <button type="submit">Evaluate Rule</button>
            </form>

            {result !== null && (
                <div>
                    <h3>Evaluation Result</h3>
                    <p>{result ? 'True' : 'False'}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default EvaluateRule;
