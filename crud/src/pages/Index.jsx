// import React, { useMemo, useCallback } from "react";
// import { Card, Typography } from "@material-tailwind/react";
// import useDialog from "../hooks/useDialog";
// import Delete from "../components/Delete";
// import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
// import CreateIcon from "@mui/icons-material/Create";
// import { useNavigate } from "react-router-dom";
// import useUserCrud from "../hooks/useUserCrud";

// export default function Index() {
//   const navigate = useNavigate();
//   const TABLE_HEAD = ["Name", "Age", "Email", "Action"];

//   const { isOpen, openDialog, closeDialog } = useDialog();

//   const { useFetchUser } = useUserCrud();
//   const {
//     data: users = [],
//     isLoading,
//     isError
//   } = useFetchUser({ queryKey: "user" });

//   // Memoize the rows of the table to prevent unnecessary re-renders
//   const renderedTableRows = useMemo(() => {
//     if (users.length === 0) {
//       return (
//         <tr>
//           <td colSpan={4} className="text-center p-4">
//             No users available.
//           </td>
//         </tr>
//       );
//     }

//     return users.map(({ name, email, age, _id }, index) => (
//       <TableRow
//         key={_id}
//         name={name}
//         email={email}
//         age={age}
//         _id={_id}
//         openDialog={openDialog}
//         navigate={navigate}
//         closeDialog={closeDialog}
//         isOpen={isOpen}
//       />
//     ));
//   }, [users, navigate, openDialog, isOpen, closeDialog]);

//   // Handle loading and error states
//   if (isLoading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (isError) {
//     return <div className="text-center mt-10">Failed to load users.</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200"
//           onClick={() => navigate("/sign-up")}
//         >
//           Add User <span className="text-xl">+</span>
//         </button>
//       </div>
//       <Card className="overflow-auto border-2 rounded-lg">
//         <table className="w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal leading-none opacity-70"
//                   >
//                     {head}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>{renderedTableRows}</tbody>
//         </table>
//       </Card>
//     </div>
//   );
// }

// // Memoize the table row component to prevent unnecessary renders
// // eslint-disable-next-line react/display-name
// const TableRow = React.memo(
//   // eslint-disable-next-line react/prop-types
//   ({ name, email, age, _id, openDialog, navigate, closeDialog, isOpen }) => (
//     <tr>
//       <td className="p-4 border-b border-blue-gray-50">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           {name}
//         </Typography>
//       </td>
//       <td className="p-4 border-b border-blue-gray-50">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           {age}
//         </Typography>
//       </td>
//       <td className="p-4 border-b border-blue-gray-50">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           {email}
//         </Typography>
//       </td>
//       <td className="p-4 border-b border-blue-gray-50">
//         <div className="flex gap-2">
//           <button
//             className="text-green-800 border border-green-800 p-2 rounded hover:bg-green-800 hover:text-white transition duration-200"
//             onClick={() => navigate(`/update/${_id}`)}
//           >
//             <CreateIcon />
//           </button>
//           <button
//             className="text-rose-500 border border-rose-500 p-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"
//             onClick={openDialog}
//           >
//             <RestoreFromTrashIcon />
//           </button>
//           {isOpen && (
//             <Delete userId={_id} event={closeDialog} open={isOpen}>
//               <p>Are you sure you want to delete this user?</p>
//             </Delete>
//           )}
//         </div>
//       </td>
//     </tr>
//   )
// );

import React, { useMemo, useCallback } from "react";
import { Card, Typography } from "@material-tailwind/react";
import useDialog from "../hooks/useDialog";
import Delete from "../components/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import useUserCrud from "../hooks/useUserCrud";

// Custom Hook for Table Rows
const useRenderedTableRows = (
  users,
  navigate,
  openDialog,
  closeDialog,
  isOpen
) => {
  return useMemo(() => {
    if (users.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="text-center p-4">
            No users available.
          </td>
        </tr>
      );
    }

    return users.map(({ name, email, age, _id }) => (
      <TableRow
        key={_id}
        name={name}
        email={email}
        age={age}
        _id={_id}
        openDialog={openDialog}
        navigate={navigate}
        closeDialog={closeDialog}
        isOpen={isOpen}
      />
    ));
  }, [users, navigate, openDialog, isOpen, closeDialog]);
};

export default function Index() {
  const navigate = useNavigate();
  const TABLE_HEAD = ["Name", "Age", "Email", "Action"];

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { useFetchUser } = useUserCrud();
  const {
    data: users = [],
    isLoading,
    isError
  } = useFetchUser({ queryKey: "user" });

  // Use the custom hook for rendering table rows
  const renderedTableRows = useRenderedTableRows(
    users,
    navigate,
    openDialog,
    closeDialog,
    isOpen
  );

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="text-center mt-10">Loading users, please wait...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p>Failed to load users. Please try again later.</p>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-200"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200"
          onClick={() => navigate("/sign-up")}
        >
          Add User <span className="text-xl">+</span>
        </button>
      </div>
      <Card className="overflow-auto border-2 rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderedTableRows}</tbody>
        </table>
      </Card>
    </div>
  );
}

// Memoized TableRow Component
// eslint-disable-next-line react/display-name
const TableRow = React.memo(
  // eslint-disable-next-line react/prop-types
  ({ name, email, age, _id, openDialog, navigate, closeDialog, isOpen }) => {
    // Define callbacks to optimize performance
    const handleNavigate = useCallback(
      () => navigate(`/update/${_id}`),
      [_id, navigate]
    );
    const handleDelete = useCallback(() => openDialog(), [openDialog]);

    // Define reusable styles
    const buttonStyle =
      "border p-2 rounded transition duration-200 hover:text-white";
    const editStyle = `${buttonStyle} text-green-800 border-green-800 hover:bg-green-800`;
    const deleteStyle = `${buttonStyle} text-rose-500 border-rose-500 hover:bg-rose-500`;

    return (
      <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {age}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {email}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex gap-2">
            <button
              aria-label="Edit User"
              className={editStyle}
              onClick={handleNavigate}
            >
              <CreateIcon />
            </button>
            <button
              aria-label="Delete User"
              className={deleteStyle}
              onClick={handleDelete}
            >
              <RestoreFromTrashIcon />
            </button>
          </div>
        </td>

        {isOpen && (
          <Delete userId={_id} onClose={closeDialog} open={isOpen}>
            <p>Are you sure you want to delete this user?</p>
          </Delete>
        )}
      </tr>
    );
  }
);
