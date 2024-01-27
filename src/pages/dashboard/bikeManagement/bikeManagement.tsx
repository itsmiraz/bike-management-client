import AddnewBikeModal from "./_lib/components/add-new-bike-modal";

const BikeManagement = () => {
  return (
    <div>
      <h1 className="h3-semibold">Bike Management</h1>

      <div className="py-4">
        <AddnewBikeModal />
      </div>
    </div>
  );
};

export default BikeManagement;
