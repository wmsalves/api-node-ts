import { Request, Response } from "express";

interface ICity {
  name: string;
}

export const create = (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);
  return res.send("Create!");
};
