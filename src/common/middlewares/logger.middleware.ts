import { Logger } from '@src/shared/utils/logger';

export function logger(
  req: { method: any; originalUrl: any; ip: any },
  res: { statusCode: any },
  next: () => void,
) {
  const statusCode = res.statusCode;
  const logFormat = `${req.method} ${req.originalUrl} ip: ${req.ip} statusCode: ${statusCode}`;

  next();

  if (statusCode >= 500) {
    Logger.error(logFormat);
  } else if (statusCode >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.log(logFormat);
  }
}
