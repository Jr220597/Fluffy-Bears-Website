import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fluffy Bears Staking',
  description: 'Stake your Fluffy Bears NFTs and earn rewards!',
};

export default function StakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 