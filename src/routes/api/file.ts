import * as Express from 'express';
import { Files } from '../../operations/file';
const router = Express.Router();

// 文件操作
router.post('/', (req: any, res: any) => {
  switch (req.body.action) {
    case 'upload':
      const files = req.files._upload;
      const file = new Files(files.originalname, files.name);
      file.upload(req.files, req, res);
      break;
  }

});

export default router;

