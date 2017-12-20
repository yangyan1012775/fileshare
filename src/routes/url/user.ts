import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import queryFile from '../../db/queryFile';
import { File } from '../../operations/file';
const router = Express.Router();

router.get('/download', (req: any, res: any) => {
  const id = path.normalize(req.query.id);
  queryFile(id).then((result) => {
    const down = new File(result.filename, result.hash);
    down.download(res);
  });
});

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
