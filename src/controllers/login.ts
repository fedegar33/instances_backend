import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { default as validUsers } from '../validUsers.json'

export function login(req: Request, res: Response) {
  try {
    const { username, password} = req.body
    const foundUser = validUsers.find(u => u.username === username && u.password === password)

    if (foundUser) {
      const token = jwt.sign({ username }, process.env.TOKEN_SECRET as string, { expiresIn: '5m' })
      res.json(token)
    } else {
      res.status(401).send('Invalid username/password combination.')
    }
  } catch (err) {
    res.sendStatus(500)
  }
}
