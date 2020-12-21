const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const port = process.env.PORT ? process.env.PORT : 3000;


const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://clarke123:clarke123@cluster0.g64g9.mongodb.net/bibliotecaPersonal?retryWrites=true&w=majority';
async function conectar() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conectado a la base de datos metodo: mongoodb - async-await");
    }
    catch (e) {
        console.log({ Error: e.message });
    }
};
conectar();

// Creacion de los Schemas y Modelos
// - Persona
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingrese un nombre']
    },
    lastName: {
        type: String,
        required: [true, 'Ingrese un apellido']
    },
    nickName: {
        type: String,
        required: [true, 'Ingrese un usuario'],
    },
    email: String,
    phone: String
});
const PersonModel = mongoose.model("person", PersonSchema);

const GenderSchema = new mongoose.Schema({
    name: String,
})
const GenderModel = mongoose.model("gender", GenderSchema);
// - Libro
const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ingrese un nombre']
    },
    description: {
        type: String,
        required: [true, 'Ingrese un nombre']
    },
    gender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gender',
        required: [true]
    },
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person'
    }
});
const BookModel = mongoose.model("book", BookSchema);





// ---------------------- API PERSON ---------------------- //
// - Mostar todas las personas
app.get('/contact', async (req, res) => {
    try {
        const persons = await PersonModel.find();
        console.log(persons);
        res.status(200).send(persons);
    }
    catch (error) {
        console.log(error.message);
        res.status(413).send({ Error: 'Algo fallo.' });
    }
});


// - Guardar una persona
app.post('/contact', async (req, res) => {
    try {
        if (!req.body.name || !req.body.lastName || !req.body.nickName || !req.body.email || !req.body.phone) {
            throw new Error('No me enviaste todos los datos necesarios.');
        }
        const existeNickname = await PersonModel.find({ nickName: req.body.nickName });
        const existeEmail = await PersonModel.find({ email: req.body.email });

        if (existeEmail.length > 0) {
            throw new Error('El email ya existe.');
        }
        if (existeNickname.length > 0) {
            throw new Error('El apodo ya existe.');
        }
        const aNewPerson = {
            name: req.body.name,
            lastName: req.body.lastName,
            nickName: req.body.nickName,
            email: req.body.email,
            phone: req.body.phone
        }
        const newPerson = await PersonModel.create(aNewPerson);
        res.status(200).send({
            message: 'Se guardo con exito',
            dato: newPerson
        })
    } catch (error) {
        console.log(error);
        res.status(413).send({ Error: error.message })
    }
})


// - Moodificar el 'numero' de telefono
app.put('/contact/update/:id', async (req, res) => {
    try {
        if (!req.body.phone) {
            res.status(400);
            throw new Error("No enviaste un numero de telefono.");
        }
        const neededPerson = await PersonModel.findById(req.params.id);
        if (!neededPerson) {
            throw new Error("Persona no encontrada.");
        }
        const personChange = await PersonModel.findByIdAndUpdate(req.params.id, { phone: req.body.phone }, { new: true });
        res.status(200).send(personChange);
    }
    catch (error) {
        console.log(error);
        res.send({ Error: error.message });
    }
});

// - Buscar persona por '_id'
app.get('/contact/:id', async (req, res) => {
    try {
        const thePerson = await PersonModel.findById(req.params.id);
        if (!thePerson) {
            throw new Error('No existe tal persona.')
        }
        res.status(200).send(thePerson);

    } catch (error) {
        console.log(error)
        res.status(400).send({ Error: error.message })
    }
});
// - Borrar persona por '_id'
app.delete('/contact/delete/:id', async (req, res) => {
    try {
        const thePerson = await PersonModel.findById(req.params.id);
        if (!thePerson) {
            throw new Error('No existe tal persona.')
        }
        const deleteContact = await PersonModel.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteContact);

    } catch (error) {
        console.log(error)
        res.status(400).send({ Error: error.message })
    }
});

// - Mostrar los datos de una persona por 'nickname'
app.get('/contact/search/:nickname', async (req, res) => {
    try {
        const aPerson = await PersonModel.find({ nickName: req.params.nickname });
        if (!aPerson) {
            throw new Error('No existe persona con apodo : ' + req.params.id).status(404);
        }
        res.status(200).send({
            message: 'Apodo encontrado',
            data: aPerson
        });

    }
    catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
});



// ---------------------- API GENDER ---------------------- //
// - Mostrar todos los generos
app.get('/genre', async (req, res) => {
    try {
        const gender = await GenderModel.find();

        console.log(gender);

        res.status(200).send(gender);
    }
    catch (e) {
        console.log(e);
        res.status(413).send(e);
    }
});

// - Buscar genero por '_id'
app.get('/genre/:id', async (req, res) => {
    try {
        const genero = await GeneroModel.findById(req.params.id);
        if (!genero) {
            res.status(200)
            throw new Error('El genero no existe.');
        }
        res.status(200).send({
            message: 'Encontrado',
            data: genero
        });
    } catch (error) {
        console.log(error)
        res.send({ Error: error.message })
    }
});
// - Borrar genero por '_id'
app.delete('/genre/delete/:id', async (req, res) => {
    try {
        const genero = await GenderModel.findById(req.params.id);
        if (!genero) {
            res.status(200)
            throw new Error('El genero no existe.');
        }
        const isInBook = await BookModel.findOne({ gender_id: req.params.id });
        if (isInBook) {
            res.status(200)
            throw new Error('El genero esta en uso.');
        }
        const deleted = await GenderModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message: 'Borrado',
            data: deleted
        });
    } catch (error) {
        console.log(error)
        res.send({ Error: error.message })
    }
});

