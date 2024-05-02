//express
const express = require('express');
const app = express();
const PORT = 3000; //puede cambiar

//array
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis' , Autor: 'Moises'},
    {id: 2 , nombre: 'Exodo' , Autor: 'Moises'},
    {id: 3 , nombre: 'Levitico' , Autor: 'Moises'},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 OBTIENE TODOS LOSLIBROS
app.get('/libros', (req, res)=>{
    res.json(librosBiblicos);
});

//endpoint 2 OBTIENE TODOS LOSLIBROS
app.get('/libros/:id', (req, res)=>{ //manejador de ruta con un parametro id
    const idCapturado = parseInt(req.params.id);//captura el parametro de ruta con un indentificador id
    console.log(idCapturado); //muestra el id capturado para poder depurar
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);// busqueda de libro en la matriz librosBiblicos utilizando el metodo Array,find() cuando el id cuencida con el id capturado
    if (libroEncontrado){
        res.json(libroEncontrado);// verifica si encuentra el libro con el id proporcionado
    }
        else{
            res.status(404).json({mensaje : 'Libro no encontrado'});//se envia como respuesta de estado el 404 como mensaje'libro no encontrando'
        }
    }
);
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost: " + PORT);
});