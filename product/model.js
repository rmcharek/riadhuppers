const sqlite = require('sqlite3');
const db = new sqlite.Database('./products.db');

function getAll(options) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM products `;
    if (options.sort && ['asc', 'desc'].includes(options.sort.toLowerCase())) {
      query += ' ORDER BY title ' + options.sort;
    }

    db.all(query, [options.userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


function getOne(id, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT * FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
    db.get(query, [id, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function insert(movie, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)';
    db.run(query, [movie.title, movie.year, movie.public, userId], function(
      error,
      result,
    ) {
      if (error) {
        reject(error);
      } else {
        movie.id = this.lastID;
        movie.user = userId;
        resolve(movie);
      }
    });
  });
}

function update(movie, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';
    db.run(
      query,
      [movie.title, movie.year, movie.public, userId, movie.id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          movie.user = userId;
          resolve(movie);
        }
      },
    );
  });
}

function remove(id, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
    db.run(query, [id, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function rate(rating) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Ratings WHERE movie = ? AND user = ?';
    db.run(query, [rating.movie, rating.user], error => {
      if (error) {
        reject(error);
      } else {
        const query =
          'INSERT INTO Ratings (movie, user, rating) VALUES (?, ?, ?)';
        db.run(query, [rating.movie, rating.user, rating.rating], error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}





module.exports = {
  getAll,
  get: getOne,
  delete(id, userId) {
    return remove(id, userId);
  },
  save(movie, userId) {
    if (!movie.id) {
      return insert(movie, userId);
    } else {
      return update(movie, userId);
    }
  },
  rate,
};