// - Guardar un genero
app.post('/genre', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error("No enviaste un genero");
        }
        const existeGender = await GenderModel.find({ name: req.body.name });
        if (existeGender.length > 0) {
            throw new Error('El genero ya existe');
        }
        const gender = {
            name: req.body.name
        }
        const newGender = await GenderModel.create(gender);

        res.status(200).send({
            message: 'Guardado!',
            data: newGender
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(413).send({ error: error.message });
    }
});

// - Modificar un genero
app.put('/genre/update/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error('No enviaste el genero');
        }
        const existeGenero = await GenderModel.find({ name: req.body.name });
        if (existeGenero.length > 0) {
            throw new Error('El genero ya existe');
        }
        const newGenero = await GenderModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.status(200).send({
            message: 'Modificado!',
            data: newGenero
        });
    } catch (error) {
        console.log(error);
        res.send({ Error: error.message })
    }
});





// ---------------------- API LIBROS ---------------------- //
// - Mostrar todo los libros
app.get('/book', async (req, res) => {
    try {
        const books = await BookModel.find();
        console.log(books);
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        res.send({ Error: error.message });
    }
})

//  - Mostar un libro por '_id'
app.get('/book/:id', async (req, res) => {
    try {
        const libro = await BookModel.findById(req.params.id);
        if (!libro) {
            res.status(400);
            throw new Error('No existe un libro con ese _id');
        }
        res.status(200).send({
            message: 'Encontrado!',
            data: libro
        });
    } catch (error) {
        console.log(error);
        res.send({ Error: error.message });
    }
});

// - Guardar un libro
app.post('/book', async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.gender) {
            res.status(400);
            throw new Error('No enviaste todos los datos necesarios.');
        }
        const genderExist = await GenderModel.findOne({ name: req.body.gender }, '_id');

        if (!genderExist) {
            throw new Error('El genero no existe.');
        }

        const newBook = await BookModel.create({
            name: req.body.name,
            description: req.body.description,
            gender_id: {
                _id: genderExist._id
            }
        })
        res.status(200).send({
            Message: 'Libro guardado',
            data: newBook
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
})

// - Modificar la descripcion de un libro
app.put('/book/:id', async (req, res) => {
    try {
        if (!req.body.description) {
            res.status(400)
            throw new Error('No enviaste una descripcion.')
        }
        const modifiedBook = await BookModel.findByIdAndUpdate(req.params.id, { description: req.body.description }, { new: true })
        res.status(200).send({
            message: 'Descripcion modificado.',
            data: modifiedBook
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            message: error.message,
            data: libroModificado
        })
    }
})

// - Prestar un libro
app.put('/book/prestar/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400);
            throw new Error('No existe libro con ese _id');
        }
        const personExist = await PersonModel.findOne({ nickName: req.body.person }, '_id');
        console.log(personExist);
        if (!personExist) {
            res.status(400);
            throw new Error('Persona no encontrada.');
        }
        const libroPrestadoA = await BookModel.findByIdAndUpdate(req.params.id, { person_id: personExist._id }, { new: true });

        res.status(200).send({
            message: 'Libro prestado',
            data: libroPrestadoA
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            message: error.message
        })
    }
});


//  - Devolver un libro
app.put('/book/devolver/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400);
            throw new Error('No existe libro con ese _id');
        }
        const libroPrestadoA = await BookModel.findByIdAndUpdate(req.params.id, { person_id: null }, { new: true });
        res.status(200).send({
            message: 'Devolviste el libro.',
            data: libroPrestadoA
        });
    }
    catch (error) {
        console.log(error);
        res.send({
            message: error.message
        })
    }
});

// - Borrar un libro
app.delete('/book/delete/:id', async (req, res) => {
    try {
        let toDelete = await BookModel.findById(req.params.id);
        if (!toDelete) {
            res.status(400);
            throw new Error('No existe libro con ese _id');
        }
        if (toDelete.person_id != null) {
            throw new Error('Libro prestado.')
        }
        res.send({
            message: 'Borraste el libro',
            data: toDelete
        })

        toDelete = await BookModel.findByIdAndDelete(req.params.id);

        res.send({
            message: 'Libro borrado',
            data: toDelete
        })

    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
})


// - Mostrar libros por persona que las tienen
app.get('/book/listar/:person', async (req, res) => {
    try {
        const person = await PersonModel.find({ nickName: req.params.person }, '_id');
        if (!person) {
            res.status(400);
            throw new Error('No existe tal persona.')
        }
        const book = await BookModel.find({ person_id: person._id });
        if (!book) {
            res.status(400);
            throw new Error('La persona no tiene libros.');
        }
        res.status(200).send({
            message: 'Los libros prestados por ' + req.params.person,
            data: book
        })
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
})

// - Mostrar libro de un genero
app.get('/book/listar/:genre', async (req, res) => {
    try {
        const genre = await GenderModel.find({ name: req.params.genre }, '_id');
        if (!genre) {
            res.status(400);
            throw new Error('No existe tal genero.')
        }
        const book = await BookModel.find({ person_id: genre._id });
        if (!book) {
            res.status(400);
            throw new Error('No hay libros con tal genero');
        }
        res.status(200).send({
            message: 'Los libros con genero ' + req.params.genre,
            data: book
        })
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
})





app.listen(port, () => {
    console.log('servidor escuchado en el puerto', port);
})