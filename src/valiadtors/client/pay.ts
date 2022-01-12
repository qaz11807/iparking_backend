import {param} from 'express-validator';

export default {
    getPayUrl: [
        param('id').exists().toInt(),
    ],
};
