'use client';
import { useReducer, useEffect, useState } from 'react';
import updateUserFormReducer from '@/reducer/updateUserReducer';
import { updateUser } from '@/redux/thunks/user';
import {
  UpdateUserFormState,
  UpdateUserFormActionType as ACTION,
} from '@/reducer/updateUserReducer';
import useStoreData from '@/lib/hooks/useStoreData';
import useStore from '@/lib/hooks/useStore';

export default function UserUpdateForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useStoreData();
  const { dispatch } = useStore();

  const init: UpdateUserFormState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    existing_password: '',
    isSubmitting: false,
    errors: {},
  };

  const [state, updateForm] = useReducer(updateUserFormReducer, init);
  const submit = async () => {
    updateForm({ type: ACTION.SET_ISSUBMITTING, payload: true });
    if (!state.existing_password) {
      return;
    }
    const updatedData = {
      existing_password: state.existing_password,
      firstName:
        state.firstName && state.firstName !== user.firstName
          ? state.firstName
          : undefined,
      lastName:
        state.lastName && state.lastName !== user.lastName
          ? state.lastName
          : undefined,
      username:
        state.username && state.username !== user.username
          ? state.username
          : undefined,
      email:
        state.email && state.email !== user.email ? state.email : undefined,
      password: state.password ? state.password : undefined,
    };
    const data = await dispatch(
      updateUser({
        data: updatedData,
        dispatch,
      })
    );

    if (data) {
      updateForm({ type: ACTION.SET_ISSUBMITTING, payload: false });
    }
  };
  useEffect(() => {
    if (user) {
      updateForm({ type: ACTION.SET_FIRSTNAME, payload: user.firstName });
      updateForm({ type: ACTION.SET_LASTNAME, payload: user.lastName });
      updateForm({ type: ACTION.SET_USERNAME, payload: user.username });
      updateForm({ type: ACTION.SET_EMAIL, payload: user.email });
    }
  }, [user]);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <form
            className="space-y-4"
            onSubmit={() => {
              console.log('submit');
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="firstname"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                value={state.firstName}
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_FIRSTNAME,
                    payload: e.target.value,
                  });
                }}
                name="firstname"
                placeholder="Update firstname"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="lastname"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                value={state.lastName}
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_LASTNAME,
                    payload: e.target.value,
                  });
                }}
                name="lastname"
                placeholder="Update lastname"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={state.username}
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_USERNAME,
                    payload: e.target.value,
                  });
                }}
                name="username"
                placeholder="Update Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={state.email}
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_EMAIL,
                    payload: e.target.value,
                  });
                }}
                name="email"
                placeholder="Update Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter new password"
                value={state.password}
                onChange={(e) => {
                  updateForm({
                    type: ACTION.SET_PASSWORD,
                    payload: e.target.value,
                  });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <h1>UserUpdateForm</h1>
            </div>
            <div className="flex justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="p-2 px-4 border-2 rounded-md hover:bg-green-400 w-[50%]"
                type="submit"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg relative">
            <input
              type="password"
              placeholder="Enter your exisiting password"
              className="border-2 rounded-sm border-gray-200"
              value={state.existing_password}
              onChange={(e) => {
                console.log(e.target.value);
                updateForm({
                  type: ACTION.SET_EXISTING_PASSWORD,
                  payload: e.target.value,
                });
              }}
            />
            <button
              onClick={async () => {
                setIsModalOpen(false);
                await submit();
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
