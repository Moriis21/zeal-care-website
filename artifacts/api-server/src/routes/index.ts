import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donationsRouter from "./donations";
import childrenRouter from "./children";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donationsRouter);
router.use(childrenRouter);

export default router;
