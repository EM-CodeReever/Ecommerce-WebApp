"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("../routes/api"));
const history = require('connect-history-api-fallback');
const frontendPath = 'app/frontend/dist/';
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use('/api', api_1.default.routes());
console.log(`Currently in ${process.env.NODE_ENV} mode`);
if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from /public');
    console.log("dirname: " + frontendPath + '/index.html');
    app.use(history());
    app.use(express_1.default.static(path_1.default.join(frontendPath, '/')));
    console.log("dirname(this runs): " + frontendPath + '/index.html');
    app.get('/', (req, res) => {
        console.log('Serving index.html');
        res.sendFile(path_1.default.join(frontendPath, '/index.html'));
    });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
// app.route('/')
//     .post((req:Request, res:Response) => {
//         res.send('test');
//     })
//     .get((req:Request, res:Response) => {
//         res.send(generateRandomCode());
//     })
function generateRandomCode() {
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = "";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBdUU7QUFDdkUsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsd0RBQWtDO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDO0FBRTFDLE1BQU0sR0FBRyxHQUFlLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRWxDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QyxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVuRCxNQUFNLFdBQVcsR0FBRztJQUNoQixNQUFNLEVBQUMsR0FBRztJQUNWLFdBQVcsRUFBQyxJQUFJO0lBQ2hCLG1CQUFtQixFQUFDLEdBQUc7Q0FDekIsQ0FBQTtBQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUUzQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUdqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsT0FBTyxDQUFDLENBQUE7QUFFeEQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQTtJQUN2RCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUE7SUFDbEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ2pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQTtDQUNMO0FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpFLGlCQUFpQjtBQUNqQiw2Q0FBNkM7QUFDN0MsNEJBQTRCO0FBQzVCLFNBQVM7QUFDVCw0Q0FBNEM7QUFDNUMsMENBQTBDO0FBQzFDLFNBQVM7QUFFVCxTQUFTLGtCQUFrQjtJQUN2QixJQUFJLFVBQVUsR0FBRyxzQ0FBc0MsQ0FBQztJQUN4RCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFFekMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBRztRQUMzQixNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7S0FDN0U7SUFFRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUMvQixDQUFDIn0=