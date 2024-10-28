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
    if (!state.existing_password) return;

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Update Profile
          </h2>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <div className="space-y-4">
              {[
                {
                  id: 'firstname',
                  label: 'First Name',
                  value: state.firstName,
                  action: ACTION.SET_FIRSTNAME,
                },
                {
                  id: 'lastname',
                  label: 'Last Name',
                  value: state.lastName,
                  action: ACTION.SET_LASTNAME,
                },
                {
                  id: 'username',
                  label: 'Username',
                  value: state.username,
                  action: ACTION.SET_USERNAME,
                },
                {
                  id: 'email',
                  label: 'Email',
                  type: 'email',
                  value: state.email,
                  action: ACTION.SET_EMAIL,
                },
                {
                  id: 'password',
                  label: 'New Password',
                  type: 'password',
                  value: state.password,
                  action: ACTION.SET_PASSWORD,
                },
              ].map(({ id, label, type = 'text', value, action }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-gray-600 font-medium mb-1"
                  >
                    {label}:
                  </label>
                  <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) =>
                      updateForm({ type: action, payload: e.target.value })
                    }
                    placeholder={`Update ${label.toLowerCase()}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              disabled={state.isSubmitting}
            >
              {state.isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Confirm Password
            </h3>
            <input
              type="password"
              placeholder="Enter your existing password"
              value={state.existing_password}
              onChange={(e) =>
                updateForm({
                  type: ACTION.SET_EXISTING_PASSWORD,
                  payload: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsModalOpen(false);
                  await submit();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
