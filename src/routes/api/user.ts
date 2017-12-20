import * as Express from 'express';
import * as multer from 'multer';
import { error } from 'util';
import { Files } from '../../operations/files';
import { User } from '../../operations/user';
const user = new User();

const router = Express.Router();
router.post('/', async (req: any, res: any) => {
  switch (req.body.action) {
    case 'register':
      const data = req.body;
      const id = await user.register(data);
      if (!id) {
        res.send('false');
        return;
      }
      res.send('ok');
      break;
    default:
      res.send('error');
  }
});

// 文件操作
router.get('/:id/allFiles', (req: any, res: any) => {
  const all = new Files(req, res);
  all.getAllByUserId(req, res);
});
router.get('/:id/image', (req: any, res: any) => {
  const image = new Files(req, res);
  image.getImagesByUserId(req, res);
});
router.get('/:id/text', (req: any, res: any) => {
  const text = new Files(req, res);
  text.getTextByUserId(req, res);
});
router.get('/:id/video', (req: any, res: any) => {
  const video = new Files(req, res);
  video.getVideoByUserId(req, res);
});
router.get('/:id/zip', (req: any, res: any) => {
  const zip = new Files(req, res);
  zip.getZipByUserId(req, res);
});
router.get('/:id/other', (req: any, res: any) => {
  const other = new Files(req, res);
  other.getOtherByUserId(req, res);
});
router.get('/:id/unchecked', (req: any, res: any) => {
  const unchecked = new Files(req, res);
  unchecked.getUncheckedByUserId(req, res);
});

export default router;
