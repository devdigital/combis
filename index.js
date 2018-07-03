const fs = require('fs')
const Table = require('cli-table')
const isString = require('inspected/schema/is-string')

const flatten = arr => [].concat.apply([], arr)

const cartesian = (...sets) =>
  sets.reduce((acc, set) => flatten(acc.map(x => set.map(y => [...x, y]))), [
    [],
  ])

const output = results => {
  const table = new Table({
    head: results.headers,
  })

  table.push(...results.rows)
  console.log(table.toString())
}

const args = process.argv

if (args.length <= 2) {
  console.log('No input data path specified.')
  process.exit(1)
}

const json = fs.readFileSync(args[2], 'utf8')
const data = JSON.parse(json)

const headers = Object.keys(data)
const collections = Object.keys(data).map(k => data[k])
const rows = cartesian(...collections)

const results = {
  headers,
  rows,
}

output(results)
