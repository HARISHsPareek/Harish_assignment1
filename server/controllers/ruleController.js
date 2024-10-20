const Rule = require('../models/Rule');
const { createRule, evaluateRule, combineRules } = require('../services/ruleService');

// Create a rule and store it
exports.createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;

        // Validate input
        if (!ruleString) {
            return res.status(400).json({ error: 'Rule string is required.' });
        }

        // Parse the rule into an AST
        const ast = createRule(ruleString);
        
        // Create and save the rule in the database
        const rule = new Rule({ ruleString, ast });
        await rule.save();

        // Respond with the created rule
        res.status(201).json(rule);
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ error: 'Failed to create rule.' });
    }
};

// Evaluate a rule with sample data
exports.evaluateRule = async (req, res) => {
    try {
        const { ruleId, data } = req.body;

        // Validate input
        if (!ruleId || !data) {
            return res.status(400).json({ error: 'ruleId and data are required.' });
        }

        // Fetch the rule from the database
        const rule = await Rule.findById(ruleId);

        // If rule not found, return an error
        if (!rule) {
            return res.status(404).json({ error: 'Rule not found.' });
        }

        // Evaluate the rule against the provided data
        const result = evaluateRule(rule.ast, data);

        // Respond with the evaluation result
        res.status(200).json({ result });
    } catch (error) {
        console.error('Error evaluating rule:', error);
        res.status(500).json({ error: 'Failed to evaluate rule.' });
    }
};

// Combine multiple rules into one
exports.combineRules = async (req, res) => {
    const { rules, operator } = req.body; // 'rules' is an array of rule strings

    try {
        if (!rules || !Array.isArray(rules) || rules.length === 0) {
            return res.status(400).json({ error: 'Please provide an array of rules to combine.' });
        }

        // Default operator is 'AND' if not provided
        const combinedAST = combineRules(rules, operator || 'AND');

        res.status(200).json({ combinedAST });
    } catch (err) {
        console.error('Error combining rules:', err.message);
        res.status(500).json({ error: 'Failed to combine rules.' });
    }
};

exports.modifyRule = async (req, res) => {
    const { ruleId, ruleString } = req.body;

    try {
        const rule = await Rule.findById(ruleId);

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        const ast = createRule(ruleString); // Create new AST from rule string

        rule.ruleString = ruleString;
        rule.ast = ast;

        await rule.save(); // Save modified rule

        res.status(200).json(rule);
    } catch (err) {
        console.error('Error modifying rule:', err.message);
        res.status(500).json({ error: 'Failed to modify rule' });
    }
};
