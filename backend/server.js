import app from './src/app.js';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server backend berjalan di port ${PORT}`);
});