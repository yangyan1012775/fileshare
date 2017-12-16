import * as Express from 'express';
const router = Express.Router();

router.get('/users', (req:any, res:any) => {
  res.render('admin/back-user');
});

export default router;
