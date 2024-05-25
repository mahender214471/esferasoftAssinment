import React, { useState } from "react";
import { Typography, Input, Chip, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import APIs from "../Apis";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const AddressComponets = ({
  index,
  date,
  addressRemoveHanddler,
  handdlreAddressCHnage,
}) => {
  const { houseNumber, city, state, countary } = date;
  return (
    <>
      <div
        className="w-full flex items-center justify-between mt-6"
        key={index}
      >
        <label className="text-sm w-36">Address {index + 1}</label>
        <div
          className="w-full flex justify-end mt-6 cursor-pointer"
          onClick={() => addressRemoveHanddler(index)}
        >
          {index !== 0 ? (
            <Chip size="sm" value="Remove" className="bg-red-400" />
          ) : null}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <Typography variant="body" color="blue-gray" className="-mb-3">
          Enter house number
        </Typography>
        <Input
          size="lg"
          placeholder="house no 512"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={houseNumber}
          name="houseNumber"
          onChange={(e) =>
            handdlreAddressCHnage(index, e?.target?.name, e?.target?.value)
          }
        />
      </div>
      <div className="w-full flex flex-col mt-6">
        <Typography variant="body" color="blue-gray" className="-mb-3">
          Enter city
        </Typography>
        <Input
          size="lg"
          placeholder="chandigarh"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={city}
          name="city"
          onChange={(e) =>
            handdlreAddressCHnage(index, e?.target?.name, e?.target?.value)
          }
        />
      </div>
      <div className="w-full flex flex-col mt-6">
        <Typography variant="body" color="blue-gray" className="-mb-3">
          Enter state
        </Typography>
        <Input
          size="lg"
          placeholder="Chadigarh"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={state}
          name="state"
          onChange={(e) =>
            handdlreAddressCHnage(index, e?.target?.name, e?.target?.value)
          }
        />
      </div>
      <div className="w-full flex flex-col mt-6">
        <Typography variant="body" color="blue-gray" className="-mb-3">
          Enter countary
        </Typography>
        <Input
          size="lg"
          placeholder="India"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={countary}
          name="countary"
          onChange={(e) =>
            handdlreAddressCHnage(index, e?.target?.name, e?.target?.value)
          }
        />
      </div>
    </>
  );
};
export default function AddUser() {
  const router = useNavigate();
  const [data, setDate] = useState({
    name: "",
    age: "",
    address: [
      {
        houseNumber: "",
        city: "",
        state: "",
        countary: "",
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const newAddress = [
    {
      houseNumber: "",
      city: "",
      state: "",
      countary: "",
    },
  ];
  const handdleAddAddress = () => {
    setDate((state) => {
      const updatedAdress = [...state?.address, ...newAddress];
      state.address = updatedAdress;
      return { ...state };
    });
  };
  const handdleRemoveAddress = (index) => {
    setDate((state) => {
      state.address.splice(index, 1);
      return { ...state };
    });
  };
  const handdlreAddressCHnage = (index, name, value) => {
    setDate((state) => {
      state.address[index][name] = value;
      return { ...state };
    });
  };
  const handdleFormSubmit = async () => {
    try {
      const showError = (msg) => toast.error(msg);
      if (data?.name == "") {
        showError("Name is required");
        return;
      }
      if (data?.age == "") {
        showError("Age is required");
        return;
      }
      const typedAddress = data?.address;
      for (let i = 0; i < typedAddress.length; i++) {
        const { houseNumber, city, state, countary } = typedAddress[i];
        if (houseNumber == "") {
          showError(`House number reuired at address ${i + 1}`);
          return;
        }
        if (city == "") {
          showError(`City reuired at address ${i + 1}`);
          return;
        }
        if (state == "") {
          showError(`State reuired at address ${i + 1}`);
          return;
        }
        if (countary == "") {
          showError(`Countary reuired at address ${i + 1}`);
          return;
        }
      }
      setLoading(true);
      const res = await APIs.addNewUser(data);
      toast.success(res?.message);
      router("/home");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
      console.log("err ===========>", err);
    }
  };
  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-1/3 h-auto flex flex-col items-center">
        <Typography variant="h6" color="blue-gray" className="mt-14">
          Add new user
        </Typography>
        <div className="w-full flex flex-col mt-6">
          <Typography variant="body" color="blue-gray" className="-mb-3">
            Enter name
          </Typography>
          <Input
            size="lg"
            placeholder="Mahender"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="name"
            value={data?.name}
            onChange={(e) =>
              setDate((state) => {
                state.name = e.target.value;
                return { ...state };
              })
            }
          />
        </div>
        <div className="w-full flex flex-col mt-6">
          <Typography variant="body" color="blue-gray" className="-mb-3">
            Enter age
          </Typography>
          <Input
            size="lg"
            placeholder="23 years"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            type="number"
            name="age"
            value={data?.age}
            onChange={(e) =>
              setDate((state) => {
                state.age = e.target.value;
                return { ...state };
              })
            }
          />
        </div>
        {data?.address?.map((address, index) => {
          return (
            <AddressComponets
              index={index}
              date={address}
              addressRemoveHanddler={handdleRemoveAddress}
              handdlreAddressCHnage={handdlreAddressCHnage}
            />
          );
        })}
        <div
          className="w-full flex justify-end mt-6 cursor-pointer"
          onClick={handdleAddAddress}
        >
          <Chip size="sm" value="Add" />
        </div>
        <div className="w-full flex items-center justify-between">
          <Button
            className="mt-10 bg-red-400"
            fullWidth
            onClick={handdleFormSubmit}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="#ffff" /> : "Add"}
          </Button>
          <Button
            className="mt-10 bg-red-200 ml-2"
            fullWidth
            onClick={() => router(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
