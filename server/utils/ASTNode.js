class ASTNode {
    constructor(type, value = null) {
        // Validate that the type is either 'operator' or 'operand'
        if (type !== 'operator' && type !== 'operand') {
            throw new Error(`Invalid node type: ${type}. Must be 'operator' or 'operand'.`);
        }
        this.type = type; // 'operator' or 'operand'
        this.value = value; // AND/OR for operator, or condition object for operand
        this.left = null;   // Left child (used for operator nodes)
        this.right = null;  // Right child (used for operator nodes)

        // If this is an operand node, perform additional validation
        if (this.type === 'operand') {
            this.validateOperand(value);
        }
    }

    // Validation for operand nodes
    validateOperand(value) {
        // Ensure that operand nodes have valid attribute, operator, and value
        if (!value || !value.attribute || !value.operator || value.value === undefined) {
            throw new Error(`Invalid operand value: ${JSON.stringify(value)}`);
        }
    }

    // Method to print the node (useful for debugging)
    printNode() {
        if (this.type === 'operator') {
            return `${this.value} (left: ${this.left ? this.left.printNode() : 'null'}, right: ${this.right ? this.right.printNode() : 'null'})`;
        } else {
            return `${this.value.attribute} ${this.value.operator} ${this.value.value}`;
        }
    }
}

module.exports = ASTNode;
