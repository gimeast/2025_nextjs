import ClientComponent from '@/components/client-component';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      상세 페이지 : {id}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default Page;
