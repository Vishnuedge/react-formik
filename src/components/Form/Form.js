import React, { useState, useEffect } from 'react';
import './Form.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Profiles from '../Profiles/Profiles';
import * as Yup from 'yup';
import Error from '../Error/Error';
export default function ProfileForm() {
  // USE EFFECT :

  useEffect(() => {
    getUsers();
  }, []);

  // INITIAL VALUES :

  let initialValues = {
    id: '',
    username: '',
    name: '',
    email: '',
    phone: null,
    website: ''
  };

  // USE STATE :
  let [users, setUsers] = useState();
  let [formValues, setFormValues] = useState(null);
  let [userId, giveData] = useState();
  let [id, setId] = useState([]);
  let [submitAlert, setSubmitAlert] = useState(false);
  let [deleteAlert, setDeleteAlert] = useState(false);

  // GET USERS :
  const getUsers = async () => {
    let { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    setUsers(data);
    setId(users ? users.map(u => u.id) : null);
  };

  // HANDLE DELETE
  const handleDelete = async userId => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    users = [...users];
    users = users.filter(user => user.id !== userId);
    setDeleteAlert(!deleteAlert);
    setTimeout(() => {
      setDeleteAlert(false);
    }, 1500);

    setUsers(users);
  };
  // SELECT USER:

  const handleSelect = user => {
    // setValues(user);
    setFormValues(user);
  };

  // CREATE USER

  const createUser = async values => {
    users = [...users];
    let { data } = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      values
    );
    users.unshift(data);
    setUsers(users);

    console.log('submitted');
  };

  // UPDATE USERS :

  // const handleUpdate = async values => {
  //   let { data } = await axios.put(
  //     `https://jsonplaceholder.typicode.com/users/${userId}`,
  //     values
  //   );
  //   users = [...users];
  //   const userIndex = users.findIndex(x => x.id === userId);
  //   users[userIndex] = data;
  //   setUsers(users);
  //   console.log(users);
  // };

  //ON SUBMIT :
  const onSubmit = async (values, { resetForm }) => {
    setSubmitAlert(!submitAlert);
    setTimeout(() => {
      setSubmitAlert(false);
    }, 3000);

    createUser(values);
    resetForm();
  };
  // VALIDATION SCHEMA :

  const validationSchema = Yup.object({
    username: Yup.string().required('*Required UserName*'),
    name: Yup.string().required('*Required Name*'),
    phone: Yup.string().required('*Required Phone*'),
    email: Yup.string().required('*Required Email*'),
    website: Yup.string().required('*Required Website*')
  });

  //FORMIK

  return (
    <div className="form-parent">
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {formik => {
          return (
            <>
              <div className="form-container mb-5">
                <div className="row">
                  <div className="col-lg-12 ">
                    <Form>
                      {/* UserName */}
                      <div class="mb-3">
                        <label class="form-label">USER NAME :</label>
                        <Field
                          type="text"
                          class="form-control"
                          name="username"
                        />
                        <ErrorMessage name="username" component={Error} />
                      </div>

                      {/* Name */}
                      <div class="mb-3">
                        <label class="form-label">NAME :</label>
                        <Field type="text" class="form-control" name="name" />
                        <ErrorMessage name="name" component={Error} />
                      </div>

                      {/* Email */}
                      <div class="mb-3">
                        <label class="form-label">EMAIL :</label>
                        <Field type="text" class="form-control" name="email" />
                        <ErrorMessage name="email" component={Error} />
                      </div>

                      {/* Phone */}
                      <div class="mb-3">
                        <label class="form-label">PHONE :</label>
                        <Field type="text" class="form-control" name="phone" />
                        <ErrorMessage name="phone" component={Error} />
                      </div>

                      {/* Website */}
                      <div class="mb-3">
                        <label class="form-label">WEBSITE :</label>
                        <Field
                          type="text"
                          class="form-control"
                          name="website"
                        />
                        <ErrorMessage name="website" component={Error} />
                      </div>

                      {/* SUBMIT BUTTON */}
                      <div className="mt-3 mb-3">
                        <button
                          type="submit"
                          className="btn btn-dark text-light"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              {submitAlert ? (
                <div class="alert alert-success alert" role="alert">
                  <h5> PROFILE SUBMITTED </h5>
                </div>
              ) : (
                ''
              )}
              {deleteAlert ? (
                <div class="alert alert-danger alert" role="alert">
                  <h5> PROFILE DELETED</h5>
                </div>
              ) : (
                ''
              )}
            </>
          );
        }}
      </Formik>

      {/* PROFILE ROUTE */}
      <div>
        <Profiles
          users={users}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          giveData={giveData}
        />
      </div>
    </div>
  );
}
