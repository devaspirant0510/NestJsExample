import express, {Application, ErrorRequestHandler, NextFunction, Request, Response} from "express";
import CatRouter from "./cats/CatRouter";

const PORT: number = 8080 // 포트번호

const data = [1, 2, 3, 4]; // dummy 데이터

class Server {
    public app: Application;
    public PORT:number= 8080;

    constructor() {
        this.app = express();
    }
    setRouter(){
        this.app.use(CatRouter);
    }
    setMiddleware() {
        this.app.set("PORT", PORT);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.setRouter();
        // 404 not Found middleware
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.json({msg: "404 error"});
        });

        // error middleware
        const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
            res.send({status: 404, msg: err.message})
        };

        this.app.use(errorHandler);
    }
    init(){
        this.setMiddleware();
    }
    listen(){
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("server is open");
        });
    }

}

const server = new Server();
server.init();
server.listen()

