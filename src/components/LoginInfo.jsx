import React from 'react';

function* range(start, finish, step = 1) {
  for (let index = start; index <= finish; index += step) yield index;
}

const LoginInfo = () => (
  <div className="page">
    <div className="login-page-info">
      Email:
      <br /><br />
      {[...range(1, 5)].map(index => <div>test{index}@test.com</div>)}
      <br />
      Password: test
    </div>
  </div>
);

export default LoginInfo;
