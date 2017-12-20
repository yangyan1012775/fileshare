import * as Express from 'express';
import * as multer from 'multer';
import cb from '../../cb/cb';
import { File } from '../../operations/file';
const router = Express.Router();
const upload = multer({ dest: './__tests__/file' });

// 文件操作
router.post('/', upload, (req: any, res: any) => {
  switch (req.body.action) {
    case 'upload':
      const files = req.files._upload;
      const file = new File(
        files.originalname.split('.')[0],
        files.name.split('.')[0],
      );
      file.upload(req.files._upload, req, res);
      break;
  }
});

export default router;
