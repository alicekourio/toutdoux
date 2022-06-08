const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

function migrate() {
  open({
    filename: path.join(process.cwd(), "database/database.sqlite"),
    driver: sqlite3.Database,
  }).then(async (db) => {
    try {
      await db.migrate({
        /**
         * If true, will force the migration API to rollback and re-apply the latest migration over
         * again each time when Node.js app launches.
         */
        force: false,
        /**
         * Migrations table name. Default is 'migrations'
         */
        table: "migrations",
        /**
         * Path to the migrations folder. Default is `path.join(process.cwd(), 'migrations')`
         */
        migrationsPath: path.join(process.cwd(), "database-migrations"),
      });
    } catch (error) {
      console.error(error);
    }
  });
}

migrate();
