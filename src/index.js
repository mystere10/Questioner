import express from 'express';

import homepage from './routes/index';

// Init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', homepage);


// PORT ASSIGNATION
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
