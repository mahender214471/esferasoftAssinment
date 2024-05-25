import { EyeIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import APIs from "../Apis";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const router = useNavigate();
  const [TABLE_ROWS, SetTABLE_ROWS] = useState([]);
  const getHomeDetails = async () => {
    try {
      const res = await APIs.getHome();
      SetTABLE_ROWS(res?.body ? res?.body : []);
    } catch (err) {
      console.log("err ========>", err);
    }
  };
  useEffect(() => {
    getHomeDetails();
  }, []);
  const TABLE_HEAD = ["Sr. no", "Name", "Age", "Created date", "Address"];
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users list
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-red-200 bg-red-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ _id, name, age, createdAt }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {index + 1}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {age}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(createdAt).format("lll")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      className="flex items-center w-16 bg-gray-600"
                      onClick={() => router(`/view-address?userId=${_id}`)}
                    >
                      <EyeIcon className="h-6 w-6" />
                    </Button>
                    {/* <Chip
                      size="sm"
                      className="w-16"
                      color="green"
                      value="Views"
                    /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
