
process.env.PORT = process.env.PORT || 7070;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if(process.env.NODE_ENV == 'dev')
    process.env.MONGO_DB = 'mongodb://localhost:27017/banco';
else process.env.MONGO_DB = process.env.DB_URL;