import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../Auth/auth-context';
import DataContext from './data-context';

const ROOM = {
  ownRoom: {
    id: 0,
    name: 'Name your own',
    password: 12345,
    userId: 1,
  },
  createdRooms: [
    {
      id: 1,
      name: 'Room 1',
      password: 12345,
      userId: 1,
    },
    {
      id: 2,
      name: 'Room 2',
      password: 12345,
      userId: 1,
    },
    {
      id: 3,
      name: 'Room 3',
      password: 12345,
      userId: 1,
    },
    {
      id: 4,
      name: 'Room 4',
      password: 12345,
      userId: 1,
    },
    {
      id: 5,
      name: 'Room 5',
      password: 12345,
      userId: 1,
    },
    {
      id: 6,
      name: 'Room 6',
      password: 12345,
      userId: 1,
    },
    {
      id: 7,
      name: 'Room 7',
      password: 12345,
      userId: 1,
    },
  ],
  joinedRooms: [
    {
      id: 8,
      name: 'Room Huy',
      password: 12345,
      userId: 2,
    },
    {
      id: 9,
      name: 'Room Chien',
      password: 12345,
      userId: 3,
    },
    {
      id: 11,
      name: 'Room Andy',
      password: 12345,
      userId: 4,
    },
  ],
};

const roomInfoDemo = {
  roomInfo: {
    name: 'Room title',
    id: 11,
    password: '123456',
    userId: 1,
  },
  members: [
    {
      id: 1,
      username: 'Andy',
    },
    {
      id: 2,
      username: 'Chien',
    },
    {
      id: 3,
      username: 'Huy',
    },
    {
      id: 4,
      username: 'Xin',
    },
    {
      id: 5,
      username: 'Nguyen Van A',
    },
    {
      id: 6,
      username: 'Nguyen Van Le ABC',
    },
  ],
  boards: [
    {
      id: 1,
      title: 'Board 1',
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          detail: 'Description task 1',
          date: '2021-09-24',
          status: false,
        },
        {
          id: 2,
          title: 'Task 2',
          detail: 'Description task 2',
          date: '2021-09-25',
          status: true,
        },
        {
          id: 3,
          title: 'Task 3',
          detail: 'Description task 3',
          date: '2021-09-25',
          status: false,
        },
        {
          id: 4,
          title: 'Task 4',
          detail: 'Description task 4',
          date: '2021-09-26',
          status: true,
        },
        {
          id: 5,
          title: 'Task 5',
          detail: 'Description task 5',
          date: '2021-09-26',
          status: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Board 2 with very long name',
      tasks: [
        {
          id: 6,
          title: 'Task 6',
          detail: 'Description task 6',
          date: '2021-09-24',
          status: false,
        },
        {
          id: 7,
          title: 'Task 7',
          detail: 'Description task 7',
          date: '2021-09-25',
          status: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Board 3',
      tasks: [
        {
          id: 8,
          title: 'Task 8',
          detail: 'Description task 8',
          date: '2021-09-25',
          status: false,
        },
        {
          id: 9,
          title: 'Task 9',
          detail: 'Description task 9',
          date: '2021-09-25',
          status: true,
        },
        {
          id: 10,
          title: 'Task 10',
          detail: 'Description task 10',
          date: '2021-09-26',
          status: true,
        },
        {
          id: 11,
          title: 'Task 11',
          detail: 'Description task 11',
          date: '2021-09-26',
          status: false,
        },
      ],
    },
  ],
};

export const DataContextProvider = (props) => {
  // const [ownRoom, setOwnRoom] = useState();
  const [createdRooms, setCreatedRooms] = useState();
  const [joinedRooms, setJoinedRooms] = useState();

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const fetchRoomsData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/rooms', {
        headers: {
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      const data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }

      //set rooms data
      // const ownRoom = data.ownRoom; //??

      setCreatedRooms(data['created-rooms']);
      setJoinedRooms(data['joined-rooms']);
    } catch (error) {
      console.log(error);

      //fake data
      setCreatedRooms(ROOM.createdRooms);
      setJoinedRooms(ROOM.joinedRooms);
    }
  }, [authCtx.userInfo?.token]);

  //fetch rooms data
  useEffect(() => {
    if (authCtx) {
      fetchRoomsData();
    }
  }, [authCtx, fetchRoomsData]);

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

      if (!password || password.length < 4) {
        return alert("Minimum length's password is 4!");
      }
    }

    let data;

    try {
      console.log(authCtx.userInfo?.token);
      const response = await fetch('http://localhost:8080/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
        body: JSON.stringify({
          name: title.trim(),
          password: password,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);

      //fake data
      data = {
        id: 10,
        name: title,
        password: password,
        userId: 1,
      };
    }

    //push new room to Room state
    setCreatedRooms((prev) => {
      const updatedRooms = prev;
      updatedRooms.push({
        id: data.id,
        name: title,
        password: password,
        userId: data.userId,
      });

      return updatedRooms;
    });

    history.push(`/room/${data.id}`);
  };

  //@param: updatedData: {title, password}
  const handleEditRoom = async (roomId, updatedData, checked) => {
    if (!checked) {
      if (!updatedData.title || updatedData.title.trim().length === 0) {
        return alert('Room title is required!');
      }

      if (!updatedData.password || updatedData.password.trim().length === 0) {
        return alert('Room password is required!');
      }

      if (!updatedData.password || updatedData.password.length < 4) {
        return alert("Minimum length's password is 4!");
      }
    }

    let data;
    try {
      const response = await fetch('http://localhost:8080/api/room', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
        body: JSON.stringify({
          id: roomId,
          name: updatedData.title.trim(),
          password: updatedData.password,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();
    } catch (error) {
      console.log(error);

      data = {
        id: 10,
        name: updatedData.title,
        password: updatedData.password,
        userId: 1,
      };
    }

    if (data.statusCode) {
      return alert(`Error: ${data.message}`);
    }

    //update room in Room state
    setCreatedRooms((prev) => {
      const updatedRooms = prev.map((room) => {
        if (room.id === roomId) {
          room.name = updatedData.title;
          room.password = updatedData.password;
        }
        return room;
      });

      return updatedRooms;
    });

    alert('Updated room information successfully!');
  };

  const handleDeleteRoom = async (roomId) => {
    let data;
    try {
      const response = await fetch('http://localhost:8080/api/room', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
        body: JSON.stringify({
          'room-id': roomId,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();
    } catch (error) {
      console.log(error);

      //fake data
      data = {
        id: 10,
      };
    }

    if (data.statusCode) {
      return alert(`Error: ${data.message}`);
    }

    setCreatedRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  const handleJoinRoom = async (roomId, password, checked = false) => {
    if (!checked) {
      if (!roomId || roomId.trim().length === 0) {
        return alert('Room Id is required!');
      }

      if (!Number.isInteger(roomId)) {
        return alert('Room Id is invalid!');
      }

      if (!password || password.trim().length === 0) {
        return alert('Room password is required!');
      }
    }

    let data;

    try {
      const response = await fetch('http://localhost:8080/api/user-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
        body: JSON.stringify({
          'room-id': roomId.trim(),
          password,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();
    } catch (error) {
      console.log(error);

      //fake data
      data = { 'room-id': 10, name: 'Joined room', status: true };
    }

    if (!data.status) {
      return alert(`Error: ${data.message}`);
    }

    setJoinedRooms((prev) => {
      const updatedRooms = prev;
      updatedRooms.push({
        id: data['room-id'],
        name: data.name,
        password: password,
        userId: data.userId,
      });

      return updatedRooms;
    });

    if (data.status) {
      history.push(`/room/${roomId}`);
    }
  };

  const handleLeaveRoom = async (roomId) => {
    let data;

    try {
      const response = await fetch('http://localhost:8080/api/user-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authCtx.userInfo?.token,
        },
        body: JSON.stringify({}),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();
    } catch (error) {
      console.log(error);

      //fake data
      data = { 'room-id': 10, name: 'Joined room', status: true };
    }

    if (!data.status) {
      return alert(`Error: ${data.message}`);
    }

    setJoinedRooms((prev) => prev.filter((room) => room.id !== roomId));

    if (data.status) {
      history.replace('/');
    }
  };

  const handleGetRoomInfo = async (roomId, callback) => {
    let data;

    try {
      const response = await fetch(
        `http://localhost:8080/api/room/${roomId}/total-board`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authCtx.userInfo?.token,
          },
        }
      );

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();

      if (data.statusCode) {
        return alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);

      data = roomInfoDemo;
      //fake data
      // data = { 'room-id': 10, name: 'Joined room', status: true };
    }

    callback(data);
  };

  return (
    <DataContext.Provider
      value={{
        roomsData: {
          // ownRoom,
          createdRooms,
          joinedRooms,
        },
        onCreateRoom: handleCreateNewRoom,
        onJoinRoom: handleJoinRoom,
        onEditRoom: handleEditRoom,
        onDeleteRoom: handleDeleteRoom,
        getRoomsData: handleGetRooms,
        onGetRoomInfo: handleGetRoomInfo,
        onLeaveRoom: handleLeaveRoom,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
