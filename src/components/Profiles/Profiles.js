import React from 'react';
import './Profiles.css';
export default function Profiles({
  users,
  handleDelete,
  handleSelect,
  giveData
}) {
  // console.log(users);
  return (
    <>
      {users ? (
        users.map(user => {
          return (
            <>
              <div class="card card1 mb-5">
                <div class="card-body">
                  <p>
                    <b>USER NAME : </b>
                    {user.username}
                  </p>
                  <hr />

                  <p>
                    <b>NAME : </b>
                    {user.name}
                  </p>
                  <hr />
                  <p>
                    <b>EMAIL : </b>
                    {user.email}
                  </p>
                  <hr />

                  <p>
                    <b>PHONE : </b>
                    {user.phone}
                  </p>
                  <hr />

                  <p>
                    <b>WEBSITE : </b>
                    {user.website}
                  </p>
                  <hr />

                  {/* DELETE BUTTON */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                      class="btn btn-danger mx-3"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <h1>LOADING...</h1>
      )}
    </>
  );
}
