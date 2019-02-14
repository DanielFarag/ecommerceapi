const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var uristring =
    process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
    process.env.MONGODB_URI ||
    'mongodb://localhost/ecommerce';

mongoose.connect(uristring,{useNewUrlParser:true});

mongoose.set('useCreateIndex', true)
mongoose.connection.once('open',()=> console.log('Connection has been made, now make fireworks'))
					.on('error',error=>console.log('Connection error:',error))


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const tagRoutes = require('./routes/tags');
const dummyRoutes = require('./routes/dummy');

app.use(cors());
app.use('/dummy',dummyRoutes);
app.use('/posts',postRoutes);
app.use('/categories',categoryRoutes);
app.use('/tags',tagRoutes);
app.use('/users',userRoutes);
app.get('/',(req,res)=>{
	res.json({msg:'hello'})
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
