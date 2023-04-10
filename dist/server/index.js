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
const frontendPath = 'frontend/dist';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBdUU7QUFDdkUsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsd0RBQWtDO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQztBQUVyQyxNQUFNLEdBQUcsR0FBZSxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUVsQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFdEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbkQsTUFBTSxXQUFXLEdBQUc7SUFDaEIsTUFBTSxFQUFDLEdBQUc7SUFDVixXQUFXLEVBQUMsSUFBSTtJQUNoQixtQkFBbUIsRUFBQyxHQUFHO0NBQ3pCLENBQUE7QUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFHakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxDQUFBO0FBRXhELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtJQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUE7SUFDdkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFBO0lBQ2xFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNqQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUE7Q0FDTDtBQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVqRSxpQkFBaUI7QUFDakIsNkNBQTZDO0FBQzdDLDRCQUE0QjtBQUM1QixTQUFTO0FBQ1QsNENBQTRDO0FBQzVDLDBDQUEwQztBQUMxQyxTQUFTO0FBRVQsU0FBUyxrQkFBa0I7SUFDdkIsSUFBSSxVQUFVLEdBQUcsc0NBQXNDLENBQUM7SUFDeEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2YsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRXpDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUc7UUFDM0IsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0tBQzdFO0lBRUQsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDL0IsQ0FBQyJ9