import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ul className='max-w-[1200px] mx-auto flex gap-12 h-12 items-center'>
        <li className='font-bold text-xl hover:text-[#777] transition'>
          <Link href='/pracric1'>Characters</Link>
        </li>
        <li className='font-bold text-xl hover:text-[#777] transition'>
          <Link href='/pracric2'>Locations</Link>
        </li>
      </ul>
      <main>{children}</main>
    </>
  )
}
