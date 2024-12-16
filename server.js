const express = require("express");
const http = require("http");
const path = require("path");

const mongoose = require("mongoose");
const configDb = require("./config/db.json");

// ceci est un exemple :
const contactRouter = require('./routers/contact');
const productRouter = require('./routers/product');
const { Product } = require("./models/product");

const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ceci est un exemple :
app.use('/contact', contactRouter);
app.use('/product', productRouter);

mongoose.connect(configDb.mongo.uri);

const io = require('socket.io')(server);

const broadcastAveragePrice = async () => {
    
    const products = await Product.find({});
    let total = 0;
    products.forEach(product => total += product.price);
    const avgPrice = total / products.length;
    io.emit('averagePriceUpdated', { averagePrice: avgPrice });
    
};

io.on("connection", (socket) => {
    console.log("a user is connected");
    broadcastAveragePrice();
    socket.on('disconnect', () => {
        console.log('a user is disconnected');
    });
});

setInterval(broadcastAveragePrice, 1000);

server.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});