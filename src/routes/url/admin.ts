import * as Express from 'express';
const router = Express.Router();

router.get('/users', (req:any, res:any) => {
  res.render('admin/back-user');
});

/**
 * 文件分类
 */
router.get('/file/category', (req:any, res:any) => {
  res.render('admin/back-file-category');
});

export default router;
