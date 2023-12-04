import { Button, Card, CardBody, CardFooter, CardHeader, Rating, Typography } from '@material-tailwind/react';

const CardProduct = ({ image, title, price, rate, count, handleAddToCart }) => {
  return (
    <Card className="group w-full cursor-pointer border transition-all duration-200 hover:shadow-lg">
      <CardHeader shadow={false} floated={false} className="h-56">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-200 group-hover:scale-110"
        />
      </CardHeader>
      <CardBody className="h-36 lg:h-52">
        <div className="mb-2 flex flex-row items-start justify-between ">
          <Typography color="blue-gray" className="font-poppins font-medium">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-poppins font-bold">
            ${price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between gap-2 py-3 font-bold text-blue-gray-500">
          <Rating value={Math.floor(rate)} readonly />
          <Typography color="blue-gray" className="font-poppins font-medium text-blue-gray-500">
            ({count})
          </Typography>
        </div>
        <Button
          onClick={handleAddToCart}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 font-poppins text-blue-gray-900 shadow-none hover:scale-105 hover:bg-red-200 hover:text-red-800 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
