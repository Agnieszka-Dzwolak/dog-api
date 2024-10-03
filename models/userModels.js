import { v4 as Id } from 'uuid';

let users = [
    {
        id: Id(),
        email: 'aga@gmail.com',
        password: '$2b$10$laoofWaJuw0GUk2szW4X6Oj2Sp8qDF6DzQs5mhmDLTfCxah3cyCg.'
    }
];

class User {
    static getUserByEmail(email) {
        return users.find((user) => user.email === email);
    }

    static add(user) {
        const newUser = { id: Id(), ...user };
        users.push(newUser);
        return newUser;
    }
}

export default User;
