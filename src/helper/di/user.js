/**
 * This file is for decoupling and dependcey injecting the users
 * 
 */
const bcrypt = require('bcryptjs')
export default function buildCreateUser ({ Id, md5, sanitize, makeSource }) {
    return function createUser ({
      email,
      password,
      name,
      token
    } = {}) {
      if (!Id.isValidId(id)) {
        throw new Error('Comment must have a valid id.')
      }
      if (!author) {
        throw new Error('Comment must have an author.')
      }
      if (author.length < 2) {
        throw new Error("Comment author's name must be longer than 2 characters.")
      }
      if (!postId) {
        throw new Error('Comment must contain a postId.')
      }
      if (!text || text.length < 1) {
        throw new Error('Comment must include at least one character of text.')
      }

  
 
  
      return Object.freeze({
        getEmail: () => email,
        getName: () => name,
        getHashedPassword: () => makeHash(password),
        getToken: () => CreateToken()
      })
  
      function CreateToken () {
              return jwt.sign(
              { user_id: user._id, email, name },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
        }
      async function makeHash (password) {
        return await bcrypt.hash(password, 10);
      }
    }
  }