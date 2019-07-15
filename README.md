# Compose

Simple utility to compose multiple async/await middleware functions into a single,
callable function.

Also see [@art-of-coding/lime](https://github.com/Art-of-Coding/lime).

## Example

```ts
import compose from '@art-of-coding/compose'

const composed = compose(
  async (ctx, next) => {
    // 1st middleware
    await next()
  },
  async (ctx, next) => {
    // 2nd middleware
    await next()
  },
  async ctx => {
    // 3rd middleware
  }
)

const ctx = {}
composed(ctx).then(() => {
  //
}).catch(err => {
  //
})
```

### License

Copyright 2019 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
