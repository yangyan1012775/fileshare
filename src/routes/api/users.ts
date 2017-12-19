import * as Express from 'express';
const router = Express.Router();

import { User } from '../../operations/user';

router.post('/', async (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const user = new User(req, res);
      await user.register(req, res);
      break;
    default:
      res.send('error');
  }
});
export default router;
