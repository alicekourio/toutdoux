const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

const DATE_FORMAT = "yyyyMMddHHmmss";
const TEMPLATE = `--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------



--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------


`;

function createMigrationFile(migrationName) {
  if (!migrationName) {
    console.log("Please pass the migration name as an argument modafacka");
    return;
  }

  // format file name based on the date and user input
  const formattedDate = format(new Date(), DATE_FORMAT);
  const filename = `${formattedDate}-${migrationName}.sql`;
  const filepath = path.join(process.cwd(), "database-migrations", filename);

  // create a file ready for migration with a model containing UP and DOWN SQL statements
  fs.writeFileSync(filepath, TEMPLATE, { format: "utf-8" });
}

createMigrationFile(process.argv[2]);
