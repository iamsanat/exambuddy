'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  return (<>
    <nav className="bg-blue-500 p-4 w-full">
      <h1 className="text-black text-2xl font-bold text-center">Exam-Buddy</h1>
    </nav>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

    <div className="flex items-center mt-8">
      <Link href="/addquestion">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-8">Add Questions</button>
      </Link>
      <br />
      <Link href="/retriveQuestion">
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded">Create Question Paper</button>
      </Link>
    </div>
  </div>
  </>
  );
}