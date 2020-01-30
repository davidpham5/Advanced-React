// instead of writing out items() in our Query
// we can use forwardTo() to defer method in prisma.graphql
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  users: forwardTo('db'),
  me (parent, args, ctx, info) {
    // check if there is a current user id
    // access user? ctx
    if (!ctx.request.userId) {
       return null;
    }
    return ctx.db.query.user({
      where: {id: ctx.request.userId}
    }, info ); // info is the acutal query from the client side.
  }
};

module.exports = Query;

