const neo4j = require('neo4j-driver');

const instance = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_LOGIN, process.env.NEO4J_PASSWORD)
);

const query = (q, params) => new Promise(async (accept, reject) => {
  try {
    let session = instance.session();
    let result;
    if (params) {
      result = await session.run(q, params);
      session.close();
    } else {
      result = await session.run(q);
      session.close();
    }
    accept(result);
  } catch (err) {
    reject('service unavailable');
  }
})

module.exports = {
  query
};
