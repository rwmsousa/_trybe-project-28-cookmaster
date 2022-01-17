module.exports = {
    success: 200,
    created: 201,
    badRequest: 400,
    notFound: 404,
    unprocessableEntity: 422,
    serverError: 500,
};

// 200 OK
// Esta requisição foi bem sucedida.O significado do sucesso varia de acordo com o método HTTP:

// 201 Created
// A requisição foi bem sucedida e um novo recurso foi criado como resultado.Esta é uma tipica resposta enviada após uma requisição POST.

// 400 Bad Request
// Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.

// 404 Not Found
// O servidor não pode encontrar o recurso solicitado.

// 422 Unprocessable Entity(WebDAV(en - US))
// A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.

// 500 Internal Server Error
// O servidor encontrou uma situação com a qual não sabe lidar.
