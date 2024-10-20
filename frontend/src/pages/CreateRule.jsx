import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRule } from '../services/api';

const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false); // To show the success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createRule(ruleString);
            setResponse(res); // Save the response to display the AST
            setError(null); // Clear any previous errors
            setShowMessage(true); // Show success message
            toast.success('Rule has been created successfully!');
            // Optionally, you can reset the form after submission:
            setRuleString('');
        } catch (err) {
            setError('Failed to create rule. Please enter in correct format,\n operator or operand might be missing');
            setShowMessage(false); // Hide message on error
        }
    };

    // Function to render the AST recursively
    const renderAST = (node) => {
        if (!node) return null;
        if (node.type === 'operator') {
            return (
                <li>
                    <strong>{node.value}</strong>
                    <ul>
                        {renderAST(node.left)}
                        {renderAST(node.right)}
                    </ul>
                </li>
            );
        } else if (node.type === 'operand') {
            return (
                <li>
                    {node.value.attribute} {node.value.operator} {node.value.value}
                </li>
            );
        }
        return null;
    };

    return (
        
        <div className="create-rule">
            <ToastContainer />
            <h2>Create Rule</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rule String:
                    <input
                        type="text"
                        value={ruleString}
                        onChange={(e) => setRuleString(e.target.value)}
                        placeholder="Enter rule (e.g., age > 30 AND salary < 50000)"
                        required
                    />
                </label>
                <button type="submit">Create Rule</button>
            </form>

            {showMessage && (
                <div className="success-message">
                    
                    <p><strong>Rule ID:</strong> {response._id}</p> 
                </div>
            )}

            {response && (
                <div>
                    <h3>Generated AST</h3>
                    <ul>{renderAST(response.ast)}</ul> {/* Render the AST */}
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateRule;
