const express = require('express');
const auth = require('../routes/auth');
const npcs = require('../routes/npcs');
const health = require('../routes/health');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/npcs/', npcs);
    app.use('/api/health/', health);
}