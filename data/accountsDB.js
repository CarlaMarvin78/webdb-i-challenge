const db = require ('./dbConfig')

function get(id){
    if (id == undefined) {
        return db('accounts');
    } else {
        return db('accounts')
        .where({ id })
        .first();
    }
}

function insert(account) {
    return db('accounts')
    .insert(account)
    .then(ids => {
      return get(ids[0]);
    });
}

function getByName(name) {
    return db('accounts')
    .where({name})
    .first();
}

function remove(id) {
    return db('accounts')
    .where({id})
    .del();
}

function update(id, changes) {
    return db('accounts')
    .where({ id })
    .update(changes);
}

module.exports = {get, insert, getByName, remove, update}
