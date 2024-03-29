import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import { ChannelSearch, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";
import Cookies from "universal-cookie";
import TeamChannelList from "./TeamChannelList";
const cookies = new Cookies();
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);
const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const customChannelMessageFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};
const ChanelListContent = ({
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    window.location.reload();
  };
  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(list) => (
            <TeamChannelList
              {...list}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(preview) => (
            <TeamChannelPreview
              {...preview}
              type="team"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessageFilter}
          List={(list) => (
            <TeamChannelList
              {...list}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(preview) => (
            <TeamChannelPreview
              {...preview}
              type="messaging"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};
const ChanelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChanelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prev) => !prev)}
        ></div>
        <ChanelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};
export default ChanelListContainer;
