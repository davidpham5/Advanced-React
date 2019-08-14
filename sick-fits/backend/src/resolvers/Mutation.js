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
  }
  // createDog (parent, args, ctx, info) {
  //   global.dogs = global.dogs || [];
  //   const newDog = { name: args.name };
  //   global.dogs.push(newDog);
  //   console.log(args);
  // }
};

module.exports = Mutations;
