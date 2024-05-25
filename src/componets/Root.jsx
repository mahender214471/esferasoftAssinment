import { Typography, Input } from "@material-tailwind/react";
export const BasicInput = () => {
  return (
    <div className="w-full flex flex-col mt-6">
      <Typography variant="body" color="blue-gray" className="-mb-3">
        Enter your password
      </Typography>
      <Input
        type="password"
        size="lg"
        placeholder="********"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
  );
};
