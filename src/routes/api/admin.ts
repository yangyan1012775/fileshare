import * as Express from 'express';
import { Admin } from '../../operations/admin';
const router = Express.Router();


// 获取所有用户信息
router.get('/users', (req: any, res: any) => {
  const admin1 = new Admin(req, res);
  admin1.getUsers(req, res);
});

export default router;
