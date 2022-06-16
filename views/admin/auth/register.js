const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, "email")}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, "password")}</p>
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <input required class="input" placeholder="Confirm Password" name="confirmPassword" type="password" />
                <p class="help is-danger">${getError(
      errors,
      "confirmPassword",
    )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/login">Have an account? Login</a>
          </div>
        </div>
      </div>
    `,
  });
};
