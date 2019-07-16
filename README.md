# Compose

Simple utility to compose multiple async/await middleware functions into a single
middleware function.

Also see [@art-of-coding/lime](https://github.com/Art-of-Coding/lime).

## Install

```
npm i @art-of-coding/lime-compose
```

## API

#### compose()

```ts
compose<C = Context> (...middlewares: MiddlewareFunction<C>[]) => MiddlewareFunction<C>
```

Composes the middlewares into a single middleware function.

TypeScript users can provide a context definition (`C`) which allows type checking
within the middlewares. For more information about type checking see [index.ts](src/index.ts).

## Example

```ts
import compose, { Context } from '@art-of-coding/lime-compose'

// Optional context definition
// May extend `Context`, but this is not necessary
interface MyContext extends Context {
  age?: number
}

const composed = compose<MyContext>(
  async (ctx, next) => {
    // 1st middleware
    ctx.age = 18
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
  // middleware completed
}).catch(err => {
  // middleware error
})
```

### License

Copyright 2019 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
