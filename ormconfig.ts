import config from 'config'

const ormConfig = {
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  synchronize: false,
  logging: true,
  entities: ['src/entity/**/*.ts', './entity/**/*.js'],
  migrations: ['src/migration/**/*.ts', './migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts', './subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}

export default ormConfig
