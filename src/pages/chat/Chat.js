import React, { useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appReducer";

import {
  ChatContainer,
  ChatHeader,
  HeaderLeft,
  HeaderRight,
  ChatMessages,
  ChatBottom,
} from "./chat.styled";

import ChatInput from "../../components/chat-input/ChatInput";
import Message from "../../components/message/Message";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { db } from "../../firebase/firebase";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessage && (
        <React.Fragment>
          <ChatHeader>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </ChatHeader>
          <ChatMessages>
            {roomMessage?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatInput
              channelId={roomId}
              channelName={roomDetails?.data().name}
              chatRef={chatRef}
            />
            <ChatBottom ref={chatRef} />
          </ChatMessages>
        </React.Fragment>
      )}
    </ChatContainer>
  );
};

export default Chat;
