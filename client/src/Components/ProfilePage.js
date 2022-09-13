import { UsersDataContext } from "./Context/UsersContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import greenPic from "../assets/green future.png";
import { FiLoader } from "react-icons/fi";
import {
  LocationOn,
  Send,
  Badge,
  CoPresent,
  Twitter,
  LinkedIn,
  Facebook,
  Email,
  SignalCellular4Bar,
  Comment,
  RemoveCircleOutline,
  QuestionAnswerOutlined,
  SignLanguageOutlined,
} from "@mui/icons-material";

const ProfilePage = () => {
  const nav = useNavigate();
  //User's Context
  const allRedFunc = useContext(UsersDataContext);
  //State for Triggering various Functions
  const [trigger, setTrigger] = useState(false);
  // State for saving review text onChange
  const [review, setReview] = useState(null);

  //userId
  let userId = useParams();
  //State for saving Each Mentor information
  const [el, setEl] = useState(null);

  // Post a new review
  const handleClick = () => {
    // console.log(review);
    fetch(
      `https://mentormatchingapp-finalpro.herokuapp.com/postReview/${userId.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          text: review,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReview({});
        setTrigger(!trigger);
      });
  };
  // Remove a review
  const handleRemove = (ev, param) => {
    // console.log(param);
    // console.log(review);
    fetch(
      `https://mentormatchingapp-finalpro.herokuapp.com/deleteReview/${userId.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          text: review,
          id: param,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReview({});
        setTrigger(!trigger);
      });
  };
  // Create Unique Id with Mentor's Email on Database
  const handleStartConversation = () => {
    allRedFunc.directMessageOpen();
    allRedFunc.directTo({ el });
    fetch(
      `https://mentormatchingapp-finalpro.herokuapp.com/startConversation`,
      {
        method: "POST",
        body: JSON.stringify({
          text: "I'd like to connect",
          time: new Date().getTime(),
          to: el,
          from: allRedFunc.userState,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  // If No User signedIn -> redirect the User to LOGIN
  const handleRedirectToLogin = () => {
    if (!allRedFunc.userState.loadStatus) {
      window.alert("You are not signed. Please SignIn to send a message");
      nav("/LoginPage");
    }
    return;
  };

  //Redo fetch req in order to receive reviews upon POST one
  useEffect(() => {
    if (userId.id) {
      // console.log(userId.id.length);
      fetch(
        `https://mentormatchingapp-finalpro.herokuapp.com/findEachUser/${userId.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEl(data.body);
          // console.log(data.body)
        });
    }
  }, [review, trigger]);

  return (
    <Container>
      {el ? (
        <Wrapper>
          <MentorCardDiv>
            <ProfileImg src={el.picture}></ProfileImg>

            <InfoContainer>
              <ul>
                {" "}
                <h1> Info</h1>
                <LI>
                  <CoPresent />
                  <p style={{ marginLeft: "15px" }}>
                    {el.firstName} {el.lastName}
                  </p>
                </LI>
                <LI>
                  <LocationOn />
                  <p style={{ marginLeft: "15px" }}>{el.city}</p>
                </LI>
                <LI>
                  <Send
                    onClick={() => (window.location = `mailto:${el.email}`)}
                  />
                  <p
                    onClick={() => (window.location = `mailto:${el.email}`)}
                    style={{ marginLeft: "15px" }}
                  >
                    {el.email}
                  </p>
                </LI>
                <LI>
                  <Badge />
                  {el.mentroship.map((el) => (
                    <p style={{ marginLeft: "15px" }}>{el}</p>
                  ))}
                </LI>
              </ul>
            </InfoContainer>
            <ActivityInfo>
              {" "}
              <ul>
                <h1> Mentorship</h1>
                <LI>{el.mentroship[0]}</LI>
                <LI>{el.mentroship[1]}</LI>
                <LI>{el.mentroship[2]}</LI>
              </ul>
            </ActivityInfo>
            <div>
              {el.isGreen ? (
                <IsGreen style={{ marginTop: "30px", marginLeft: "110px" }}>
                  <GreenImg src={greenPic}></GreenImg>
                </IsGreen>
              ) : (
                <div style={{ width: "30px", height: "50px" }}></div>
              )}
              <div style={{ marginTop: "30px" }}>
                <Email
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />{" "}
                <Twitter
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
                <LinkedIn
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
                <Facebook
                  style={{
                    color: "#1976d2",
                    fontSize: "55px",
                    marginLeft: "25px",
                  }}
                />
              </div>
            </div>
          </MentorCardDiv>
          <Review>
            <ReviewCont>
              {" "}
              <h1>Reviews</h1>
              <ReviewEntryWrap>
                <ReviewEntry
                  onChange={(ev) => {
                    setReview((review) => ({
                      ...review,
                      time: new Date().getMilliseconds(),
                      text: ev.target.value,
                    }));
                  }}
                  value={review?.text}
                  placeholder="Review..."
                  type="text"
                >
                  {review}
                </ReviewEntry>
                <ReviewBtn onClick={handleClick} type="submit" value="Submit">
                  <Comment
                    style={{
                      marginRight: "15px",
                    }}
                  />
                  Leave a Comment{" "}
                </ReviewBtn>
                {allRedFunc.userState.loadStatus ? (
                  <ReviewBtn onClick={handleStartConversation}>
                    <SignLanguageOutlined
                      style={{
                        marginRight: "25px",
                      }}
                    />
                    Say Hello!
                  </ReviewBtn>
                ) : (
                  <ReviewBtn onClick={handleRedirectToLogin}>
                    Sign in to send a message.
                    <QuestionAnswerOutlined
                      style={{
                        marginLeft: "25px",
                      }}
                    />
                  </ReviewBtn>
                )}
              </ReviewEntryWrap>
              <Reviews>
                {el.reviews ? (
                  el.reviews.map((review) => {
                    return (
                      <>
                        {review ? (
                          <LIReview>
                            <SignalCellular4Bar
                              style={{
                                marginRight: "15px",
                              }}
                            />
                            {review.text}

                            <RemoveCircleOutline
                              value={review.time}
                              onClick={(ev) => handleRemove(ev, review.time)}
                              style={{
                                marginLeft: "15px",
                              }}
                            />
                          </LIReview>
                        ) : null}
                      </>
                    );
                  })
                ) : (
                  <LIReview>
                    <SignalCellular4Bar
                      style={{
                        marginRight: "15px",
                      }}
                    />
                    No Comment Yet
                  </LIReview>
                )}
              </Reviews>
            </ReviewCont>
          </Review>
        </Wrapper>
      ) : (
        <LoaderWrapper>
          <Icon>
            <FiLoader style={{ height: "90px", width: "90px" }} />
          </Icon>
        </LoaderWrapper>
      )}
    </Container>
  );
};

const LoaderWrapper = styled.div`
  height: 500px;
  margin-top: 400px;
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
  animation: ${turning} 1000ms infinite linear;
`;
const LIReview = styled.div`
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  min-height: 40px;

  padding: 10px;
`;
const ReviewEntry = styled.textarea`
  margin-bottom: 10px;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  border-radius: 15px;
  color: #3b3b3b;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  min-height: 50px;
  padding: 5px;
  min-width: 280px;
`;
const ReviewBtn = styled.button`
  margin-bottom: 10px;
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
const ReviewEntryWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  margin: 20px 0 20px 0;
`;
const ReviewCont = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  border: 1px solid;
  border-radius: 15px;

  width: 75vw;
  min-height: fit-content;

  margin-top: 30px;
`;

const Reviews = styled.div`
  min-height: 40%;
`;

const Review = styled.div`
  width: 100%;
  min-height: 40%;
  z-index: 2;
  position: relative;

  margin-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const GreenImg = styled.img`
  border-radius: 100px;
  height: 45px;
`;

const IsGreen = styled.div``;
const LI = styled.li`
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ActivityInfo = styled.div``;
const InfoContainer = styled.div``;
const ProfileImg = styled.img`
  border-radius: 10px;
  height: 95px;
  width: 95px;
`;
const MentorCardDiv = styled.div`
  width: 70vw;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;

  margin-top: 10px;
  padding: 50px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ProfilePage;
