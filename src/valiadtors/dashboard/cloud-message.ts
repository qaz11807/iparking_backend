import {body} from 'express-validator';

export default {
    simulateEnter: [
        body('license').exists(),
    ],
    simulateExit: [
        body('license').exists(),
    ],
};
