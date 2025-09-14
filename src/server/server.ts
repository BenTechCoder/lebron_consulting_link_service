import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import AdminRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';
import { extractLinkFromWp } from './services/wp';
import { WpLinkRequest } from './models/common/types/wp.model';
import { Link } from './models/common/types/link.model';
import {
  insertLink,
  queryLink,
} from './services/database';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env['DISABLE_HELMET']) {
    app.use(helmet());
  }
}
app.use(
  Paths.Admin.Base,
  express.static(path.resolve(process.cwd(), 'dist/client/browser'))
);

// Add APIs, must be after middleware
app.use(Paths.Admin.Base, AdminRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

app.get('/', (req: Request, res: Response) => {
  res.redirect('https://www.lebronconsulting.tech/');
});

app.get('/:link', (req: Request, res: Response) => {
  res.redirect(301, queryLink(req.params['link']));
});

app.post(Paths.wp, async (req: Request, res: Response) => {
  const link: Link = await extractLinkFromWp(req.body as WpLinkRequest);
  insertLink(link);
  res.send(req.body);
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
