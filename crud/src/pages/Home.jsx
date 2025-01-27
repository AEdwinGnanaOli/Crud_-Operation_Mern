// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchPosts } from "../services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Delete from "../components/delete";
import useDialog from "../hooks/useDialog";
import { Dialog } from "@mui/material";
import { Card, Typography } from "@material-tailwind/react";

// import {Table } from "rea"
function Users() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const navigate = useNavigate();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts() // Simulates a delay for demonstration
  });

  // Show loading state
  if (postQuery.isLoading) return <p>Loading...</p>;

  // Handle error state
  if (postQuery.isError) {
    console.log(postQuery.error);
    return <p>Error loading posts!</p>;
  }

  const TABLE_HEAD = ["Name", "Job", "Employed", "Action"];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18"
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18"
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17"
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08"
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21"
    }
  ];
  return (
    <>
      {/* <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success mb-3">
            Add +
          </Link>
          <Table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postQuery.data?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success btn-sm"
                    >
                      Update
                    </Link>
                    &nbsp;&nbsp;
                    <button
                      onClick={openDialog}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <Delete userId={user._id} event={closeDialog} open={isOpen}>
                      <p>Are sure delete</p>
                    </Delete>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div> */}

      <div className="home">
        <Card className="h-full md:w-[800px] sm:w-full overflow-auto border-2 rounded flex-col ">
          <div className="add ">
            <button
              className="m-2 bg-green-700 text-slate-200 p-2 px-4 border-fuchsia-500 rounded "
              onClick={() => navigate("/create")}
            >
              Add <span className=" ps-2 text-xl ">+</span>
            </button>
          </div>
          <table className="w-full min-w-max table-auto text-left rounded">
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
            <tbody>
              {postQuery.data?.map(({ name, email, age, _id }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {age}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes + "flex "}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium bg-emerald-700 m-3 text-white p-2 px-3  rounded"
                        onClick={() => navigate(`/update/${_id}`)}
                      >
                        Edit
                      </Typography>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        // className="font-medium bg-rose-500 text-white p-2 rounded  hover:bg-whit,text-rose-500 hover:border-rose-500"
                        className="font-medium text-rose-500 border border-rose-500 px-4 py-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"

                        onClick={openDialog}
                      >
                        Delete
                      </Typography>
                      <Delete userId={_id} event={closeDialog} open={isOpen}>
                        <p>Are sure delete</p>
                      </Delete>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

export default Users;
