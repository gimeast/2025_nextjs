import Searchbar from '@/components/searchbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
