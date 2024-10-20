const express = require('express');
const router = express.Router();
const { createRule, modifyRule, combineRules, evaluateRule } = require('../controllers/ruleController');
const authMiddleware = require('../middleware/authMiddleware');
const { adminSignIn } = require('../controllers/signIn');

router.post('/create', authMiddleware, createRule);
router.put('/modify', authMiddleware, modifyRule);
router.post('/evaluate',evaluateRule);
router.post('/combine', authMiddleware, combineRules);
router.post('/signin',adminSignIn);

module.exports = router;
