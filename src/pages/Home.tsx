import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  return (
    <div>
      Home
      <button onClick={() => history.push('/account')}>Account</button>
    </div>
  );
}

export default Home;