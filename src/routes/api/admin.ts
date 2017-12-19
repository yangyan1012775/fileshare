import * as Express from 'express';
import { Admin } from '../../operations/admin';
const router = Express.Router();

// 获取所有用户信息
router.get('/users', (req: any, res: any) => {
  const admin1 = new Admin(req, res);
  admin1.getUsers(req, res);
});

// 获取单个用户信息
router.get('/users/:name', (req: any, res: any) => {
  const admin4 = new Admin(req, res);
  admin4.searchUser(req, res);
});

// 用户操作分区
router.post('/users', (req: any, res: any) => {
  switch (req.body.action) {
    case 'delete':
      deleUser(req, res);
      break;
    case 'reset':
      resetPwd(req, res);
      break;
  }
});

// 删除指定用户
const deleUser = (req: any, res: any) => {
  const admin2 = new Admin(req, res);
  admin2.deleUser(req, res);
};

// 重置指定用户的密码为000000(hash)
const resetPwd = (req: any, res: any) => {
  const admin3 = new Admin(req, res);
  admin3.resetPwd(req, res);
};

export default router;
