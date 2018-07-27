#!/usr/bin/env node

const fs = require('fs')
const yargs = require('yargs')
const formatters = require('./formatters')
const outputters = require('./outputters')
const cartesian = require('./cartesian')

const processData = data => {
  const headers = Object.keys(data)
  const collections = Object.keys(data).map(k => data[k])
  const rows = cartesian(...collections)

  return {
    headers,
    rows,
  }
}

const processJson = jsonPath => {
  const json = fs.readFileSync(jsonPath, 'utf8')
  const data = JSON.parse(json)
  return processData(data)
}

const output = (formatterId, outputterId, results) => {
  const formatterEntry = formatters.find(f => f.id === formatterId)
  if (!formatterEntry) {
    throw new Error(`Formatter with id '${formatterId}' not found.`)
  }

  const outputterEntry = outputters.find(o => o.id === outputterId)
  if (!outputterEntry) {
    throw new Error(`Outputter with id '${outputterId}' not found.`)
  }

  const resultsString = formatterEntry.formatter(results)
  outputterEntry.outputter(resultsString)
}

const commandJson = args => {
  const jsonArgs = args
    .usage('Usage combis json [options]')
    .alias('p', 'path')
    .describe('p', 'Json file path')
    .string('p')
    .alias('f', 'formatter')
    .describe('f', 'Formatter for results')
    .choices('f', ['csv', 'table'])
    .default('f', 'table')
    .demandOption(['path'], 'You must specify a JSON path.')
    .example('combis json -p ./foo.json')
    .example('combis json -p ./foo.json -f csv').argv

  const results = processJson(jsonArgs.path)
  output(jsonArgs.formatter, 'console', results)
}

const argv = yargs
  .usage('$0 <command>')
  .command('json', 'Process combinations from JSON file', commandJson)
  .demandCommand(1, 'You must specify a command.')
  .help('h')
  .alias('h', 'help')
  .version().argv
