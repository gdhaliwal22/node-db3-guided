const db = require("../data/db-config.js");

module.exports = {
  allUsers,
  findById,
  addUser,
  findUserPosts
};

function allUsers() {
  return db("users");
}

function findById() {
  return db("users").where({ id });
}

function addUser() {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;

      return findById(id);
    });
}

function findUserPosts(userId) {
  /*
    select p.id
    , p.contents as Quote
    , u.username as Author
    from posts as p
    join users as u 
        on p.user_id = u.id
        where user_id = 1;
    */
  return db("posts as p")
    .select("p.id", "p.contents as Quote")
    .join("users as u", "p.user_id", "u.id")
    .where("user_id", userId);
}
