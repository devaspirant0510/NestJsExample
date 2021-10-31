import express, {NextFunction, Request, Response, Router} from "express";
import {Cats, CatType} from "./app.model";
import {getCatId, getCats, getMain, patchCat, postCat, putCat,deleteCat} from "./cat.service";
const router:express.Router = Router();


// login middleware
router.use((req: Request, res: Response, next: NextFunction) => {
    next();
})
router.get("/", getMain);

router.get("/cat", getCats);

router.get("/cat/:id",getCatId);

router.post("/cat",postCat);

router.put("/cat/:id",putCat);

router.patch("/cat/:id",patchCat);

router.delete("/cat/:id",deleteCat);

export default router;