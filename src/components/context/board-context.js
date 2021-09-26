// import React, { useState } from 'react';

// export const BoardContext = React.createContext({
//   boards: [],
//   toggleComplete: (id) => {},
// });

// const boardProvider =  (props) => {
//   const [boards, setBoards] = useState({
//     boards: [
//       {
//         id: 1,
//         title: 'Board 1',
//         tasks: [
//           {
//             id: 1,
//             name: 'Task 1',
//             detail: 'Description task 1',
//             date: '25/9/2021',
//             status: 0,
//           },
//           {
//             id: 2,
//             name: 'Task 2',
//             detail: 'Description task 2',
//             date: '25/9/2021',
//             status: 0,
//           },
//           {
//             id: 3,
//             name: 'Task 3',
//             detail: 'Description task 3',
//             date: '25/9/2021',
//             status: 0,
//           },
//           {
//             id: 4,
//             name: 'Task 4',
//             detail: 'Description task 4',
//             date: '25/9/2021',
//             status: 1,
//           },
//           {
//             id: 5,
//             name: 'Task 5',
//             detail: 'Description task 5',
//             date: '25/9/2021',
//             status: 1,
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Board 2',
//         tasks: [
//           {
//             id: 6,
//             name: 'Task 6',
//             detail: 'Description task 6',
//             date: '25/9/2021',
//             status: 0,
//           },
//           {
//             id: 7,
//             name: 'Task 7',
//             detail: 'Description task 7',
//             date: '25/9/2021',
//             status: 1,
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Board 3',
//         tasks: [
//           {
//             id: 8,
//             name: 'Task 8',
//             detail: 'Description task 8',
//             date: '25/9/2021',
//             status: 0,
//           },
//           {
//             id: 9,
//             name: 'Task 9',
//             detail: 'Description task 9',
//             date: '25/9/2021',
//             status: 1,
//           },
//           {
//             id: 10,
//             name: 'Task 10',
//             detail: 'Description task 10',
//             date: '25/9/2021',
//             status: 1,
//           },
//           {
//             id: 11,
//             name: 'Task 11',
//             detail: 'Description task 11',
//             date: '25/9/2021',
//             status: 1,
//           },
//         ],
//       },
//     ],
//   });

//   const toggleComplete = (taskId) => {
//     setBoards(prev => {

//     })
//   }

//   return (
//     <BoardContext.Provider
//       value={{ boards, toggleComplete }}
//     >
//       {props.children}
//     </BoardContext.Provider>
//   );
// };

// export default boardProvider;
