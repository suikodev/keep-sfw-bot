module.exports = {
  type: "sqlite",
  database: "./dev.db",
  entities: ["./dist/entities/**.js"],
  synchronize: true,
};
