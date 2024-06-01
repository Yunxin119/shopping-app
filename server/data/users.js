import bcrypt from 'bcryptjs'

const users = [
    {
        username: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin12345', 10),
        isAdmin: true
    }, 
    {
        username: 'Yunxin Liu',
        email: 'yunxin@gmail.com',
        password: bcrypt.hashSync('yunxinliu12345', 10),
        isAdmin: false
    },
    {
        username: 'Stella Liu',
        email: 'stella@gmail.com',
        password: bcrypt.hashSync('stellaliu12345', 10),
        isAdmin: false
    }
]

export default users;