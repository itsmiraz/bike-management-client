import RootLayout from "./components/layout/rootLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <>
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    </>
  );
};

export default App;
