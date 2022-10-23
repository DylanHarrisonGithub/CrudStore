import pg from 'pg';

const quoteString = (val: string | number | boolean): string | number | boolean => (typeof val === 'string') ? "'"+val+"'" : val;

const db = {

  row: {
    create: async (table: string, row: { [key: string]: string | number | boolean }): Promise<{ success: boolean, query: string, message: string[] }> => {
      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `INSERT INTO "${table}" (${
          Object.keys(row).map((key, index) => index !== Object.keys(row).length -1 ? key + ', ' : key).join("")
        }) VALUES (${
          Object.keys(row).map((key, index) => index !== Object.keys(row).length -1 ? quoteString(row[key]) + ', ' : quoteString(row[key])).join("")
      });`;
      try {
        await client.connect();
        await client.query(query);
        await client.end();
        return {
          success: true,
          query: query,
          message: [`Row successfully inserted into table ${table}.`]
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [`Error attempting to insert row into table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      }
    },

    read: async (
      table: string, 
      where?: { [key: string]: string | number | boolean }
    ): Promise<{ 
      success: boolean, 
      message: string[], 
      query: string,
      result?: any// { [key: string]: string | number | boolean }[] 
    }> => {
      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `SELECT * FROM "${table}"${
        (where && Object.keys(where).length) ? 
          ` WHERE ` + 
          Object.keys(where).map((key, index) => index !== Object.keys(where).length -1 ? 
            key + ` = ` + quoteString(where[key]) + ` AND `
          :
            key + ` = ` + quoteString(where[key])
          ).join("")
        : `` 
      };`;
      try {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        return {
          success: true,
          query: query,
          message: [`Rows successfully selected from table ${table}.`],
          result: result.rows
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [`Error attempting to select from table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      }
    },

    update: async (table: string, columns: { [key: string]: string | number | boolean }, where?: { [key: string]: string | number | boolean }): Promise<{ success: boolean, query: string, message: string[] }> => {
      
      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `UPDATE "${table}" SET ${
        Object.keys(columns).map((key, index) => index !== Object.keys(columns).length -1 ? 
            key + ` = ` + quoteString(columns[key]) + `, `
          :
            key + ` = ` + quoteString(columns[key])
          ).join("")
        } ${
          (where && Object.keys(where).length) ? 
            `WHERE ` + 
            Object.keys(where).map((key, index) => index !== Object.keys(where).length -1 ? 
              key + ` = ` + quoteString(where[key]) + ` AND `
            :
              key + ` = ` + quoteString(where[key])
            ).join("")
          : `` 
      };`;

      if (!(Object.keys(columns).length)) {
        return {
          success: false,
          query: query,
          message: [`No updates were provided for table ${table}.`]
        }
      }

      try {
        await client.connect();
        await client.query(query);
        return {
          success: true,
          query: query,
          message: [`Row(s) successfully updated in table ${table}.`]
        }
      } catch (error) {
        return {
          success: false,
          query: query,
          message: [`Error attempting to update row(s) in table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      } finally {
        await client.end();
      }   
    },

    delete: async (table: string, where?: { [key: string]: string | number | boolean }): Promise<{ success: boolean, query: string, message: string[] }> => {

      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `DELETE FROM "${table}"${
        (where && Object.keys(where).length) ? 
          ` WHERE ` + 
            Object.keys(where).map((key, index) => index !== Object.keys(where).length -1 ? 
              key + ` = ` + quoteString(where[key]) + ` AND `
            :
              key + ` = ` + quoteString(where[key])
            ).join("")
        : `` 
      };`;
      try {
        await client.connect();
        await client.query(query);
        return {
          success: true,
          query: query,
          message: [`Row(s) successfully deleted in table ${table}.`]
        }
      } catch (error) {
        return {
          success: false,
          query: query,
          message: [`Error attempting to delete row(s) in table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      } finally {
        await client.end();
      }   
    }
  },

  table: {

    create: async (table: string, columns: { [key: string]: string }): Promise<{ success: boolean, query: string, message: string[] }> => {

      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `CREATE TABLE IF NOT EXISTS "${table}" (${
        Object.keys(columns).map((key, index) => `\n  ${key} ${columns[key]}`) // (index !== Object.keys(columns).length -1 ? ',' : '')}`)
      }\n);`;

      console.log(query);

      try {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        console.log(result);

        return {
          success: true,
          query: query,
          message: [`Table ${table} successfully created.`],
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [`Error attempting to create table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      }

    },

    read: async (table?: string): Promise<{ 
      success: boolean, 
      message: string[], 
      query: string,
      result?: any// { [key: string]: string | number | boolean }[] 
    }> => {

      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = table ?
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}';` 
      : 
        `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE AND table_schema = 'public';`;
      
      try {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        return {
          success: true,
          query: query,
          message: [table ? `${table} read successfully.` : `Tables read successfully`],
          result: result.rows
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [table ? `Error attempting to read table ${table}.` : `Error attempting to read tables.`].concat(<string[]>(<any>error).stack)
        }
      }
    },

    update: async (
      table: string,
      updates: {
        add?: { [column: string]: string },
        drop?: string[],
        redifine?: { [column: string]: string },
        rename?: { [column: string]: string }
      }
    ): Promise<{ success: boolean, query: string, message: string[] }> => {

      if (!(Object.keys(updates).length)) {
        return {
          success: true,
          query: '',
          message: [`Warning attempting to update table ${table}. No updates were provided`]
        }
      }

      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `ALTER TABLE "${table}"${
        Object.keys(updates.add || {}).map((column, i) => `\n  ADD "${column}" ${updates.add![column]}`)
      } ${
        updates.drop?.map((column, i) => `\n  ADD DROP COLUMN "${column}"`)
      } ${
        Object.keys(updates.redifine || {}).map((column, i) => `\n  ALTER COLUMN "${column}" TYPE ${updates.redifine![column]}`)
      } ${
        Object.keys(updates.rename || {}).map((column, i) => `\n  RENAME COLUMN "${column}" TO ${updates.redifine![column]}`)
      };`;

      try {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        console.log(result);

        return {
          success: true,
          query: query,
          message: [`Table ${table} successfully updated.`],
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [`Error attempting to update table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      }
    },

    delete: async (table: string): Promise<{ success: boolean, query: string, message: string[] }> => {

      const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
      const query = `DROP TABLE "${table}";`;

      try {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        console.log(result);

        return {
          success: true,
          query: query,
          message: [`Table ${table} successfully deleted.`],
        }
      } catch (error) {
        await client.end();
        return {
          success: false,
          query: query,
          message: [`Error attempting to delete table ${table}.`].concat(<string[]>(<any>error).stack)
        }
      }
    }

  }

};

export default db;