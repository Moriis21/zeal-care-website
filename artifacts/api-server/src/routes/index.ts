import { Router, type IRouter } from "express";
import healthRouter from "./health";
import donationsRouter from "./donations";
import childrenRouter from "./children";
import adminRouter from "./admin";
import newsletterRouter from "./newsletter";
import contactRouter from "./contact";
import siteContentRouter from "./siteContent";

const router: IRouter = Router();

router.use(healthRouter);
router.use(donationsRouter);
router.use(childrenRouter);
router.use(adminRouter);
router.use(newsletterRouter);
router.use(contactRouter);
router.use(siteContentRouter);

export default router;
