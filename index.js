//express
const express = require('express');
const app = express();
const PORT = 3000; //puede cambiar

//array
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis' , Autor: 'Moises' , anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo' , Autor: 'Moises', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico' , Autor: 'Moises', anioPublicacion: 1990},
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
// endpoint 5 eliminar libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json( {mensaje : 'se ha eliminado el libro'})
    console.log(lBiblico);
});


//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res)=>{ //manejador de ruta con un parametro id
    const year = parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0 ){
        res.json(librosPublicados);
    }
    else {
        res.status(404).json({mensaje: 'no se han encontrado libros publicados en el anio'});
    }
});
//endpoint Bienvenida
app.get('/', (req, res) => {
    res.json({ mensaje: 'Bienvenido, mi nombre es Jose Rodrigo Rios Arcienega y soy Informatico en el area de Soporte.' });
});
//endpoint libros por autor
app.get('/libros/autor/:autor', (req, res) => {
    const autor = req.params.autor;
    const librosPorAutor = librosBiblicos.filter(libro => libro.Autor.toLowerCase() === autor.toLowerCase());
    if (librosPorAutor.length > 0) {
        res.json(librosPorAutor);
    } else {
        res.status(404).json({ mensaje: 'No se encontraron libros de este autor' });
    }
});
//endpoint Cantidad
app.get('/libros/cantidad', (req, res) => {
    const cantidad = librosBiblicos.length;
    res.json({ cantidad: cantidad });
});


//endpoint para obtener texto
app.get('/libros/buscar/:nombre', (req, res) => {
    const nombreBuscado = req.params.nombre.toLowerCase();
    const librosFiltrados = librosBiblicos.filter(libro => libro.nombre.toLowerCase().includes(nombreBuscado));
    if (librosFiltrados.length > 0) {
        res.json(librosFiltrados);
    } else {
        res.status(404).json({ mensaje: 'No se pudo obtener el texto descrito' });
    }
});

//endpoint por nombre
app.get('/libros/ordenados', (req, res) => {
    const librosOrdenados = librosBiblicos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(librosOrdenados);
});




app.listen(PORT, () => {
    console.log("Servidor corriendo corriendo en el puerto http://localhost: " + PORT);
});
