import { defaultDatabases } from './connect';

defaultDatabases();

const migrate = async () => defaultDatabases();

migrate();
