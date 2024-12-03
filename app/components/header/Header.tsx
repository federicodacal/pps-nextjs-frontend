import React from 'react';

interface HeaderProps{
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-screen max-h-40 mb-2 w-screen  bg-gradient-to-b from-[#3B0764] to-[#b37cee] flex items-center grid justify-items-center  text-center">
      <h1 className="text-4xl font-bold text-lime-200">{title}</h1>
    </header>
  );
}