import * as Express from 'express';
import { User } from '../../operations/user';
const router = Express.Router();
router.post('/', (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const user = new User(req, res);
      // user.register(req, res).then(() => {
      res.send('ok');
      // });
      break;
    default:
      res.send('error');
  }
});
export default router;
