import * as Express from 'express';
import { error } from 'util';
import { User } from '../../operations/user';
const user = new User();

const router = Express.Router();
router.post('/', (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const data = req.body;
      user.register(data).then((id) => {
        if (!id) {
          res.send('false');
          return;
        }
        res.send('ok');
      });
      break;
    default:
      res.send('error');
  }
});

export default router;
