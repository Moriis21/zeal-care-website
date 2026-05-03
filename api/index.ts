/**
 * Vercel Serverless Function entry point.
 *
 * Vercel routes all /api/* requests here (see vercel.json rewrites).
 * The Express app handles routing internally via app.use("/api", router).
 */
import app from "../artifacts/api-server/src/app";

export default app;
