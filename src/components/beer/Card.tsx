import { Tooltip } from "flowbite-react";

import { Beer } from "./types";
import { truncate } from "./utils";

interface Props {
  beer: Beer;
  children?: any;
}

export default function Card({ beer }: Props) {
  const ingredients = Object.keys(beer.ingredients ?? {}).join(", ");
  return (
    <>
      <div className="xl:w-1/3 lg:w-1/2 h-full w-full bg-white flex flex-row flex-wrap p-3 py-4">
        <div className="rounded-lg shadow-lg w-full flex flex-row flex-wrap p-3 pt-2 hover:bg-sky-100">
          <div className="w-1/5 flex justify-center items-center flex-col px-2 p-3">
            {ingredients === ""
              ? (
                <img
                  className="rounded-lg h-28 shadow-lg antialiased"
                  src={beer.image_url}
                  alt={`${beer.name}`}
                />
              )
              : (
                <Tooltip content={ingredients}>
                  <img
                    className="rounded-lg h-28 shadow-lg antialiased"
                    src={beer.image_url}
                    alt={`${beer.name}`}
                  />
                </Tooltip>
              )}
          </div>
          <div className="w-4/5 px-3 py-2 flex flex-row flex-wrap">
            <div className="w-full text-gray-700 relative pt-3 md:pt-0">
              <div className="text-normal cursor-pointer font-semibold">
                <span className="pb-1">{beer.name}</span>
              </div>
              <div className="text-normal cursor-pointer">
                <span className=" text-yellow-500 pb-1">{beer.tagline}</span>
              </div>
              <div className="text-sm text-gray-500 hover:text-gray-400 cursor-pointer md:absolute pt-3">
                {truncate(beer.description ?? "", 80)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
