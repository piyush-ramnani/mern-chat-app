import { useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  //Async simply allows us to write promises-based code as if it was synchronous It makes sure that a promise is returned and if it is not returned then JavaScript automatically wraps it in a promise which is resolved with its value.

  //Await function is used to wait for the promise. It could be used within the async block only. It makes the code wait until the promise returns a result. It only makes the async block wait.
  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");

    console.log(data);
  };

  //The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional: useEffect(<function>, <dependency>). By using [] dependency in the below function it only renders the first time.

  /* 
  EXAMPLE:
  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- Hook dependent on count variable, renders whenever count changes
  */

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chat Page</div>;
};

export default ChatPage;
