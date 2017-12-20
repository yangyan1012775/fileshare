import * as Express from 'express';
const router = Express.Router();
import { Hot } from '../../operations/hotfile';
router.get('/video', (req: any, res: any) => {
  const hot1 = new Hot(req, res);
  hot1.getVideo(req, res);
});

export default router;
