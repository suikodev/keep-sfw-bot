module.exports = {
  type: "better-sqlite3",
  database: "./bot.db",
  entities: ["./dist/entities/**.js"],
  synchronize: true,
};
