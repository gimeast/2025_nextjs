import Searchbar from '@/app/(with-searchbar)/searchbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
