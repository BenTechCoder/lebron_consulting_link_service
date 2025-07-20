import { Router, Response, Request } from 'express';
import path from 'path';
// import UserRoutes from './UserRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

// ** Add AdminRouter ** //
const adminApp = path.resolve(process.cwd(), 'dist/client/browser/index.html');

// Init router
const AdminRouter = Router();
// const AdminApiRouter = Router();
// AdminApiRouter.get(Paths.Users.Get, UserRoutes.getAll);
// AdminApiRouter.post(Paths.Users.Add, UserRoutes.add);
// AdminApiRouter.put(Paths.Users.Update, UserRoutes.update);
// AdminApiRouter.delete(Paths.Users.Delete, UserRoutes.delete);

AdminRouter.get('/', (_: Request, res: Response) => {
  res.sendFile(adminApp);
});
AdminRouter.get('*splat', (_: Request, res: Response) => {
  res.sendFile(adminApp);
});

// AdminRouter.use(Paths.Admin.Base, apiRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default AdminRouter;
