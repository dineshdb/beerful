import React from "react";

interface Props {
  error?: string;
}

export default function Error({ error }: Props) {
  if (!error) {
    return <></>;
  }

  return (
    <div className="bg-red-500 text-white p-5">
      {error}
    </div>
  );
}
