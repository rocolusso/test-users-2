import React from 'react';
import Link from 'next/link';

function Index() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center flex-col items-center h-[80vh] ">
        <div className="bg-white p-10 rounded text-black">
          <div>
            To continue you must be logged in
          </div>
          <div className="flex  gap-5 mt-10 justify-center">
            <Link href="/login" className="bg-black rounded py-3 px-5 text-white">Login</Link>
            <Link href="/signup" className="bg-black rounded py-3 px-5 text-white">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
