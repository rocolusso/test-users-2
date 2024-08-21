import React from 'react';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const removeAuth = async () => {
    // eslint-disable-next-line no-useless-concat
    document.cookie = 'token' + '=; Max-Age=0';
    router.push('/');
  };

  return (
    <div className="bg-white  text-black">
      <div className="container mx-auto ">

        <div className="flex justify-end items-end gap-5 ">
          <div
            className="my-10 w-fit"
            style={{
              margin: '10px 0',
            }}
          >
            <button
              type="button"
              onClick={removeAuth}
              className="rounded  border border-black py-3 px-5 bg-black text-white w-fit"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
