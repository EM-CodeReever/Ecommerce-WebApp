import { Response, Request, Router} from "express";
import bcrypt, {hash,genSalt, genSaltSync} from "bcrypt";
import {PrismaClient, User} from "@prisma/client";
import {Cart as BetterCart} from "../frontend/src/types/betterTypes";
import { LoginResponse } from "../frontend/src/types";
import { Logger } from "tslog";
const logger = new Logger();
const prisma = new PrismaClient();
export default class Routes{
    static routes():Router {

        const router:Router = Router();

        router.get('/test', (req:Request, res:Response) => {
            res.send('test');
        });

        router.get('/products', async (req:Request, res:Response) => {
            const products = await prisma.product.findMany();
            res.send(products);
        });
        router.post('/product', async (req:Request, res:Response) => {
            logger.info('Creating new product');
            logger.info(req.body);
            const product = await prisma.product.create({
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
            res.send({id: product.id});
        });
        router.post('/image', async (req:Request, res:Response) => {
            if(req.body.isThumbnail){
                try{
                    logger.info('Writing new thumbnail to database');
                    logger.info(req.body);
                    const product = await prisma.product.update({
                        where: {
                            id: req.body.productId
                        },
                        data: {
                            thumbnail: req.body.image
                        }
                    });
                    logger.info('New thumbnail written to Database for product with ID: [' + product.id + ']');
                }catch(e){
                    logger.error(e);
                }
            }else{
                try{
                    logger.info('Writing new image to database');
                    logger.info(req.body);
                    const images = await prisma.images.create({
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
                    res.send({id: images.id});
                }catch(err){
                    logger.error(err);
                }
            }
        });
        router.get('/product/:id', async (req:Request, res:Response) => {
            logger.info('Retrieving product with id: ' + req.params.id);
            try{
                const product = await prisma.product.findUnique({
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
            }catch(err){
                logger.error(err);
            }
        });
        router.get('/categories', async (req:Request, res:Response) => {
            const categories = await prisma.category.findMany();
            logger.info('Retrieved all categories');
            res.send(categories);
        });
        
        router.get('/category/:categoryId', async (req:Request, res:Response) => {
            const products = await prisma.product.findMany({
                where: {
                    categoryId: Number(req.params.categoryId)
                }
            });
            logger.info('Retrieved all products from category with id: ' + req.params.categoryId);
            logger.info(products);
            res.send(products);
        });

        router.post('/login', async (req:Request, res:Response) => {
            let loginResponse: LoginResponse
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.passwordHash);
                if(passwordMatch){
                    user.passwordHash = '';
                    loginResponse = {
                        status: true,
                        user,
                        message: 'Login successful'
                    }
                    //Remember to remove passwordHash from user object before sending it to client
                    //also remember to create login response type and login request type or interface
                }else{
                    loginResponse = {
                        status: false,
                        user: null,
                        message: 'Wrong password'
                    }
                }
            }else{
                loginResponse = {
                    status: false,
                    user: null,
                    message: 'User not found'
                }
            }
            res.send(loginResponse);
        });
        router.get('/users', async (req:Request, res:Response) => {
            const users = await prisma.user.findMany();
            res.send(users);
        });
        router.post('/register', async (req:Request, res:Response) => {        
            let loginResponse: LoginResponse
            let incomingUser = req.body as User;
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if(user){
                loginResponse = {
                    status: false,
                    user: null,
                    message: 'User already exists'
                }
            }else{
                const passwordHash = await bcrypt.hash(incomingUser.passwordHash, 10);
                const newUser = await prisma.user.create({
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
                const cart = await prisma.cart.create({
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
                }
            }
            res.send(loginResponse);
        });
        router.route('/cart/:userId')
            .get(async (req:Request, res:Response) => {
                const cart = await prisma.cart.findUnique({
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
            })
               
        router.post('/cart-update', async (req:Request, res:Response) => {
            console.log('post fired');
            console.log(req.body);
            const incomingCart = req.body as BetterCart;
            if(req.body.id == '' || req.body.userId == ''){
                res.send('Write Avoided');
            }else{
                const cart = await prisma.cart.findUniqueOrThrow({
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
                await prisma.cart.update({
                    where: {
                        userId: Number(req.body.userId)
                    },
                    data: {
                        total: incomingCart.total,
                    }
                });
                    incomingCart.cartItems.forEach(async (cartItem) => {
                        const existingCartItem = await prisma.cartItem.findFirst({
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
                        if(existingCartItem){
                            console.log('existing cart item found');
                            console.log(existingCartItem);
                            
                            await prisma.cartItem.update({
                                where: {
                                    id: existingCartItem.id
                                },
                                data: {
                                    quantity: cartItem.quantity
                                }
                            });
                        }else{
                            console.log('existing cart item not found');
                            await prisma.cartItem.create({
                                data: {
                                    productId: cartItem.product.id,
                                    quantity: cartItem.quantity,
                                    cartId: cart.id
                                },
                            });
                        }
                    });
                res.send('Write successful');
            }
        });

        router.get('/empty-cart/:userId', async (req:Request, res:Response) => {
            const updatedCart = await prisma.cart.update({
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
            }else{
                res.send(false);
            }
        });
        return router;
    }
}