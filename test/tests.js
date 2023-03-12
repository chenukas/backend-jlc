const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect();
const server = require('../index');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

chai.use(chaiHttp);

let userToken;
let adminToken;
let user;
let product;
let cart;
let order;

const newUser = {
    "firstName":"Test",
    "lastName": "User",
    "username": "testUser",
    "email": "testUser@gmail.com",
    "password": "testuser321"
}

const newProduct = {
    "title": "Test Product Title",
    "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry', Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's",
    "img": "https://images.pexels.com/photos/6611188/pexels-photo-6611188.jpeg",
    "categories": [
        "testCategory1",
        "testCategory2"
    ],
    "price": 5000
}

const testAdmin = {
    "username": "testAdmin",
    "password": "testAdmin321"
}

const testUser = {
    "username": "testChenuka",
    "password": "testChenuka321"
}

const userRoutes = '/api/users'
const authRoutes = '/api/auth'
const productRoutes = '/api/products'
const orderRoutes = '/api/orders'
const cartRoutes = '/api/carts'
const stripeRoutes = '/api/payments'

describe('Drop all the collections in database', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
        Product.remove({}, (err) => {
            done();
        });
        Cart.remove({}, (err) => {
            done();
        });
        Order.remove({}, (err) => {
            done();
        });
    });
});


/*
* /POST/ register
* /api/auth/register
*/
describe('/POST/ register user', () => {
    it('it should register', (done) => {
        chai
            .request(server)
            .post(`${authRoutes}/register`)
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                user = res.body.data;
                done();
            });
    });
})


/*
* /POST/ login
* /api/auth/login
*/
describe('/POST/ login as admin', () => {
    it('it should login as admin', (done) => {
        chai
            .request(server)
            .post(`${authRoutes}/login`)
            .send(testAdmin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('accessToken');
                adminToken = res.body.data.accessToken;
                done();
            });
    });
})


/*
* /POST/ login
* /api/auth/login
*/
describe('/POST/ login as user', () => {
    it('it should login as user', (done) => {
        chai
            .request(server)
            .post(`${authRoutes}/login`)
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('accessToken');
                userToken = res.body.data.accessToken;
                done();
            });
    });
})

