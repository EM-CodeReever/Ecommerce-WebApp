import { Response, Request, Router} from "express";
import bcrypt, {hash,genSalt, genSaltSync} from "bcrypt";
import {Cart, CartItem, PrismaClient, User} from "@prisma/client";
import {Cart as BetterCart} from "../frontend/src/types/betterTypes";
import { LoginResponse } from "../frontend/src/types";
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

        router.get('/product/:id', async (req:Request, res:Response) => {
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
        });
        router.get('/categories', async (req:Request, res:Response) => {
            const categories = await prisma.category.findMany();
            res.send(categories);
        });
        
        router.get('/category/:categoryId', async (req:Request, res:Response) => {
            console.log("pppppppppppp: "+req.params.categoryId);
            const products = await prisma.product.findMany({
                where: {
                    categoryId: Number(req.params.categoryId)
                }
            });
            // console.log(products);
            // console.log(category);
            
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
                            console.log('AHAHAAHAHAHAHAHAAHH');
                            //i am not going insane i swear to god i am not going insane 
                            
                        }
                    });
                res.send('Write successful');
            }
        });

        router.get('/empty-cart/:cartId', async (req:Request, res:Response) => {
            // console.log(req.body);
            
            const updatedCart = await prisma.cart.update({
                where: {
                    userId: Number(req.params.cartId)
                },
                data: {
                    cartItems: {
                        set: []
                    }
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