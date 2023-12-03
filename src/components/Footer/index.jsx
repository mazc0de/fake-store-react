import { Typography } from '@material-tailwind/react';

const Footer = ({ menu }) => {
  return (
    <footer className="w-full bg-white p-4">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 bg-white text-center md:justify-between">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-russoOne text-2xl font-medium">
          FAKE STORE
        </Typography>
        {menu}
      </div>
      <hr className="my-5 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Fake Store
      </Typography>
    </footer>
  );
};

export default Footer;
