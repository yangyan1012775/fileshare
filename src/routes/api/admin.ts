import * as Express from 'express';
import { Admin } from '../../operations/admin';
const router = Express.Router();


// 获取所有用户信息
router.get('/users', (req: any, res: any) => {
  const admin1 = new Admin(req, res);
  admin1.getUsers(req, res);
});

// 用户操作分区
router.post('/users', (req: any, res: any) => {
  switch (req.body.action) {
    case 'delete':
      deleUser(req, res);
      break;
  }
});

// 删除指定用户
const deleUser = (req: any, res: any) => {
  const admin2 = new Admin(req, res);
  admin2.deleUser(req, res);
};

export default router;
