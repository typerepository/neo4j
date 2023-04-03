//
// $$\   $$\ $$$$$$$$\  $$$$$$\  $$\   $$\    $$$$$\
// $$$\  $$ |$$  _____|$$  __$$\ $$ |  $$ |   \__$$ |
// $$$$\ $$ |$$ |      $$ /  $$ |$$ |  $$ |      $$ |
// $$ $$\$$ |$$$$$\    $$ |  $$ |$$$$$$$$ |      $$ |
// $$ \$$$$ |$$  __|   $$ |  $$ |\_____$$ |$$\   $$ |
// $$ |\$$$ |$$ |      $$ |  $$ |      $$ |$$ |  $$ |
// $$ | \$$ |$$$$$$$$\  $$$$$$  |      $$ |\$$$$$$  |
// \__|  \__|\________| \______/       \__| \______/
//

require('dotenv').config()

const { query } = require('./services/neo4j');

let J = require('jabber').default;

const main = () => {
  console.log('A user should be created then returned.');

  let jabber = new J();

  let user = {
    name: jabber.createFullName(),
    location: jabber.createWord(10)
  }

  query(
    'CREATE (n:User {name: $name, location: $location})',
    {
      ...user
    }
  ).then((result) => {
    console.log(`user ${user.name}, ${user.location} created.`);
    console.log('requesting user content');
    query(
      'MATCH (n:User {name: $name}) RETURN n;',
      {
        name: user.name
      }
    ).then((result) => {
      console.log('These are the user fields:');
      console.log(result.records[0]._fields);
      process.exit();
    }).catch((err) => {
      console.log('something went wrong when trying to request user data', err);
    })
  }).catch((err) => {
    console.log('something went wrong when trying to create user', err);
  });
}

main();
