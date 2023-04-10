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
    app.use(history());
    app.use(express_1.default.static(path_1.default.join(__dirname, '/public/')));
    app.get('/', (req, res) => {
        console.log('Serving index.html');
        res.sendFile(path_1.default.join(__dirname, '/public/index.html'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBdUU7QUFDdkUsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsd0RBQWtDO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXhELE1BQU0sR0FBRyxHQUFlLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRWxDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QyxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVuRCxNQUFNLFdBQVcsR0FBRztJQUNoQixNQUFNLEVBQUMsR0FBRztJQUNWLFdBQVcsRUFBQyxJQUFJO0lBQ2hCLG1CQUFtQixFQUFDLEdBQUc7Q0FDekIsQ0FBQTtBQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUUzQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUdqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsT0FBTyxDQUFDLENBQUE7QUFFeEQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0lBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDakMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUE7Q0FDTDtBQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVqRSxpQkFBaUI7QUFDakIsNkNBQTZDO0FBQzdDLDRCQUE0QjtBQUM1QixTQUFTO0FBQ1QsNENBQTRDO0FBQzVDLDBDQUEwQztBQUMxQyxTQUFTO0FBRVQsU0FBUyxrQkFBa0I7SUFDdkIsSUFBSSxVQUFVLEdBQUcsc0NBQXNDLENBQUM7SUFDeEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRXpDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUc7UUFDM0IsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0tBQzdFO0lBRUQsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDL0IsQ0FBQyJ9