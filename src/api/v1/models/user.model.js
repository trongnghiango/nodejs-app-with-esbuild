const { Schema } = require('mongoose');
const { conn1 } = require('../databases/init.multi.mongodb');

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: Schema.Types.String, required: true },
    email: { type: String, required: true, unique: true }, // 'unique' adds index => fastens the querying prcoess
    password: { type: Schema.Types.String, required: true, minLength: 6 },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    avatar: { type: Schema.Types.String },
    bio: { type: Schema.Types.String },
    links: { type: Schema.Types.String },
    joinDate: { type: Schema.Types.Date, default: Date.now },
    location: { type: Schema.Types.String },
    work: { type: Schema.Types.String },
    skills: { type: Schema.Types.String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.index({ userId: 1, email: 1 }, { unique: true });

module.exports = {
  _User: conn1.model('User', userSchema, 'users'), // returns a constructor function
};
