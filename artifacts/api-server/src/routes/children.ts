import { Router, type IRouter } from "express";
import { readChildren, sponsorChild } from "../lib/childrenStore";
import { sendDonationNotification } from "../lib/mailer";

const router: IRouter = Router();

router.get("/children", (_req, res) => {
  res.json(readChildren());
});

router.post("/children/:id/sponsor", (req, res) => {
  const { id } = req.params;
  const children = readChildren();
  const child = children.find((c) => c.id === id);
  if (!child) {
    res.status(404).json({ error: "Child not found" });
    return;
  }

  const { donorName, donorEmail, method, message } = req.body as {
    donorName?: string; donorEmail?: string; method?: string; message?: string;
  };

  sponsorChild(id);
  req.log.info({ childId: id, childName: child.name }, "Child sponsored");

  void sendDonationNotification({
    amount: 150,
    donorName: donorName ?? "",
    donorEmail: donorEmail ?? "",
    method: method ?? "other",
    childName: child.name,
    childId: id,
    message,
  });

  res.json({ success: true, childId: id });
});

export default router;
