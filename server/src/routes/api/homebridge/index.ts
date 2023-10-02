import express from 'express';
import {getHomebridgeDataRouter} from './get';

const router = express.Router();

router.use('/', getHomebridgeDataRotuer);

export { router as homebridgeRouter };
