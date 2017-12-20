import * as Express from 'express';
import * as multer from 'multer';
import cb from '../../cb/cb';
import { File } from '../../operations/file';
const router = Express.Router();
// 文件操作
router.post('/', (req: any, res: any) => {
  const upload = multer({ dest: File.dir });
  upload(req, res, () => {
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
});

export default router;
