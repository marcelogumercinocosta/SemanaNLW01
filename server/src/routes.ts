import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'


const routes = express.Router(); 
const pointCotroller = new PointsController();
const itemsCotroller = new ItemsController();
const upload = multer(multerConfig);

routes.get('/items', itemsCotroller.index);
routes.get('/points/', pointCotroller.index);
routes.get('/points/:id', pointCotroller.show);
routes.post('/points',
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.number().required(),
            longitude: Joi.number().required(),
            latitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }), 
    pointCotroller.create  
);

export default routes;