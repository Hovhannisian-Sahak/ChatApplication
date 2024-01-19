import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import "./App.css";
import "stream-chat-react/dist/css/index.css";
import { ChanelListContainer, ChannelContainer, Auth } from "./components";

const apiKey = "4muasvyat4mg";
const cookies = new Cookies();
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get("token");
if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChanelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
