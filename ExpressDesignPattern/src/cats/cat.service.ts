import express, {NextFunction, Request, Response, Router} from "express";
import {Cats, CatType} from "./app.model";

const router: express.Router = Router();


// login middleware
router.use((req: Request, res: Response, next: NextFunction) => {
    next();
})
export const getMain = (req: Request, res: Response) => {
    res.send("hello ts");
};

export const getCats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: res.statusCode,
            data: Cats
        });
    } catch (err) {
        next(err);
    }
};

export const getCatId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const cat = Cats.find(c => {
            return c.id === id;
        });
        if (cat) {
            res.json({data: cat})
        } else {
            res.json({data: "no cat"});
        }
    } catch (err) {
        next(err);
    }
};

export const postCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, age, friend} = req.body;
        const data: CatType = {
            id: (Cats.length + 1).toString(), age, friend, name
        }
        console.log(data)
        Cats.push(data);
        res.send();
    } catch (err) {
        next(err);
    }
};

export const putCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let updateVal;
        Cats.forEach((val, idx) => {
            if (val.id == req.params.id) {
                val = req.body;
                Cats[idx] = val;
                updateVal = val;
            }
        })
        res.json({data: updateVal});

    } catch (err) {
    }
};

export const patchCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const body = req.body;
        console.log(Cats[parseInt(id)]);
        let cat: CatType = Cats[parseInt(id)];
        console.log(cat);
        const resultCat = {...cat, ...body}
        console.log(resultCat);
        Cats[parseInt(id)] = resultCat;
        res.send({data: resultCat});
    } catch (err) {
        next(err);
    }
};

export const deleteCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const delData = Cats.splice(parseInt(id), 1);
        res.json({msg: "delete", data: delData});
    } catch (err) {
        next(err);
    }

};
