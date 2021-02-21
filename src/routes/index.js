import { Router } from 'express';
import welcomeRoute from './welcome.route';
import personRoute from './person.route';

const routes = Router();

routes.use('/', welcomeRoute);
routes.use('/', personRoute);

export default routes;
