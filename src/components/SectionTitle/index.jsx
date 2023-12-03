const SectionTitle = ({ title }) => {
  return (
    <div className="my-6 flex items-center gap-2 lg:gap-3">
      <div className="h-6 w-6 rounded-md bg-primary lg:h-8 lg:w-8"></div>
      <h3 className="font-poppins text-lg font-bold lg:text-2xl">{title}</h3>
    </div>
  );
};

export default SectionTitle;
