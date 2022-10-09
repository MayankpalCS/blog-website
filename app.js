//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose")
const _=require("lodash")
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
titlearr=[];
contentarr=[];
const app = express();
const todoscheme=mongoose.Schema({
	title:{type:String,required:true},
	content:{type:String}
})

const modela=mongoose.model('blogs',todoscheme)
mongoose.connect('mongodb://localhost/blog2')

app.get('/', async (req, res) => {

  const data= await modela.find({})


res.render('home',{data:data})
for(var i=0;i<data.length;i++){
  titlearr.push(data[i].title)
  contentarr.push(data[i].content)

}


})
// app.post('/edit', async (req, res) => {
//



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/compose",function(req,res){
  res.render('compose')
})
app.get('/edit/:topic', async (req, res) => {
	const data= await modela.find({})

	let topic=req.params.topic
	for(var i=0;i<data.length;i++){

		if(_.lowerCase(topic)==_.lowerCase(data[i].title)){
			res.render('edit',{content:data[i].content,topic:data[i].title})
		}else{

		}

	}

var title2=''
})
app.post('/editing', async (req, res) => {
	let ccon=''
	let chcontent=req.body.n2
	for(var i=0;i<titlearr.length;i++){
		if(titlearr[i]==title2)
		ccon=contentarr[i]

	}
	const cresponse = await modela.updateOne(
		{
			content:ccon
		},
	{
		$set:{
			content:chcontent
		}
	})
res.redirect("/")
})

app.post('/edit', async (req, res) => {

	title2=req.body.button
	console.log('title2'+title2)
	res.redirect("/edit/"+title2)

})
app.post("/compose",function(req,res){
  title=req.body.n1
  content=req.body.postbody
  const response=modela.create({title:title,content:content})
  res.redirect("/")
})
app.post('/delete', async (req, res) => {

	title=req.body.button
	const resp=await modela.deleteOne({ title: title })
	res.redirect("/")


})
app.get("/about",function(req,res){
	res.render('about')
})
app.get("/posts/:topic",function(req,res){
  let topic=req.params.topic
  for(var i=0;i<titlearr.length;i++){
    if(_.lowerCase(topic)===_.lowerCase(titlearr[i])){

      res.render('post',{content:contentarr[i],topic:titlearr[i]})
    }
  }
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
