import * as crypto from 'crypto';
import * as Express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import cb from '../../cb/cb';
import { File } from '../../operations/file';
const router = Express.Router();
// 文件操作
router.post('/', (req: any, res: any) => {
  File.setDir(process.env.UPLOAD_DIR);
  const upload = multer({ dest: File.dir });
  upload(req, res, () => {
    switch (req.body.action) {
      case 'upload':
        const files = req.files._upload;
        const oldpath = path.resolve(process.env.UPLOAD_DIR, files.name);
        fs.readFile(
          oldpath,
          cb((data: any) => {
            const hash = crypto.createHash('sha256');
            hash.update(data);
            const hashed = hash.digest('hex');
            const newpath = path.resolve(
              process.env.UPLOAD_DIR,
              hashed + '.' + files.extension,
            );
            fs.renameSync(oldpath, newpath);
            const file = new File(files.originalname, hashed);
            file.upload(req.files._upload, req, res);
          }),
        );
        break;
    }
  });
});

export default router;
