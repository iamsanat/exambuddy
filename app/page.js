'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  return (
    <>
      <div>
        <nav className="bg-blue-500 p-4">
          <h1 style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem' }}>Exam-Buddy</h1>
        </nav>

        <div className="login-buttons mt-8">
          <Link href="/addquestion"><><button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2">Add Questions</button></></Link>
          <Link href="/retriveQuestion"><><button className="bg-green-500 text-white font-semibold py-2 px-4 rounded">Retrieve Questions</button></></Link>
        </div>
      </div>
    </>
  );
}