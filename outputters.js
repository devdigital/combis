const outputConsole = resultsString => console.log(resultsString)

const outputters = [
  {
    id: 'console',
    outputter: outputConsole,
  },
]

module.exports = outputters
