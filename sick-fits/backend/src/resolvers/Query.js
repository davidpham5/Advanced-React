// instead of writing out items() in our Query
// we can use forwardTo() to defer method in prisma.graphql
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   console.log('getting items');
  //   const item = await ctx.db.query.items();
  //   return item;
  // }
  users: forwardTo('db')
};

module.exports = Query;
