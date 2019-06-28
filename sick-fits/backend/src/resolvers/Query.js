const Query = {
  async items(parent, args, ctx, info) {
    const item = await ctx.db.query.item();
    return item;
  }
};

module.exports = Query;
