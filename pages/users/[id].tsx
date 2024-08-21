import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NextApiRequest } from 'next';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../src/components/header.tsx';
import AuthHeading from '../../src/components/authHeading.tsx';
import { User } from '../../src/helpers/types.ts';
import 'react-toastify/dist/ReactToastify.css';

function UserPage({ user } :{
  user : User
}) {
  const [name, setName] = useState(user.first_name);
  const [email, setEmail] = useState(user.email);
  const [isChange, setIsChange] = useState(false);

  const submitHandler = async (e:React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        first_name: name,
        email,
      }),
    });

    const notifyUpdateUser = () => toast.success('User was updated!', { containerId: 'updateUser' });

    if (res.status === 200) {
      notifyUpdateUser();
      setTimeout(() => {
        setIsChange(false);
      }, 1000);
    }
  };

  const revoveUser = async () => {
    const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
      }),
    });

    if (res.status === 204) {
      const notifyRemove = () => toast('User was deleted!', { containerId: 'removeUser' });
      notifyRemove();
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <AuthHeading />
        <div className="flex flex-col h-[80vh] items-center justify-center">
          <div className="text-[26px]">
            User
          </div>
          <div>
            <div>
              <Image
                src={user.avatar}
                alt=""
                width={300}
                height={300}
              />
            </div>
            <div className="pt-5">
              User ID:
              {' '}
              {user.id}
            </div>
            {

                  !isChange
                  && (
                  <>
                    <div>
                      Name:
                      {' '}
                      {user.first_name}
                    </div>
                    <div>
                      Last Name:
                      {' '}
                      {user.last_name}
                    </div>
                    <div>
                      Email:
                      {' '}
                      {user.email}
                    </div>

                  </>
                  )

              }

            <div className="mt-5 flex-col  flex gap-5">
              {
                    !isChange

                    && (
                    <Link
                      href="/"
                      className="py-3 px-20 rounded bg-green-600 text-center"
                    >
                      Back to Users
                    </Link>
                    )
                }
              <div>
                <button
                  type="button"
                  className="py-3 px-20 rounded bg-yellow-500"
                  onClick={() => setIsChange(true)}
                >
                  Change
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="py-3 px-20 rounded bg-red-600"
                  onClick={revoveUser}
                >
                  Remove
                </button>
                <ToastContainer
                  containerId="removeUser"
                  toastClassName="rounded mt-5 text-white bg-red-600 flex item-center justify-center"
                />
              </div>
            </div>

            {
                  isChange

                  && (
                  <form
                    onSubmit={(e) => submitHandler(e)}
                    className="text-black mt-8 flex gap-5 flex-col max-w-[250px]"
                  >
                    <div className="flex gap-5 items-center">
                      <p className="text-white">Name:</p>
                      <input
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="p-3 rounded w-full"
                      />
                    </div>
                    <div className="flex gap-5 items-center">
                      <p className="text-white">Email:</p>
                      <input
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="p-3 rounded w-full"
                      />
                    </div>

                    <button
                      className="bg-green-600 text-white py-3 px-10 rounded"
                      type="submit"
                    >
                      Save
                    </button>

                  </form>
                  )
              }
          </div>
        </div>

      </div>
      <ToastContainer
        containerId="updateUser"
        toastClassName="rounded mt-5 text-white bg-green-400 flex item-center justify-center"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}

export default UserPage;

export const getServerSideProps = async (request: NextApiRequest) => {
  const req = await fetch(`https://reqres.in/api/users/${request.query.id}`);
  const res = await req.json();
  return {
    props: {
      user: res.data,
    },
  };
};
