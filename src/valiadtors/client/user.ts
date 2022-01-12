import {body} from 'express-validator';

export default {
    updateToken: [
        body('token').exists(),
    ],
};
