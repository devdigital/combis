const flatten = arr => [].concat.apply([], arr)

const cartesian = (...sets) =>
  sets.reduce((acc, set) => flatten(acc.map(x => set.map(y => [...x, y]))), [
    [],
  ])

module.exports = cartesian
