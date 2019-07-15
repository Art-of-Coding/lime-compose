'use strict'

export interface Context {
  [x: string]: any
}

export interface MiddlewareFunction<C = Context> {
  (ctx: C, next?: () => Promise<void>): Promise<void>
}

export function compose<C = Context> (...stack: MiddlewareFunction<C>[]) {
  return (ctx: C, next?: () => Promise<void>) => {
    let index = -1

    const dispatch = async (i: number) => {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }

      index = i
      let fn = stack[i]
      if (i === stack.length) {
        fn = next
      }

      if (fn) {
        await fn(ctx, () => dispatch(i + 1))
      }
    }

    return dispatch(0)
  }
}

export default compose
