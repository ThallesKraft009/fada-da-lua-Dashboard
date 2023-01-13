
const express = require("express");
const { join } = require("path");
const app = express();
const router = express.Router();
const { request } = require('undici');
const { URLSearchParams } = require("url");
const ejs = require('ejs');
const { blue, green } = require("colors")

const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const DisocrdStrategy = require("passport-discord").Strategy
const passport = require("passport");


passport.use(

  new DisocrdStrategy({
    clientID: process.env.id,
    clientSecret: process.env.secret,
    callbackURL: 'https://Fada-da-lua-Dashboard.thalleskraft.repl.co/callback',
    scope: ['identify', 'guilds']
  },
                     
                     
          
 function (acessToken, refreshToken, profile, done){
  process.nextTick(function() {
    return done(null, profile);
     });
 } )
  )

app.use(session({
  store: new MemoryStore({checkPeriod:86400000}),
  secret: 'meusegredonaorevele',
  resave: false,
  saveUninotialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

module.exports.Dashboard = (client) => {
  

app.set('view engine','ejs');

app.get('/login', async(req, res, next) => {

  

  next();
}, passport.authenticate("discord")
       
)

app.get("/logout", (req, res) => {
  req.session.destrory(() => {
    
  })
})
  
app.get("/callback", passport.authenticate("discord", {failureRedirect: "/dashboard"}), function(req, res){

  res.redirect("/dashboard");
  
})

app.get("/dashboard", function(req, res){

if (!req.user) return res.redirect("/login");

  res.render('menu.ejs', {
        user: req.user
    })
})

app.get("/api/guilds", function(req, res){
  let svs = client.guilds.cache.map(guild => {

let opa = [{
  name: guild.name,
  id: guild.id, 

}]
  return opa 
});

  res.json(svs)
})

app.get("/api/user/guilds", function(req, res){
  if (!req.user) return res.redirect("/login");

let guilds = req.user.guilds.filter(g => g.permissions & 8);

const sv = guilds.forEach(guild => {
let a = [{
  name: guild.name,
  id: guild.id
    }]
   return a
})
  res.json(sv)
})

  
  app.get("/api/user", function(req, res){
  if (!req.user) return res.redirect("/login");

let json = [{
  name: req.user.username,
  id: req.user.id,
  avatar: req.user.avatar
}]

res.json(json)

  })
   app.get("/api/info", function(req, res){
 

     
let info = [{
  name: client.user.tag,
  id: client.user.id,
  guilds: client.guilds.cache.size,
  users: client.users.cache.size,
  
}];
     
res.json(info)
})

  app.listen(process.env.PORT)
    }