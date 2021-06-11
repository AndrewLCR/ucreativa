const { Router } = require('express');
const router = Router();

// root
router.get('/', (req, res) => {
    res.json(
        {
            "message": "Up & running!"
        }
    )
});

module.exports = router;