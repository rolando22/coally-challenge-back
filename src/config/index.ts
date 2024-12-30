import 'dotenv/config';

interface Config {
	port: string | number;
	host: string;
	database: string;
	dbPort: string;
	jwtSecret: string;
	mongoUser: string;
	mongoPassword: string
}

export const config: Config = {
	port: process.env.PORT || 3000,
	jwtSecret: process.env.JWT_SECRET || 'secret',
	mongoUser: process.env.MONGO_USERNAME || '',
	mongoPassword: process.env.MONGO_PASSWORD || '',
	host: process.env.HOST || '',
	database: process.env.DATABASE || '',
	dbPort: process.env.PORT_DB || '',
};
