import ClientComponent from '@/components/client-component';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;
  return (
    <div>
      검색 페이지 : {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default Page;
