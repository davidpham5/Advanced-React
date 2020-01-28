const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    const item = await ctx.db.query.item({where}, `{id title}`)

    return ctx.db.mutation.deleteItem({where}, info)
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password
    // second arg in hash() is SALT.length or unique password generation
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER']}
      }
    }, info)
    // create the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set a cookie to the response.
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    return user;
  }

};

module.exports = Mutations;
