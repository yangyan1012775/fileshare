import * as Express from 'express';
import { error } from 'util';
import { User } from '../../operations/user';
const user = new User();

const router = Express.Router();
router.post('/', async (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const id = await user.register(req.body);
      if (!id) {
        res.send('false');
        return;
      }
      res.send('ok');
      break;
    case 'login':
      const userInfo = await user.login(req.body);
      if (!userInfo) {
        res.send('false');
        return;
      }
      res.json(userInfo);
      break;
    default:
      res.send('error');
  }
});

export default router;
