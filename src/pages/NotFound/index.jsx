import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-2">
        <p className="font-russoOne text-9xl">404</p>
        <p>Page not found</p>
        <Link to="/">
          <Button variant="outlined">back to home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
