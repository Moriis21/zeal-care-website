import { Router, type IRouter } from "express";
import { readContent, patchContent, type SiteContent } from "../lib/siteContentStore";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

router.get("/site-content", (_req, res) => {
  res.json(readContent());
});

router.put("/admin/site-content", requireAdmin, (req, res) => {
  const patch = req.body as Partial<SiteContent>;
  const updated = patchContent(patch);
  res.json({ success: true, content: updated });
});

export default router;
