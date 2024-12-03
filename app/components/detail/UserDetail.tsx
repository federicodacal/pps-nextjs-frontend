import React, { useEffect, useState } from "react";
import {  User } from '../../types/users';

type UserProps = {
    user:User
  };

const UserCard: React.FC<UserProps> = ({user}) => {
    const { username } = user.user_detail;
    const { points, profile } = user.creator;
  
    return (
      <div className="max-w-sm mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Información del Usuario</h2>
        <p className="mb-2">
          <span className="font-semibold">Username:</span> {username}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Points:</span> {points}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Profile:</span> {profile}
        </p>
      </div>
    );
  };
  
  export default UserCard;