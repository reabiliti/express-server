import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const getLogsPath = () => {
  const rootPath: string = path.dirname(require.main.filename)
  const logsDir: string = path.join(rootPath, '..', 'logs')

  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

  return path.join(logsDir, 'app.log')
}

const accessLogStream = fs.createWriteStream(getLogsPath(), {
  flags: 'a',
})

export const getMorgan = () => morgan('combined', { stream: accessLogStream })
