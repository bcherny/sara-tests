var test = require('ava').test
var request = require('request')

/**
 * /todos
 */

test('GET /todos works', function(t) {
  t.plan(2)
  request('http://127.0.0.1:4000/todos', function(err, res, body) {
    t.is(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 200)
  })
})

test('GET /todos returns exactly 3 todos', function(t) {
  t.plan(7)
  request('http://127.0.0.1:4000/todos', function(err, res, body) {
    var json = JSON.parse(body)
    t.is(json.length, 3)
    for (var i = 0; i < 3; i++) {
      t.is(typeof json[i].title, 'string')
      t.is(typeof json[i].created_by, 'string')
    }
  })
})

test('POST /todos fails when some required fields are missing (1)', function(t) {
  t.plan(2)
  request.post('http://127.0.0.1:4000/todos', null, function(err, res, body) {
    t.not(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 400)
  })
})

test('POST /todos fails when some required fields are missing (2)', function(t) {
  t.plan(2)
  request.post('http://127.0.0.1:4000/todos', {
    created_by: 'boris'
  }, function(err, res, body) {
    t.not(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 400)
  })
})

test('POST /todos fails when some required fields are missing (3)', function(t) {
  t.plan(2)
  request.post('http://127.0.0.1:4000/todos', {
    created_by: 'boris'
  }, function(err, res, body) {
    t.not(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 400)
  })
})

test('POST /todos works when all required fields are provided', function(t) {
  t.plan(2)
  request.post('http://127.0.0.1:4000/todos', {
    title: 'my new todo',
    created_by: 'boris'
  }, function(err, res, body) {
    t.is(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 200)
  })
})

test('POST /todos returns a todo with an id', function(t) {
  t.plan(3)
  request.post('http://127.0.0.1:4000/todos', {
    title: 'my new todo',
    created_by: 'boris'
  }, function(err, res, body) {
    var json = JSON.parse(body)
    t.is(json.title, 'my new todo')
    t.is(json.created_by, 'boris')
    t.is(typeof json.id, 'number')
  })
})

test('POST /todos returns a todo that can then be retrieved', function(t) {
  t.plan(1)
  request.post('http://127.0.0.1:4000/todos', {
    title: 'my new todo',
    created_by: 'boris'
  }, function(err, res, body) {
    var json = JSON.parse(body)
    var id = json.id
    request('http://127.0.0.1:4000/todos/' + id, function(err, res, body) {
      var json = JSON.parse(body)
      t.is(json.length, 0)
    })
  })
})


/**
 * /todos/:todo_id
 */

test('GET /todos/1 works', function(t) {
  t.plan(2)
  request('http://127.0.0.1:4000/todos/1', function(err, res, body) {
    t.is(err, null)
    if (!res) {
      t.fail('no response')
      return
    }
    t.is(res.statusCode, 200)
  })
})

test('GET /todos/1 returns exactly 4 items', function(t) {
  t.plan(13)
  request('http://127.0.0.1:4000/todos/1', function(err, res, body) {
    var json = JSON.parse(body)
    t.is(json.length, 4)
    for (var i = 0; i < 4; i++) {
      t.is(typeof json[i].name, 'string')
      t.is(typeof json[i].done, 'boolean')
      t.is(typeof json[i].todo_id, 'number')
    }
  })
})
