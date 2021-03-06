# Migrate-go-mod-cli

CLI tool for automatic migrating to `go mod`. Will fix relative paths in `import` statements.

**From**

```go
import (
  "fmt"
  "./foo/bar"
  qux "./baz"
)
```

**To**

```go
import (
  "fmt"
  "my-module/foo/bar"
  qux "my-module/baz"
)
```

## Installation

```bash
$ npm install -g migrate-to-mod-cli
```

**You should install node.js (>= v8.0) first**

## Usage

```bash
migrate-go-mod -m <module> -i <input> -o <output>
```

## Contrubitting

This tool is written by `node.js` and `yarn`.

To develop this tool, please run `yarn install` to install the dependencies,
and make sure `yarn test` is passed.

PR is welcome.

## License

MIT
