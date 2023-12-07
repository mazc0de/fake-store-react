import { Typography } from '@material-tailwind/react';

const Footer = ({ menu }) => {
  return (
    <footer className="flex h-20 w-full items-center justify-between">
      <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-russoOne text-2xl font-medium">
        FAKE STORE
      </Typography>
      {menu}
    </footer>
  );
};

export default Footer;
