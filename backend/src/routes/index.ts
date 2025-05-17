import { Request, Response, Router } from "express";
const router = Router();

console.log("Index router carregado");

router.get("/", function (req: Request, res: Response) {
  console.log("GET / chamado");
  res.json({ title: "App" });
});

export default router;