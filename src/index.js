import express from 'express';
import morgan from 'morgan';
import homepage from './routes/index';
import { pipeline } from 'stream';

// Init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api', homepage);


// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

// PORT ASSIGNATION
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
