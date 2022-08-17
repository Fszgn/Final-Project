import styled from "styled-components";
import { UsersDataContext } from "./Context/UsersContext";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Close, CommentOutlined } from "@mui/icons-material";


const socket = io.connect("http://localhost:8001");

const DirectMessage = () => {
  
  //User's Context
  const allRedFunc = useContext(UsersDataContext);

  // Received socket messages
  const [messgReceived, setMessgReceived] = useState([]);
  // Set socket inpt message to be sent
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
 
  // SOCKET.IO RECEIVE MESSAGE
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessgReceived(data);
      // console.log(messgReceived);
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
      allRedFunc.userState.signedStudent !== null
        ? {
            body: {
              time: new Date().getTime(),
              text: messg,
              to: allRedFunc.userState.direcMessageTo,
              from: allRedFunc.userState.signedStudent,
            },
          }
        : {
            body: {
              text: messg,
              time: new Date().getTime(),
              to: allRedFunc.userState.direcMessageTo,
              from: allRedFunc.userState.signedMentor,
            },
          }
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
              <InputBox>
                <MessageBox>{messgReceived.messages?.map(el=>{return <Bubble>{el.text}</Bubble>;})}</MessageBox>
                <ButtonContainer>
                  <ReviewEntry
                    onChange={(event) => {
                      setmessg(event.target.value);
                     
                    }}
                    placeholder="Message..."
                 />
                  <ReviewBtn onClick={sendMessage}>send message</ReviewBtn>
                </ButtonContainer>
              </InputBox>
            </MessageContainer>
          ) : (
            <MessageIconContainer onClick={handleDMopen}>
              <CommentOutlined style={{ height: "65px", width: "65px" }} />
            </MessageIconContainer>
          )}
        </>
      ) : null}
    </>
  );
};


const Bubble = styled.div`
  background-color: white;
 border-radius: 10px 10px 0  10px;
  margin: 5px;
  padding: 3px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;
`;
const MessageBox = styled.div`

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  flex-direction: column;
`;
const ReviewEntry = styled.input`
  margin-left: 10px;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #3b3b3b;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  min-height: 50px;
  padding: 5px;
  min-width: 55%;
`;
const ReviewBtn = styled.button`
  margin-bottom: 10px;
  margin-right: 5%;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #3b3b3b;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  min-height: 60px;
  margin-left: 25px;

  outline: none;
  padding: 12px 18px;
  text-align: center;
  text-decoration: none;
  &:hover {
    transition-property: all;
    transition-duration: 300ms;
    transform: translate(0, -2px);
    background-color: #3b3b3b;
    color: white;
  }
`;
const InputBox = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  flex-direction: column;
`;
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


export default DirectMessage;
