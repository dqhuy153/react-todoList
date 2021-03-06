import React from 'react';

const DataContext = React.createContext({
  //ROOM data
  roomsData: {
    ownRoom: {
      id: Number,
      nameRoom: 'Your own room',
    },
    createdRooms: [
      {
        id: Number,
        nameRoom: String,
        isCreator: true,
      },
    ],
    joinedRooms: [
      {
        id: Number,
        nameRoom: String,
        isCreator: false,
      },
    ],
  },
  onCreateRoom: (title, password, checked) => {},
  onJoinRoom: (roomId, password, checked) => {},
  onEditRoom: (roomId, updatedData, checked) => {},
  onDeleteRoom: (roomId) => {},
  getRoomsData: () => {},
  onGetRoomInfo: () => {},
  onLeaveRoom: (roomId) => {},

  //BOARD data

  //TASK data
});

export default DataContext;
