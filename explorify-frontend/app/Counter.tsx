"use client";

import React from "react";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./store/slices/counterSlice";
import { useAppSelector, useAppDispatch } from "./store/store";

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <h2 className='text-xl text-black font-bold'>Counter: {count}</h2>
      <div className='mt-4'>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded mr-2'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className='px-4 py-2 bg-red-500 text-white rounded mr-2'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className='px-4 py-2 bg-green-500 text-white rounded'
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;
