import styled from "styled-components";
import { UsersDataContext } from "./Context/UsersContext";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Close, CommentOutlined } from "@mui/icons-material";

const socket = io.connect("http://localhost:8001");


const DirectMessage = () => {
  //User's Context
  const allRedFunc = useContext(UsersDataContext);

  // socket messages
  const [messgRC, setmessgRC] = useState("");
  const [messg, setmessg] = useState("");

  //Open Message Box
  const handleDMopen = () => {
    console.log("dm opened");
    allRedFunc.directMessageOpen();
  };
  //Close Message Box
  const handleDMclose = () => {
    console.log("dm closed");
    allRedFunc.directMessageClose();
  };

  //SOCKET.IO RECEIVE MESSAGE
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setmessgRC(data.message);
    });
  }, [socket]);

  //SOCKET.IO CONNECTION
  socket.on("connection", () => {
    console.log("first");
  });

  //SOCKET.IO SEND MESSAGE
  const sendMessage = (data) => {
    socket.emit(
      "send_message",
      allRedFunc.userState.signedStudent!==null
        ? ({
            body: {
              text: messg,
              to: allRedFunc.userState.direcMessageTo,
              from: allRedFunc.userState.signedStudent,
            },
          })
        :( {
            body: {
              text: messg,
              to: allRedFunc.userState.direcMessageTo,
              from: allRedFunc.userState.signedMentor,
            },
          })
    );
  };

  return (
    <>
      {allRedFunc.userState.loadStatus ? (
        <>
          {allRedFunc.userState.direcMessageContainer ? (
            <MessageContainer>
              {" "}
              <CloseBtn onClick={handleDMclose}>
                <Close style={{ marginRight: " 15px" }} />
              </CloseBtn>
              <h1>message received: {messgRC}</h1>
              <input
                onChange={(event) => {
                  setmessg(event.target.value);
                }}
                placeholder="Mesage..."
              />
              <button onClick={sendMessage}>send message</button>
            </MessageContainer>
          ) : (
            <MessageIconContainer onClick={handleDMopen}>
              <CommentOutlined style={{ height: "65px", width: "65px" }} />
            </MessageIconContainer>
          )}
        </>
      ) : (
        null
      )}
    </>
  );
};


const MessageIconContainer = styled.div`
 height: 70px;
  width: 70px;
  position: sticky;
  bottom: 20px;
  margin-left: calc(100vw - 170px);
  margin-bottom: 35px;
`
const CloseBtn = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;
`;
const MessageContainer = styled.div`
  height: 500px;
  width: 400px;
  background-color: rgba(66, 66, 66, 0.4);
  position: sticky;
  bottom: 20px;
  margin-left: calc(100vw - 450px);
  margin-bottom: 20px;

  border: 2px solid rgba(66, 66, 66, 0.2);
  box-shadow: 0px 14px 32px -6px rgba(66, 66, 66, 0.8);
  backdrop-filter: blur(5px);
`;
//   const DirectMessageContainer = styled.div`
//   background-color: transparent;
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
//   flex-direction: row;

//   pointer-events: none;

//   margin-right: 130px;
//  `;

export default DirectMessage;
