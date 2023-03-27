const express = require("express");
const mariadb = require("mariadb");
const app = express();
const port = 5252;
const pool = mariadb.createPool({
  host: "database",
  port: 3306,
  database: "app",
  user: "root",
  password: "example",
});

async function getRows() {
  let conn;
  let rows;
  try {
    conn = await pool.getConnection();
    rows = await conn.query("SELECT * FROM todos");
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
  return rows;
}

async function getNotDone() {
  let conn;
  let rows;
  try {
    conn = await pool.getConnection();
    rows = await conn.query("SELECT * FROM todos WHERE completed=false");
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
  return rows;
}

async function addRow(title, description) {
  let conn;
  let insert;
  let result = {
    insert: false,
    title: title,
    description: description,
  };
  try {
    conn = await pool.getConnection();
    insert = await conn.query("INSERT INTO app.todos (title, description) VALUES (?, ?)", [title, description]);
    result.insert = true;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
  return result;
}

async function deleteRowById(id) {
  let conn;
  let insert;
  let result = {
    delted: false,
    id: id,
  };
  try {
    conn = await pool.getConnection();
    insert = await conn.query("DELETE FROM todos WHERE id=?", [id]);
    result.delted = true;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
  return result;
}

async function updateTask(id) {
  let conn;
  let insert;
  let result = {
    update: false,
    id: id,
  };
  try {
    conn = await pool.getConnection();
    insert = await conn.query("UPDATE todos SET completed=true WHERE id=?", [id]);
    result.update = true;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
  return result;
}

app.get("/", async (req, res) => {
  const rows = await getRows();
  console.log(rows);
  res.send(rows);
});

app.get("/notdone", async (req, res) => {
  const rows = await getNotDone();
  console.log(rows);
  res.send(rows);
});

app.get("/title/:title/description/:description", async (req, res) => {
  const created = await addRow(req.params.title, req.params.description);
  res.send(created);
});

app.get("/id/:id/delete", async (req, res) => {
  const delted = await deleteRowById(req.params.id);
  res.send(delted);
});

app.get("/id/:id/update", async (req, res) => {
  const update = await updateTask(req.params.id);
  res.send(update);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
