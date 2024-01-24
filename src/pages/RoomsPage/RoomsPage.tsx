import Header from '@/components/ui/Header';

const RoomsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header showBackButton backRoute="/madmin" showAddRoomButton={true} />
    </div>
  );
};

export default RoomsPage;