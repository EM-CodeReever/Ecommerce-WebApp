"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const tslog_1 = require("tslog");
const logger = new tslog_1.Logger();
const prisma = new client_1.PrismaClient();
class Routes {
    static routes() {
        const router = (0, express_1.Router)();
        router.get('/test', (req, res) => {
            res.send('test');
        });
        router.get('/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany();
            res.send(products);
        }));
        router.post('/product', (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger.info('Creating new product');
            logger.info(req.body);
            const product = yield prisma.product.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    thumbnail: "",
                    category: {
                        connect: {
                            id: req.body.categoryId
                        },
                    },
                    rating: 0,
                }
            });
            logger.info('Created new product with id: ' + product.id);
            res.send({ id: product.id });
        }));
        router.post('/image', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.isThumbnail) {
                try {
                    logger.info('Writing new thumbnail to database');
                    logger.info(req.body);
                    const product = yield prisma.product.update({
                        where: {
                            id: req.body.productId
                        },
                        data: {
                            thumbnail: req.body.image
                        }
                    });
                    logger.info('New thumbnail written to Database for product with ID: [' + product.id + ']');
                }
                catch (e) {
                    logger.error(e);
                }
            }
            else {
                try {
                    logger.info('Writing new image to database');
                    logger.info(req.body);
                    const images = yield prisma.images.create({
                        data: {
                            url: req.body.image,
                            product: {
                                connect: {
                                    id: Number(req.body.productId)
                                }
                            }
                        }
                    });
                    logger.info('New image written to Database with ID: [' + images.id + '] for product with ID: [' + images.productId + ']');
                    res.send({ id: images.id });
                }
                catch (err) {
                    logger.error(err);
                }
            }
        }));
        router.get('/product/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger.info('Retrieving product with id: ' + req.params.id);
            try {
                const product = yield prisma.product.findUnique({
                    where: {
                        id: Number(req.params.id)
                    },
                    include: {
                        // category: true,
                        images: true,
                        reviews: true,
                    }
                });
                res.send(product);
            }
            catch (err) {
                logger.error(err);
            }
        }));
        router.get('/categories', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.category.findMany();
            logger.info('Retrieved all categories');
            res.send(categories);
        }));
        router.get('/category/:categoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.product.findMany({
                where: {
                    categoryId: Number(req.params.categoryId)
                }
            });
            logger.info('Retrieved all products from category with id: ' + req.params.categoryId);
            logger.info(products);
            res.send(products);
        }));
        router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let loginResponse;
            const user = yield prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                const passwordMatch = yield bcrypt_1.default.compare(req.body.password, user.passwordHash);
                if (passwordMatch) {
                    user.passwordHash = '';
                    loginResponse = {
                        status: true,
                        user,
                        message: 'Login successful'
                    };
                    //Remember to remove passwordHash from user object before sending it to client
                    //also remember to create login response type and login request type or interface
                }
                else {
                    loginResponse = {
                        status: false,
                        user: null,
                        message: 'Wrong password'
                    };
                }
            }
            else {
                loginResponse = {
                    status: false,
                    user: null,
                    message: 'User not found'
                };
            }
            res.send(loginResponse);
        }));
        router.get('/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            res.send(users);
        }));
        router.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let loginResponse;
            let incomingUser = req.body;
            const user = yield prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                loginResponse = {
                    status: false,
                    user: null,
                    message: 'User already exists'
                };
            }
            else {
                const passwordHash = yield bcrypt_1.default.hash(incomingUser.passwordHash, 10);
                const newUser = yield prisma.user.create({
                    data: {
                        email: incomingUser.email,
                        passwordHash: passwordHash,
                        firstName: incomingUser.firstName,
                        lastName: incomingUser.lastName,
                        phoneNumber: incomingUser.phoneNumber,
                        role: incomingUser.role,
                        dateOfBirth: new Date(incomingUser.dateOfBirth),
                        gender: incomingUser.gender,
                    }
                });
                const cart = yield prisma.cart.create({
                    data: {
                        userId: newUser.id,
                        cartItems: {
                            create: []
                        },
                        total: 0
                    }
                });
                loginResponse = {
                    status: true,
                    user: newUser,
                    message: 'User created'
                };
            }
            res.send(loginResponse);
        }));
        router.route('/cart/:userId')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            const cart = yield prisma.cart.findUnique({
                where: {
                    userId: Number(req.params.userId)
                },
                include: {
                    cartItems: {
                        include: {
                            product: true
                        }
                    }
                }
            });
            res.send(cart);
        }));
        router.post('/cart-update', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('post fired');
            console.log(req.body);
            const incomingCart = req.body;
            if (req.body.id == '' || req.body.userId == '') {
                res.send('Write Avoided');
            }
            else {
                const cart = yield prisma.cart.findUniqueOrThrow({
                    where: {
                        userId: Number(req.body.userId)
                    },
                    include: {
                        cartItems: {
                            include: {
                                product: true
                            }
                        }
                    }
                });
                yield prisma.cart.update({
                    where: {
                        userId: Number(req.body.userId)
                    },
                    data: {
                        total: incomingCart.total,
                    }
                });
                incomingCart.cartItems.forEach((cartItem) => __awaiter(this, void 0, void 0, function* () {
                    const existingCartItem = yield prisma.cartItem.findFirst({
                        where: {
                            AND: [
                                {
                                    cartId: cart.id
                                },
                                {
                                    productId: cartItem.product.id
                                }
                            ]
                        }
                    });
                    if (existingCartItem) {
                        console.log('existing cart item found');
                        console.log(existingCartItem);
                        yield prisma.cartItem.update({
                            where: {
                                id: existingCartItem.id
                            },
                            data: {
                                quantity: cartItem.quantity
                            }
                        });
                    }
                    else {
                        console.log('existing cart item not found');
                        yield prisma.cartItem.create({
                            data: {
                                productId: cartItem.product.id,
                                quantity: cartItem.quantity,
                                cartId: cart.id
                            },
                        });
                    }
                }));
                res.send('Write successful');
            }
        }));
        router.get('/empty-cart/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedCart = yield prisma.cart.update({
                where: {
                    userId: Number(req.params.userId)
                },
                data: {
                    cartItems: {
                        deleteMany: {}
                    },
                    total: 0
                }
            });
            if (updatedCart) {
                // console.log('updated user>>>>>>>>>>>');
                // console.log(updatedCart);
                res.send(true);
            }
            else {
                res.send(false);
            }
        }));
        return router;
    }
}
exports.default = Routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFtRDtBQUNuRCxvREFBeUQ7QUFDekQsMkNBQWtEO0FBR2xELGlDQUErQjtBQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sRUFBRSxDQUFDO0FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0FBQ2xDLE1BQXFCLE1BQU07SUFDdkIsTUFBTSxDQUFDLE1BQU07UUFFVCxNQUFNLE1BQU0sR0FBVSxJQUFBLGdCQUFNLEdBQUUsQ0FBQztRQUUvQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVcsRUFBRSxHQUFZLEVBQUUsRUFBRTtZQUM5QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBTyxHQUFXLEVBQUUsR0FBWSxFQUFFLEVBQUU7WUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQU8sR0FBVyxFQUFFLEdBQVksRUFBRSxFQUFFO1lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLEdB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