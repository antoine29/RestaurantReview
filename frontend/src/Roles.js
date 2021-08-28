const Roles = {
    reviewer: ['/restaurants', '/restaurants/:id'],
    owner: ['/restaurants', '/restaurants/:id', '/owner/:id/restaurants'],
    admin: ['/restaurants', '/restaurants/:id', '/users']
}

export default Roles