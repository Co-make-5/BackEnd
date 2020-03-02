
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users', 'issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: 'abc123', name: 'Bob', location: 'San Fransisco'},
        {id: 2, username: 'user2', password: 'abc123', name: 'Joe', location: 'New York City'},
        {id: 3, username: 'user3', password: 'abc123', name: 'Amy', location: 'Seattle'}
      ]);
    })
    .then(function () {
      return knex('issues').insert([
        {id: 1, user_id: 1, issue_name: "Affordable housing", location: 'San Fransisco', description: "Make zoning laws less restrictive to increase housing supply", upvotes: 0},
        {id: 2, user_id: 1, issue_name: "Infrastructure", location: 'San Fransisco', description: "Increase city funding to fill potholes", upvotes: 0},
        {id: 3, user_id: 2, issue_name: "Sales tax", location: 'New York City', description: "Proposes a 5 cent cut to sales tax within city limits", upvotes: 0},
        {id: 4, user_id: 2, issue_name: "Subway safety", location: 'New York City', description: "Install more surveillance cameras in the subway system to reduce crime", upvotes: 0},
        {id: 5, user_id: 3, issue_name: "Reusable bags", location: 'Seattle', description: "Ban the use of disposable plastic bags in stores", upvotes: 0},
        {id: 6, user_id: 3, issue_name: "Fund homeless shelters and drug rehabs", location: 'Seattle', description: "Allows more funding for programs to give addicts and the homeless support and rehabilitation", upvotes: 0},
      ])
    })
};
