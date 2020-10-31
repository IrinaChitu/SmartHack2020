import React, { Component } from 'react';

class CheckEmailPage extends Component {
  onSubmit = (event) => {
    event.preventDefault();

    window.location.href = '/sign-in';
  };

  render() {
    return (
      <div>
        <div className="limiter">
          <div
            className="container-login100"
          >
            <div className="wrap-login100">
              <form
                className="login100-form validate-form"
                onSubmit={this.onSubmit}
              >
                <span className="login100-form-title p-b-34 p-t-27">
                  {' '}
                  We have sent you a password reset link to your email address.{' '}
                </span>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    Go back to log in page
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckEmailPage;