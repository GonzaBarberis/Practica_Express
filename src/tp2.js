const express = require('express');
const fs = require('fs');


const app = express();
const port = 3100;

app.use(express.urlencoded({extended: true}))

const vendedoresJson = 'src/jsons/vendedores.json';

  const cargarDatosDesdeArchivo = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error.message);
      return [];
    }
  };

const vendedores = cargarDatosDesdeArchivo(vendedoresJson);


const productosJson = 'src/jsons/productos.json';

  const cargarDatosDesdeArchivo1 = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error.message);
      return [];
    }
  };

const productos = cargarDatosDesdeArchivo1(productosJson);

  


app.get('/vendedores', (req, res) => {
  res.json(vendedores);
});

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.get('/productos/:id', (req, res) => {

  const cargarDatosDesdeArchivo = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data).productos; //ATENCION!
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error.message);
      return [];
    }
  };

  const productos = cargarDatosDesdeArchivo(productosJson);

  const prodId  = req.params.id;

  const producto = productos.find((p) => p.id == prodId);

  if (!producto) {
    //return res.status(404).send('El producto no existe o ya no esta disponible.');
    return res.json({"error":"El producto no existe o no ya no está disponible"})
  }



  res.json(producto);

});


app.post('/nuevovendedor', (req,res) =>{

  const { nombre, apellido, puesto } = req.body;

  const nuevoVendedor = {
    id: vendedores.vendedores.length + 1,
    nombre,
    apellido,
    puesto
  };

  vendedores.vendedores.push(nuevoVendedor);
  res.json(vendedores);
})


app.post('/nuevoproducto', (req,res) =>{

  const { nombre, desc, precio } = req.body;

  const nuevoProducto = {
    id: productos.productos.length + 1,
    nombre,
    desc,
    precio
  };

  productos.productos.push(nuevoProducto);
  res.json(productos);
})










app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
  