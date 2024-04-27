import axios from 'axios';
import { NextResponse } from 'next/server';
type lgoinUser = {
  params: {
    email: string;
    password: string;
  };
};

export const GET = async (loginUser: lgoinUser) => {
  const { data } = await axios.get('http://localhost:8000/auth', loginUser);
  return NextResponse.json(data);
};
