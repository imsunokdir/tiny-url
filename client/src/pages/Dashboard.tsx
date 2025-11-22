import AddLinkForm from "../components/AddLinkFrom";
import Header from "../components/Header";
import LinksTable from "../components/LinksTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLinks } from "../hooks/useLinks";

const Dashboard = () => {
  const { links, loading, error, refetch } = useLinks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <Header />

          <AddLinkForm onLinkCreated={refetch} />

          {loading && <LoadingSpinner />}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}

          {!loading && !error && (
            <LinksTable links={links} onLinkDeleted={refetch} />
          )}

          <footer className="text-center mt-12 pt-6 border-t-2 border-gray-200">
            <p className="text-gray-600">
              {/* Made with ❤️ */}
              {/* |{" "} */}
              {/* <a
                href={`https://${import.meta.env.VITE_API_UR}/heartz`}
                target="_blank"
                className="text-purple-600 hover:underline"
              >
                System Health
              </a> */}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
