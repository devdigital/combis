const Table = require('cli-table')

const formatCsv = results => {
  const header = results.headers.join(', ')
  const rows = results.rows.map(r => r.join(', '))
  return `${header}\n${rows.join('\n')}`
}

const formatTable = results => {
  const table = new Table({
    head: results.headers,
  })

  table.push(...results.rows)
  return table.toString()
}

const formatters = [
  {
    id: 'table',
    formatter: formatTable,
  },
  {
    id: 'csv',
    formatter: formatCsv,
  },
]

module.exports = formatters
