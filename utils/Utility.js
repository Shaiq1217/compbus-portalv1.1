const mongoose = require('mongoose');
const { Mixed } = mongoose.Schema.Types;
const User = require('../models/User');

class Utility {
  standardizeInput(input) {
    return input.toLowerCase().replace(/\s/g, '');
  }

  userRoles = {
    ADMIN: 'admin',
    USER: 'user'
  };
  async isFirstUser() {
    return User.countDocuments({}).then(count => count === 0);
  }

  userProps = [
    'id',
    'username',
    'email',
    'isDeleted',
    'isGoogleAuth',
    'role'
    
  ]

  async createModel(input) {
    const { name, description } = input.body;
    const schema = new mongoose.Schema({});
    Object.keys(description).forEach(field => {
      const fieldConfig = description[field];
      schema.add({
        [field]: {
          type:
            fieldConfig.type === 'boolean' ?
              Boolean :
              fieldConfig.type === 'number' ?
                Number :
                fieldConfig.type === 'string' ?
                  String :
                  Mixed,
          required: Boolean(fieldConfig.required),
          min: fieldConfig.min ? fieldConfig.min : 0,
          max: fieldConfig.max ? fieldConfig.max : 512
        }
      });
    });
    schema.add({
      isDeleted: {
        type: Boolean,
        'default': false
      }
    });
    const newModel = await mongoose.model(name, schema);
    return newModel;
  }

  checkExistingModel(name) {
    console.log(mongoose.modelNames());
    return mongoose.modelNames().includes(name);
  }
}

const utility = new Utility();
module.exports = utility;
