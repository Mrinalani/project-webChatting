const express = require('express')
const fs = require('fs')


const app = express();
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser');


app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieParser());


app.get('/login',(req,res,next)=>{
res.send(`
<form action="/" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <button type="submit">Login</button>
</form>
`)
})

app.get('/', (req, res) => {
  const messageData = fs.readFileSync('message.txt', 'utf8');

    res.send(`
    <li>${messageData}</li>
      <form action="/message" method="post">
        <label for="message">Message:</label>
        <input type="text" id="message" name="message">
        <button type="submit">Send</button>
      </form>
    `);
  });

  app.post('/', (req, res) => {
    const { username } = req.body;
  console.log( username);
  //localStorage.setItem('username', username);
  res.cookie('username', username);
    res.redirect('/')
  });

  app.post('/message',(req,res,next)=>{
    const { message } = req.body;
    const username = req.cookies.username;
  
    console.log(message);
  
    if (username) {
      console.log(username);
  
      // Format the data to be appended
      const data = ` ${username}-> ${message}. `;
  
      // Save the data to a file
      fs.appendFile('message.txt', data, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data appended to file.');
        }
      });
    } else {
      console.log('Username cookie not found.');
    }
 
res.redirect('/')
  })

app.listen(6017);