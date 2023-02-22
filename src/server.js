import express, { urlencoded } from "express";
// import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import './persistencia/dbConfig.js';

//solution to this: Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent. You can add a runtime option to disable the check or this warning: See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for detail
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(__dirname+'/public'));

//still solution
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

//handlebars settings 
server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.set('views', __dirname + '/views');

//Routers
server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);

const PORT = 8080;

server.listen(PORT, ()=>{
  console.log("Connected trought PORT: " + PORT);
})