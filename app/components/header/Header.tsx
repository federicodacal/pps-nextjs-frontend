import React from 'react';

interface HeaderProps{
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="py-12 w-full bg-gradient-to-r from-[#B266FF] to-[#E5CCFF]  text-center">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </header>
  );
}