const Mutations = {
  async createItem (parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // This is how to create a relationship between the Item and the User
          ...args
        }
      },
      info
    );

    console.log(item);

    return item;
  },

  async createUser (parent, args, ctx, info) {
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          // This is how to create a relationship between the Item and the User
          ...args
        }
      },
      info
    );

    console.log(user);

    return user;
  },
  updateItem(parent, args, ctx, info) {
    const update = { ...args };
    // remove id from updates
    delete update.id;
    // run the update method
    return ctx.db.mutation.updateItem({
      data: update,
      where: { id: args.id }
    }, info);
  }
};

module.exports = Mutations;
