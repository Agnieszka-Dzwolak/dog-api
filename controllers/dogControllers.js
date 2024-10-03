import Dog from '../models/dogModels.js';

const dogControllers = {
    getDogs: (req, res) => {
        const dogs = Dog.getAll();
        const { token } = req.cookies;
        res.status(200).render('dogs', { dogs, token });
    },
    getDog: (req, res) => {
        const { id } = req.params;
        const dog = Dog.getById(id);
        if (dog) {
            res.status(200).render('dog', { dog });
        } else {
            res.status(404).render('404', {
                title: 'Dog does not exist',
                message: 'Dog does not exist'
            });
        }
    },
    addDogForm: (req, res) => {
        res.status(200).render('add-dog-form');
    },
    addDog: (req, res) => {
        const { name, breed, age, img } = req.body;

        if (name && breed && age && img) {
            Dog.add({ name, breed, age, img });
            res.status(302).redirect('/api/dogs');
        } else {
            res.status(200).render('404', {
                title: 'Invalid input',
                message: 'All fields should be filled in'
            });
        }
    },
    updateDog: (req, res) => {
        const { name, breed, age, img } = req.body;
        const { id } = req.params;

        if (name && breed && age && img) {
            const updatedDog = Dog.update(id, { name, breed, age, img });
            if (updatedDog) {
                res.status(302).redirect('/api/dogs');
            } else {
                res.status(404).render('404', {
                    title: 'Dog not found',
                    message: 'Dog not found'
                });
            }
        } else {
            res.status(400).render('404', {
                title: 'All fields are required',
                message: 'All fields are required'
            });
        }
    },
    deleteDog: (req, res) => {
        const { id } = req.params;
        const dogRemoved = Dog.remove(id);
        if (dogRemoved) {
            res.status(302).redirect('/api/dogs');
        } else {
            res.status(400).render('404', {
                title: 'Dog not found',
                message: 'Dog not found'
            });
        }
    }
};

export default dogControllers;
