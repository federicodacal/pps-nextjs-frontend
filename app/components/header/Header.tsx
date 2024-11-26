import React from 'react';

interface HeaderProps{
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-screen max-h-48 mb-10 w-screen max-w-5xl bg-gradient-to-b from-[#7040A1] to-[#E5CCFF] flex items-center grid justify-items-center  text-center">
      <h1 className="text-4xl font-bold text-black">{title}</h1>
    </header>
  );
}