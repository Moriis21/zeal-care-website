import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donationsRouter from "./donations";
import childrenRouter from "./children";
import adminRouter from "./admin";
import newsletterRouter from "./newsletter";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donationsRouter);
router.use(childrenRouter);
router.use(adminRouter);
router.use(newsletterRouter);
router.use(contactRouter);

export default router;
