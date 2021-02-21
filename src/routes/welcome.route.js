import { Router } from 'express';
import db from '../database/neo4jApi';

const welcomeRoute = Router();

welcomeRoute.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'This works!',
  });
});

export default welcomeRoute;
