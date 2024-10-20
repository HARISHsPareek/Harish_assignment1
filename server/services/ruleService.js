const ASTNode = require('../utils/ASTNode');


// Create an AST from a rule string
function createRule(ruleString) {
    const tokens = tokenize(ruleString); // Simple tokenizer
    return parseTokensToAST(tokens);
}

function tokenize(ruleString) {
    // Add spaces around parentheses to treat them as separate tokens
    return ruleString
        .replace(/\(/g, ' ( ') // Add spaces around '('
        .replace(/\)/g, ' ) ') // Add spaces around ')'
        .trim()
        .split(/\s+/); // Split by spaces
}


//convert to AST
function parseTokensToAST(tokens) {
    let i = 0;

    // Parse the expression
    function parseExpression() {
        let left = parsePrimary();

        // Loop through the tokens and build the tree
        while (i < tokens.length && (tokens[i] === 'AND' || tokens[i] === 'OR')) {
            const operator = tokens[i++];
            const right = parsePrimary();
            const root = new ASTNode('operator', operator);
            root.left = left;
            root.right = right;
            left = root;
        }

        return left;
    }

    // Parse primary expressions (operands or nested expressions inside parentheses)
    function parsePrimary() {
        if (tokens[i] === '(') {
            i++; // Skip the opening parenthesis
            const node = parseExpression(); // Recursively parse the sub-expression
            i++; // Skip the closing parenthesis
            return node;
        } else {
            // Parse a simple operand (e.g., age > 30)
            const attribute = tokens[i++];
            const operator = tokens[i++];
            const value = tokens[i++];

            return new ASTNode('operand', { attribute, operator, value });
        }
    }

    return parseExpression();
}




// Evaluate a rule's AST against data
function evaluateRule(ast, data) {
    if (ast.type === 'operator') {
        const leftResult = evaluateRule(ast.left, data);
        const rightResult = evaluateRule(ast.right, data);

        // Handle logical operators AND and OR
        if (ast.value === 'AND') return leftResult && rightResult;
        if (ast.value === 'OR') return leftResult || rightResult;
    } else if (ast.type === 'operand') {
        const { attribute, operator, value } = ast.value;

        // Check if the data contains the attribute
        if (!data.hasOwnProperty(attribute)) {
            console.error(`Attribute "${attribute}" is missing from the data.`);
            return false; // or throw an error, depending on how you want to handle missing data
        }

        const actualValue = data[attribute];

        // Handle different comparison operators
        switch (operator) {
            case '>': return actualValue > value;
            case '>=': return actualValue >= value;
            case '<': return actualValue < value;
            case '<=': return actualValue <= value;
            case '=': return actualValue === value; // strict equality
            case '!=': return actualValue !== value; // inequality
            default:
                console.error(`Unknown operator "${operator}"`);
                return false;
        }
    }
    return false; // Default case, should not reach here in a valid AST
}


// Function to combine multiple ASTs into a single AST
function combineRules(rules, operator = 'AND') {
    // Error handling: Check if rules array is empty
    if (!Array.isArray(rules) || rules.length === 0) {
        throw new Error('No rules provided for combination.');
    }

    // Parse each rule string into an AST
    const asts = rules.map(ruleString => {
        if (typeof ruleString !== 'string' || ruleString.trim() === '') {
            throw new Error('Invalid rule string provided.');
        }
        return createRule(ruleString); // Convert rule string to AST
    });

    // Combine the ASTs efficiently (balance the tree if possible)
    const combinedAST = combineASTs(asts, operator);
    
    return combinedAST; // Return the root node of the combined AST
}

// Helper function to combine multiple ASTs using a recursive approach
function combineASTs(asts, operator) {
    // If only one AST, return it directly
    if (asts.length === 1) return asts[0];

    // Find the midpoint to balance the AST (minimize height for efficiency)
    const mid = Math.floor(asts.length / 2);

    // Combine the left and right ASTs recursively
    const leftAST = combineASTs(asts.slice(0, mid), operator);
    const rightAST = combineASTs(asts.slice(mid), operator);

    // Create a new operator node (AND/OR) to join the left and right ASTs
    const root = new ASTNode('operator', operator);
    root.left = leftAST;
    root.right = rightAST;

    return root;
}



module.exports = { createRule, evaluateRule, combineRules };
