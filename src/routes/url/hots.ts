import express = require('express');
const router = express.Router();

router.get('/video', (req: any, res: any) => {
  res.render('show');
});

export default router;
