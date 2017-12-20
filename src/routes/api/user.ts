import * as Express from 'express';
import { error } from 'util';
import { User } from '../../operations/user';
const user = new User();

const router = Express.Router();
router.post('/', async (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const data = req.body;
      const id = await user.register(data);
      if (!id) {
        res.send('false');
        return;
      }
      res.send('ok');
      break;
    default:
      res.send('error');
  }
});

export default router;
