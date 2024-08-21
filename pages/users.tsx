import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../src/components/header.tsx';
import AuthHeading from '../src/components/authHeading.tsx';
import { User } from '../src/helpers/types.ts';

export default function Home({ users } : {
    users : User[]
}) {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto">
          <AuthHeading />
          <ul className="mt-10 users_grid grid grid-cols-1 w-fit  sm:grid-cols-6 gap-10 mx-auto">
            {
                          users?.map((user) => (
                            <li
                              key={user.id + user.first_name}
                              className="hover:scale-105 duration-300"
                            >
                              <Link href={`/users/${user.id}`}>
                                <div>
                                  <Image
                                    src={user.avatar}
                                    alt=""
                                    width={170}
                                    height={170}
                                  />
                                </div>
                                <div className="pt-5">
                                  User ID:
                                  {' '}
                                  {user.id}
                                </div>
                                <div>
                                  Name:
                                  {' '}
                                  {user.first_name}
                                </div>
                                <div>
                                  Last Name
                                  {' '}
                                  {user.last_name}
                                </div>
                                <div>
                                  Email:
                                  {' '}
                                  {user.email}
                                </div>
                              </Link>
                            </li>
                          ))
                      }
          </ul>
        </div>

      </main>

    </>
  );
}

export const getServerSideProps = async () => {
  const firstUsers = await fetch('https://reqres.in/api/users?page=1');
  const secondUsers = await fetch('https://reqres.in/api/users?page=2');
  const first = await firstUsers.json();
  const second = await secondUsers.json();

  return {
    props: {
      users: [...first.data, ...second.data],
    },
  };
};
