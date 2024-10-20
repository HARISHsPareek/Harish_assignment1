const mongoose = require('mongoose');

// Define the rule schema
const ruleSchema = new mongoose.Schema({
    ast: {
        type: Object,   // JSON representation of the AST
        required: true,
        validate: { // Optional validation to ensure ast structure validity
            validator: function (v) {
                // Check if the AST contains the expected structure
                return v && (v.type === 'operator' || v.type === 'operand');
            },
            message: 'Invalid AST structure!'
        }
    },
    ruleString: {
        type: String,  // Original rule as entered by the user
        required: true,
    },
    metadata: { // Optional field to store extra information about the rule
        type: Object,
        default: {}
    },
    createdAt: { // Timestamp for rule creation
        type: Date,
        default: Date.now,
    },
    updatedAt: { // Timestamp for rule update
        type: Date,
        default: Date.now,
    }
});

// Add a pre-save hook to update the 'updatedAt' field automatically
ruleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Rule', ruleSchema);
