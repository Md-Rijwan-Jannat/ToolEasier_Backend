import { Router } from "express";
import { UserRoutes } from "../module/User/user.route";
import { ParaphraseRoutes } from "../module/Paraphrase/paraphrase.route";
import { PollsRoutes } from "../module/Polls/polls.route";
import { FaceSwapRoutes } from "../module/FaceSwap/faceswap.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/paraphrase",
    route: ParaphraseRoutes,
  },
  {
    path: "/polls",
    route: PollsRoutes,
  },
  {
    path: "/face-swap",
    route: FaceSwapRoutes,
  },
];

// This will automatically loop your routes that you will add in the moduleRoutes array
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
