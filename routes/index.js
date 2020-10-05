const router = require('express');
const apiRoutes = require('./api');

router.request('/api', apiRoutes);

router.request((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;