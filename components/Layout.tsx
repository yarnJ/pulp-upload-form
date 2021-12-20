import Logo from '../assets/images/logoipsum.com.svg';

export function Layout({ children }) {
  return (
    <div className="flex flex-col py-10 items-center bg-indigo-100 antialiased min-h-screen">
      <div className="w-80">
        <Logo />
      </div>
      <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        {children}
      </div>
    </div>
  );
}
