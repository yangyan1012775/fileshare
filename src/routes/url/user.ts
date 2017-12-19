import * as Express from 'express';
const router = Express.Router();
router.get('/register', (req: any, res: any) => {
  res.render('user/register');
});
router.get('/login', (req: any, res: any) => {
  res.render('user/login');
});

router.get('/info', (req: any, res: any) => {
  res.render('user/info');
});

router.get('/:id', (req: any, res: any) => {
  if (!isNaN(req.params.id)) {
    res.render('user/user');
  } else {
    res.send('404');
  }
});

export default router;
