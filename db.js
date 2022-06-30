const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Praveen@123",
        database: "praveen1"
    }
})

knex.schema.createTable("user",table=>{
    table.increments("id");
    table.string("name");
    table.string("email");
    table.string("password");
}).then((data)=>{
    console.log("data_created");
}).catch((err)=>{
    // console.log(err);
})

module.exports = knex
