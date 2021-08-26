const Roles = {
    reviewer: ['/restaurants', '/restaurants/:id'],
    owner: ['/restaurants', '/restaurants/:id'],
    admin: ['/restaurants', '/restaurants/:id', '/users']
}

export default Roles