/*
* /GET/ get a user
* /api/users/find/:id
*/
describe('/GET/ get a user', () => {
    it('it should get a user', (done) => {
        chai
            .request(server)
            .get(`${userRoutes}/find/${user._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(user._id);
                res.body.data.should.have.property('username').eql(user.username);
                res.body.data.should.have.property('email').eql(user.email);
                done();
            });
    });
})

/*
* /GET/ get users
* /api/users
*/
describe('/GET/ get users', () => {
    it('it should get users', (done) => {
        chai
            .request(server)
            .get(`${userRoutes}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /GET/ get users's stats
* /api/users/stats
*/
describe('/GET/ get users\'\ stats ', () => {
    it('it should get users\'\ stats', (done) => {
        chai
            .request(server)
            .get(`${userRoutes}/stats`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /PUT/ update user
* /api/users/:id
*/
describe('/PUT/ update user', () => {
    it('it should update user', (done) => {
        chai
            .request(server)
            .put(`${userRoutes}/${user._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "username": "testUserUpdated",
                "email": "testUserUpdated@gmail.com"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('username').eql('testUserUpdated');
                res.body.data.should.have.property('email').eql('testUserUpdated@gmail.com');
                done();
            });
    });
})

/*
* /DELETE/ delete user
* /api/users/:id
*/
describe('/DELETE/ delete user', () => {
    it('it should delete user', (done) => {
        chai
            .request(server)
            .delete(`${userRoutes}/${user._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data').eql(null);
                res.body.should.have.property('message').eql("User is deleted successfully");
                done();
            });
    });
})


/*
* /POST/ add product
* /api/products
*/
describe('/POST/ add product', () => {
    it('it should add product', (done) => {
        chai
            .request(server)
            .post(`${productRoutes}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(newProduct)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                product = res.body.data;
                done();
            });
    });
})

/*
* /GET/ get a product
* /api/products/find/:id
*/
describe('/GET/ get a product', () => {
    it('it should get a product', (done) => {
        chai
            .request(server)
            .get(`${productRoutes}/find/${product._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(product._id);
                res.body.data.should.have.property('title').eql(product.title);
                res.body.data.should.have.property('price').eql(product.price);
                done();
            });
    });
})

/*
* /GET/ get products
* /api/products
*/
describe('/GET/ get products', () => {
    it('it should get products', (done) => {
        chai
            .request(server)
            .get(`${productRoutes}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /PUT/ update product
* /api/products/:id
*/
describe('/PUT/ update product', () => {
    it('it should update product', (done) => {
        chai
            .request(server)
            .put(`${productRoutes}/${product._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "title": "Test Title Updated",
                "price": 3000
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('title').eql('Test Title Updated');
                res.body.data.should.have.property('price').eql(3000);
                done();
            });
    });
})

/*
* /DELETE/ delete product
* /api/products/:id
*/
describe('/DELETE/ delete product', () => {
    it('it should delete product', (done) => {
        chai
            .request(server)
            .delete(`${productRoutes}/${product._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data').eql(null);
                res.body.should.have.property('message').eql("Product is deleted successfully");
                done();
            });
    });
})

/*
* /POST/ add cart
* /api/carts
*/
describe('/POST/ add cart', () => {
    it('it should add cart', (done) => {
        chai
            .request(server)
            .post(`${cartRoutes}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                "userId": user._id,
                "products": [{
                    "productId": product._id,
                    "quantity": 1
                }]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                cart = res.body.data;
                done();
            });
    });
})

/*
* /GET/ get a cart
* /api/carts/find/:id
*/
describe('/GET/ get a cart', () => {
    it('it should get a cart', (done) => {
        chai
            .request(server)
            .get(`${cartRoutes}/find/${user._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(cart._id);
                res.body.data.should.have.property('userId').eql(user._id);
                res.body.data.should.have.property('products').to.be.a('array');
                done();
            });
    });
})

/*
* /GET/ get carts
* /api/carts
*/
describe('/GET/ get carts', () => {
    it('it should get carts', (done) => {
        chai
            .request(server)
            .get(`${cartRoutes}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /PUT/ update cart
* /api/carts/:id
*/
describe('/PUT/ update cart', () => {
    it('it should update cart', (done) => {
        chai
            .request(server)
            .put(`${cartRoutes}/${cart._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                "userId": user._id,
                "products": [{
                    "productId": product._id,
                    "quantity": 5
                }]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(cart._id);
                res.body.data.should.have.property('userId').eql(user._id);
                res.body.data.should.have.property('products').to.be.a('array');
                done();
            });
    });
})

/*
* /DELETE/ delete cart
* /api/carts/:id
*/
describe('/DELETE/ delete cart', () => {
    it('it should delete cart', (done) => {
        chai
            .request(server)
            .delete(`${cartRoutes}/${cart._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data').eql(null);
                res.body.should.have.property('message').eql("Cart is deleted successfully");
                done();
            });
    });
})



/*
* /POST/ add order
* /api/orders
*/
describe('/POST/ add order', () => {
    it('it should add order', (done) => {
        chai
            .request(server)
            .post(`${orderRoutes}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                "userId": user._id,
                "products": [{
                    "productId": product._id,
                    "quantity": 1
                }],
                "amount": 5000,
                "address": { }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                order = res.body.data;
                done();
            });
    });
})

/*
* /GET/ get orders by user
* /api/orders/find/:id
*/
describe('/GET/ get orders by user', () => {
    it('it should get orders by user', (done) => {
        chai
            .request(server)
            .get(`${orderRoutes}/find/${user._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                done();
            });
    });
})

/*
* /GET/ get all orders
* /api/orders
*/
describe('/GET/ get all orders', () => {
    it('it should get orders', (done) => {
        chai
            .request(server)
            .get(`${orderRoutes}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /PUT/ update order
* /api/orders/:id
*/
describe('/PUT/ update order', () => {
    it('it should update order', (done) => {
        chai
            .request(server)
            .put(`${orderRoutes}/${order._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "userId": user._id,
                "products": [{
                    "productId": product._id,
                    "quantity": 5
                },
                {
                    "productId": product._id,
                    "quantity": 5
                }],
                "amount": 10000,
                "address": { }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('_id').eql(order._id);
                res.body.data.should.have.property('userId').eql(user._id);
                res.body.data.should.have.property('products').to.be.a('array');
                res.body.data.should.have.property('amount').to.be.a('number');
                done();
            });
    });
})

/*
* /DELETE/ delete order
* /api/orders/:id
*/
describe('/DELETE/ delete order', () => {
    it('it should delete order', (done) => {
        chai
            .request(server)
            .delete(`${orderRoutes}/${order._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data').eql(null);
                res.body.should.have.property('message').eql("Order is deleted successfully");
                done();
            });
    });
})


/*
* /GET/ get orders' stats
* /api/users/stats
*/
describe('/GET/ get orders\'\ stats ', () => {
    it('it should get orders\'\ stats', (done) => {
        chai
            .request(server)
            .get(`${orderRoutes}/stats`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})

/*
* /GET/ get payments
* /api/payments
*/
describe('/GET/ get payments', () => {
    it('it should get payments', (done) => {
        chai
            .request(server)
            .get(`${stripeRoutes}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
})