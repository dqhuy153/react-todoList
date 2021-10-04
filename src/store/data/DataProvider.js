import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../Auth/auth-context';
import DataContext from './data-context';

const ROOM = {
  ownRoom: {
    id: 0,
    nameRoom: 'Name your own',
    password: 12345,
    userId: 1,
  },
  createdRooms: [
    {
      id: 1,
      nameRoom: 'Room 1',
      password: 12345,
      userId: 1,
    },
    {
      id: 2,
      nameRoom: 'Room 2',
      password: 12345,
      userId: 1,
    },
    {
      id: 3,
      nameRoom: 'Room 3',
      password: 12345,
      userId: 1,
    },
    {
      id: 4,
      nameRoom: 'Room 4',
      password: 12345,
      userId: 1,
    },
    {
      id: 5,
      nameRoom: 'Room 5',
      password: 12345,
      userId: 1,
    },
    {
      id: 6,
      nameRoom: 'Room 6',
      password: 12345,
      userId: 1,
    },
    {
      id: 7,
      nameRoom: 'Room 7',
      password: 12345,
      userId: 1,
    },
  ],
  joinedRooms: [
    {
      id: 8,
      nameRoom: 'Room Huy',
      password: 12345,
      userId: 2,
    },
    {
      id: 9,
      nameRoom: 'Room Chien',
      password: 12345,
      userId: 3,
    },
    {
      id: 101,
      nameRoom: 'Room Andy',
      password: 12345,
      userId: 4,
    },
  ],
};

export const DataContextProvider = (props) => {
  const [ownRoom, setOwnRoom] = useState();
  const [createdRooms, setCreatedRooms] = useState();
  const [joinedRooms, setJoinedRooms] = useState();

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const fetchRoomsData = async () => {
    // const response = await fetch('http://localhost:8080/api/rooms', {
    //   headers: {
    //     Authorization: 'Bearer ' + authCtx.userInfo?.token,
    //   },
    // });

    // if (!response) {
    //   return alert('Send request to server failed!');
    // }

    // const data = await response.json();

    // if (data.statusCode) {
    //   return alert(`Error: ${data.message}`);
    // }

    // const ownRoom = data.ownRoom; //??

    //set rooms data
    setOwnRoom(ROOM.ownRoom);
    setCreatedRooms(ROOM.createdRooms);
    setJoinedRooms(ROOM.joinedRooms);
  };

  //fetch rooms data
  useEffect(() => {
    if (authCtx) {
      fetchRoomsData();
    }
  }, [authCtx]);

  const handleGetRooms = () => {
    fetchRoomsData();
  };

  const handleCreateNewRoom = async (title, password, checked = false) => {
    if (!checked) {
      if (!title || title.trim().length === 0) {
        return alert('Room title is required!');
      }

      if (!password || password.trim().length === 0) {
        return alert('Room password is required!');
      }

      if (!password || password.length < 5) {
        return alert("Minimum length's password is 5!");
      }
    }

    // const response = await fetch('http://localhost:8080/api/room', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + authCtx.userInfo?.token,
    //   },
    //   body: {
    //     name: title.trim(),
    //     password,
    //   },
    // });

    // if (!response) {
    //   return alert('Send request to server failed!');
    // }

    // const data = await response.json();

    // if (data.statusCode) {
    //   return alert(`Error: ${data.message}`);
    // }

    const data = {
      id: 10,
      name: title,
      password: password,
      userId: 1,
    };

    //push new room to Room state
    setCreatedRooms((prev) => {
      const updatedRooms = prev;
      updatedRooms.push({
        id: data.id,
        nameRoom: title,
        password: password,
        userId: data.userId,
      });

      return updatedRooms;
    });

    history.push(`/room/${data.id}`);
  };

  const handleJoinRoom = (roomId, password, checked = false) => {
    if (!checked) {
      if (!roomId || roomId.trim().length === 0) {
        return alert('Room Id is required!');
      }

      if (!password || password.trim().length === 0) {
        return alert('Room password is required!');
      }
    }

    // const response = await fetch('http://localhost:8080/api/room', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + authCtx.userInfo?.token,
    //   },
    //   body: {
    //     name: title.trim(),
    //     password,
    //   },
    // });

    // if (!response) {
    //   return alert('Send request to server failed!');
    // }

    // const data = await response.json();

    // if (data.statusCode) {
    //   return alert(`Error: ${data.message}`);
    // }

    history.push(`/room/${roomId}`);
  };

  //@param: updatedData: {title, password}
  const handleEditRoom = (roomId, updatedData, checked) => {
    if (!checked) {
      if (!updatedData.title || updatedData.title.trim().length === 0) {
        return alert('Room title is required!');
      }

      if (!updatedData.password || updatedData.password.trim().length === 0) {
        return alert('Room password is required!');
      }

      if (!updatedData.password || updatedData.password.length < 5) {
        return alert("Minimum length's password is 5!");
      }
    }

    // const response = await fetch('http://localhost:8080/api/room', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + authCtx.userInfo?.token,
    //   },
    //   body: {
    //     id: roomId,
    //     name: updatedData.title.trim(),
    //     password: updatedData.password,
    //   },
    // });

    // if (!response) {
    //   return alert('Send request to server failed!');
    // }

    // const data = await response.json();

    // if (data.statusCode) {
    //   return alert(`Error: ${data.message}`);
    // }

    const data = {
      id: 10,
      name: updatedData.title,
      password: updatedData.password,
      userId: 1,
    };

    //update room in Room state
    setCreatedRooms((prev) => {
      const updatedRooms = prev.map((room) => {
        if (room.id === roomId) {
          room.nameRoom = updatedData.title;
          room.password = updatedData.password;
        }
        return room;
      });

      return updatedRooms;
    });

    alert('Updated room information successfully!');
  };

  const handleDeleteRoom = (roomId) => {
    // const response = await fetch('http://localhost:8080/api/room', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + authCtx.userInfo?.token,
    //   },
    //   body: {
    //     room-id: roomId,
    //   },
    // });

    // if (!response) {
    //   return alert('Send request to server failed!');
    // }

    // const data = await response.json();

    // if (data.statusCode) {
    //   return alert(`Error: ${data.message}`);
    // }

    setCreatedRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  return (
    <DataContext.Provider
      value={{
        roomsData: {
          ownRoom,
          createdRooms,
          joinedRooms,
        },
        onCreateRoom: handleCreateNewRoom,
        onJoinRoom: handleJoinRoom,
        onEditRoom: handleEditRoom,
        onDeleteRoom: handleDeleteRoom,
        getRoomsData: handleGetRooms,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};