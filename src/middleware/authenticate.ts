import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface RequestWithUser extends Request {
  user?: any
}

export default function authenticate(req: RequestWithUser, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res.sendStatus(401)
  }

  try {
    const user = jwt.verify(token as string, process.env.TOKEN_SECRET as string)
    req.user = user

    next()
  } catch (e) {
    return res.sendStatus(403)
  }
}