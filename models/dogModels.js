import { v4 as Id } from 'uuid';

let dogs = [
    {
        id: Id(),
        name: 'Burek',
        breed: 'Golden Retriever',
        age: 2,
        img: 'https://www.lhic.nl/wp-content/uploads/2022/10/shutterstock_141945937-Golden-Retriever.jpg'
    },
    {
        id: Id(),
        name: 'Luna',
        breed: 'Labrador Retriever',
        age: 4,
        img: 'https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg'
    },
    {
        id: Id(),
        name: 'Bella',
        breed: 'Beagle',
        age: 3,
        img: 'https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg'
    },
    {
        id: Id(),
        name: 'Rocky',
        breed: 'Bulldog',
        age: 1,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ_-mK3pYYbRL4nTT2BJgipnOTYSDf86-GSxxz-Um8XLL0as4cr'
    },
    {
        id: Id(),
        name: 'Max',
        breed: 'German Shepherd',
        age: 2,
        img: 'https://cdn2.thedogapi.com/images/r1f_ll5VX.jpg'
    }
];

class Dog {
    static getAll() {
        return dogs;
    }

    static getById(id) {
        return dogs.find((dog) => dog.id === id);
    }

    static add(dog) {
        const newDog = { id: Id(), ...dog };
        dogs.unshift(newDog);
        return newDog;
    }

    static update(id, dog) {
        const dogExist = dogs.find((dog) => dog.id === id);
        if (dogExist) {
            dogExist.name = dog.name;
            dogExist.breed = dog.breed;
            dogExist.age = dog.age;
            dogExist.img = dog.img;

            return dogExist;
        } else {
            return null;
        }
    }

    static remove(id) {
        const dogExist = dogs.find((dog) => dog.id === id);
        if (dogExist) {
            dogs = dogs.filter((dog) => dog.id !== id);
            return true;
        } else {
            return false;
        }
    }
}

export default Dog;
