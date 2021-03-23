const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

//registering the mongo
AdminBro.registerAdapter(AdminBroMongoose);

//gets the mongo db
const mongoose = require("mongoose");

//initializes the Adminbro library
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
