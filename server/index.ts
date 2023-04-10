import express, {Application, Response, Request, query} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import Routes from "../routes/api"
const history = require('connect-history-api-fallback');
const frontendPath = 'app/frontend/dist/';

const app:Application = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)); 

app.use('/api', Routes.routes());


console.log(`Currently in ${process.env.NODE_ENV} mode`)

if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from /public')
    console.log("dirname: " + frontendPath + '/index.html')
    app.use(history())
    app.use(express.static(path.join(frontendPath, '/')));
    
    app.get('/', (req, res) => {
        console.log('Serving index.html')
        res.sendFile(path.join(frontendPath, '/index.html'));
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.route('/')
//     .post((req:Request, res:Response) => {
//         res.send('test');
//     })
//     .get((req:Request, res:Response) => {
//         res.send(generateRandomCode());
//     })

function generateRandomCode(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var charactersLength = characters.length;

    for ( var i = 0; i < 5 ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.toUpperCase()
}