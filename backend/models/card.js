const mongoose = require('mongoose');
const { LINK_REGEX } = require('../utils/regularExpression');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
      message: (props) => `${props.value} неправильный формат ссылки`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

}, {
  versionKey: false,
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
