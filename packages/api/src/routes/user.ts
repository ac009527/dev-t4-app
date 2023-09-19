import { eq } from 'drizzle-orm'
import { UserTable, UserSchema, type User } from '../db/schema'
import { router, protectedProcedure } from '../trpc'
import { parse } from 'valibot'
// 自动生成userTable的增删改查  以及对应的trpc路由


export const userRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const user = await db.select().from(UserTable).where(eq(UserTable.id, ctx.user.id)).get()
    return user
  }),
  create: protectedProcedure
    .input((raw) => parse(UserSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.insert(UserTable).values(input).run()
    }),
  delete: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    await db.delete(UserTable).where(eq(UserTable.id, ctx.user.id)).run()
  }),
})
// 写一个传递sqllitetable 返回 xxxxRouter 的工厂函数 这个函数需要包括增删改查和分页的路由
// 传递一个table 返回一个router
export const crudRouter = (table: any) => {
  return router({
    current: protectedProcedure.query(async ({ ctx }) => {
      const { db } = ctx
      const user = await db.select().from(table).where(eq(table.id, ctx.user.id)).get()
      return user
    }),
    create: protectedProcedure
      .input((raw) => parse(UserSchema, raw))
      .mutation(async ({ ctx, input }) => {
        const { db } = ctx
        await db.insert(table).values(input).run()
      }),
    delete: protectedProcedure.query(async ({ ctx }) => {
      const { db } = ctx
      await db.delete(table).where(eq(table.id, ctx.user.id)).run()
    }),
    find: protectedProcedure.query(async ({ ctx }) => {
      const { db } = ctx
      const user = await db.select().from(table).where(eq(table.id, ctx.user.id)).get()
      return user
    }),
    update: protectedProcedure.query(async ({ ctx }) => {
      const { db } = ctx
      const user = await db.select().from(table).where(eq(table.id, ctx.user.id)).get()
      return user
    }),
    
  })
}

