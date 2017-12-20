import * as crypto from 'crypto';
import * as Express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import cb from '../../cb/cb';
import { Admin } from '../../operations/admin';
import { File } from '../../operations/file';
const router = Express.Router();
// 文件操作
router.post('/', (req: any, res: any) => {
  File.setDir(process.env.UPLOAD_DIR);
  const upload = multer({ dest: File.dir });
  upload(req, res, async () => {
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
      case 'permit':
        await Admin.permitFile(req.body.id);
        res.json('审核通过');
        break;
      case 'reject':
        await Admin.rejectFile(req.body.id);
        res.json('审核未通过');
        break;
    }
  });
});

router.get('/', async (req: any, res: any, next: any) => {
  if (req.query.filter === 'pending') {
    const reulst = await Admin.getPendingFiles();
    res.json(reulst);
  } else {
    next();
  }
});

router.get('/', async (req: any, res: any) => {
  const userfiles = new File(req, res);
  await userfiles.getFiles(req, res);
});
router.get('/hots', async (req: any, res: any) => {
  switch (req.query.type) {
    case 'video':
    case 'zip':
    case 'image':
    case 'doc':
      const hot1 = new File(req, res);
      hot1.getType(req, res, req.query.type);
      break;
  }
});

export default router;
