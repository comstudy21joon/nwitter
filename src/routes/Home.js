import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "./Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
    });
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // 실시간 갱신이 안되는 getNweets 함수 - 테스트에 사용하고 실제로 쓰지 않음.
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = { ...document.data(), id: document.id };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    //getNweets();
    // useEffect() 훅 함수에서 onSnapshot() 이벤트 핸들러 사용 - 실시간 DB가 된다.
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  //console.log(nweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="무슨 생각을 하고 있니?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        ---- nweet list ----
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
