import { Router, type IRouter } from "express";
import { readContentAsync, patchContentAsync, type SiteContent } from "../lib/siteContentStore";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

// Public — returns full site content (with KV persistence on Vercel)
router.get("/site-content", (_req, res, next) => {
  readContentAsync()
    .then((content) => res.json(content))
    .catch(next);
});

// Admin — deep-merges a partial patch and persists it
router.put("/admin/site-content", requireAdmin, (req, res, next) => {
  const patch = req.body as Partial<SiteContent>;
  patchContentAsync(patch)
    .then((updated) => res.json({ success: true, content: updated }))
    .catch(next);
});

export default router;
