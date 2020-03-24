
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username_1', password: '$2b$08$SbJwip2HC3WafIdJCKoQ7Ovpjn5IFJM/EfGs7f2g.LPq4yZRWLsrS', department: 'sales'},
        {username: 'username_2', password: '$2b$08$SbJwip2HC3WafIdJCKoQ7Ovpjn5IFJM/EfGs7f2g.LPq4yZRWLsrS', department: 'service'},
        {username: 'username_3', password: '$2b$08$SbJwip2HC3WafIdJCKoQ7Ovpjn5IFJM/EfGs7f2g.LPq4yZRWLsrS', department: 'HR'}
      ]);
    });
};
