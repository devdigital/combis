# combis
Find all combinations of input data

## Install

```
npm i -g combis
```

## Usage

Create a JSON file with your input data. Each property of the JSON represents a domain of values, the value of the property is an array of all possible values within that domain.

E.g:

```json
// input.json
{
   "foo": ["one", "two"],
   "bar": [1, 2, 3]
}
```

Run `combis`:

```
combis json -p input.json
```

By default, this will output all combinations as a table:

| foo | bar |
| --- | --- |
| one | 1   |
| one | 2   |
| one | 3   |
| two | 1   |
| two | 2   |
| two | 3   |

You can also output the combinations as CSV using:

```
combis json -p input.json -f csv
```

Output:

```
foo, bar
one, 1
one, 2
one, 3
two, 1
two, 2
two, 3
```
