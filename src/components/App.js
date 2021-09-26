import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  // 구조 분해 할당
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // setInterval(function () {
  //   console.log(authService.currentUser);
  // }, 2000);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //console.log(user));
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;