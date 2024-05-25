import { TrashIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Checkbox,
  Chip,
} from "@material-tailwind/react";
import APIs from "../Apis";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export default function ViewsAddress() {
  const router = useNavigate();
  const req = useLocation();
  const [TABLE_ROWS, SetTABLE_ROWS] = useState([]);
  const [selectedId, seSelectedId] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDetails = async () => {
    try {
      let userId = req?.search?.split("=")[1];
      const res = await APIs.getAddress(userId);
      SetTABLE_ROWS(res?.body ? res?.body : []);
    } catch (err) {
      console.log("err ========>", err);
    }
  };
  const handdleSeleceDiselect = (checkedStatus, id) => {
    if (checkedStatus) {
      seSelectedId((state) => {
        if (!selectedId?.includes(id)) {
          state.push(id);
        }
        return [...state];
      });
    } else {
      const idIndex = selectedId.findIndex((selectedId) => selectedId === id);
      seSelectedId((state) => {
        state.splice(idIndex, 1);
        return [...state];
      });
    }
  };
  const handdleUpdate = async (type, isValid) => {
    try {
      if (!selectedId[0]) {
        toast.error(
          `Please select an row for ${type == 1 ? "delete" : "update"}`
        );
        return;
      }
      const res = await APIs.updateAddress(type, selectedId, isValid);
      toast.success(res?.message);
      getDetails();
    } catch (err) {
      console.log("err ==========>", err);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  const TABLE_HEAD = [
    "Sr. no",
    "Select",
    "House number",
    "City",
    "State",
    "Countary",
    "Vailed address",
  ];
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="w-full flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              User address list
            </Typography>
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center cursor-pointer mr-4"
                onClick={() => handdleUpdate(1)}
              >
                <TrashIcon className="w-6 h-6 text-white" />
              </div>
              <div
                className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center cursor-pointer mr-4"
                onClick={() => handdleUpdate(2, 1)}
              >
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <div
                className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer mr-4"
                onClick={() => handdleUpdate(2, 2)}
              >
                <XCircleIcon className="w-6 h-6 text-white" />
              </div>
              <Button className="bg-red-300" onClick={() => router(-1)}>
                Back
              </Button>
            </div>
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
            {TABLE_ROWS.map(
              ({ _id, houseNumber, city, state, countary, isValid }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={houseNumber}>
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
                        <Checkbox
                          onCh
                          onChange={(e) =>
                            handdleSeleceDiselect(e.target.checked, _id)
                          }
                          checked={selectedId?.includes(_id)}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {houseNumber}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {city}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {state}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {countary}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {isValid == 1 ? (
                        <Chip
                          size="sm"
                          className="w-16"
                          color="green"
                          value="Valid"
                        />
                      ) : (
                        <Chip
                          size="sm"
                          className="w-16"
                          color="red"
                          value="Invailed"
                        />
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
