const model = require('./model');
function getLinks(current, base) {
  const links = [
    { rel: 'base', href: base + '/' },
    { rel: 'sort-ascending', href: base + '/?sort=asc' },
    { rel: 'sort-descending', href: base + '/?sort=desc' },
  ];
  return links.map(link => {
    if (current.length > 0 && link.rel.includes(current)) {
      link.rel = 'self';
    } else if (current.length === 0 && link.rel === 'base') {
      link.rel = 'self';
    }
    return link;
  });
}


function listAction(request, response) {
  model.getAll(1).then(
    products => {
      const productsResponse = {
        products,
        links: [{ rel: 'self', href: request.baseUrl + '/' }],
      };
      response.json(productsResponse);
    },
    error => response.status(500).json(error),
   
  );
}


function detailAction(request, response) {
  console.log('detail');
  model.get(request.params.id, 1).then(
    movie => {
      const movieResponse = {
        ...movie,
        links: [{ rel: 'self', href: request.baseUrl + '/' }],
      };
      response.json(movieResponse);
    },
    error => response.status(500).json(error),
  );
}

function createAction(request, response) {
  const movie = {
    title: request.body.title,
    year: request.body.year,
    public: parseInt(request.body.public, 10) === 1 ? 1 : 0,
  };
  model
    .save(movie, 1)
    .then(
      () => response.status(201).json(movie),
      error => error => response.status(500).json(error),
    );
}
function updateAction(request, response) {
  const movie = {
    id: request.params.id,
    title: request.body.title,
    year: request.body.year,
    public: parseInt(request.body.public, 10) === 1 ? 1 : 0,
  };
  model
    .save(movie, 1)
    .then(
      movie => response.json(movie),
      error => error => response.status(500).json(error),
    );
}

function deleteAction(request, response) {
  const id = parseInt(request.params.id, 10);
  model
    .delete(id, 1)
    .then(() => response.status(204).send(), error => response.send(error));
}

module.exports = {
  listAction,
  detailAction,
  createAction,
  updateAction,
  deleteAction,
};
