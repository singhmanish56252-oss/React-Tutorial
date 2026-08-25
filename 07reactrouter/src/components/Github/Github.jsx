import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();

  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      Github Followers: {data.followers}

      <div className="flex justify-center mt-4">
        <img
          src={data.avatar_url}
          alt="Github"
          className="rounded-full w-48"
        />
      </div>

      <h2 className="mt-4">{data.name}</h2>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch(
    "https://api.github.com/users/singhmanish56252-oss"
  );

  return response.json();
};