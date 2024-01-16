const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes
//app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

// Almacenamiento en memoria para usuarios y posts
const users = [];
const posts = [];

// Ruta para registrar un nuevo usuario
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };
  users.push(newUser);
  res.json(newUser);
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Ruta para crear un nuevo post
app.post('/posts', (req, res) => {
  const { idUsuario, texto, topics } = req.body;
  if (!texto || texto.trim().length === 0) {
    return res.status(400).send('El texto del post no puede estar vacío.');
  }

  const newPost = {
    id: posts.length + 1,
    idUsuario,
    texto,
    fechaPublicacion: new Date(),
    topics: topics || [],
    respuestas: [],
  };

  posts.push(newPost);
  res.json(newPost);
});

// Ruta para obtener todos los posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Ruta para agregar una respuesta a un post
app.post('/posts/:postId/respuestas', (req, res) => {
  const postId = parseInt(req.params.postId);
  const { idUsuario, texto } = req.body;

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).send('El post no existe o ya no esta dispoonible.');
  }

  const newRespuesta = {
    idUsuario,
    texto,
    fechaPublicacion: new Date(),
  };

  post.respuestas.push(newRespuesta);
  res.json(newRespuesta);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
