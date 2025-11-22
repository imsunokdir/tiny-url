import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { linkApi } from "../services/linkApi";
import type { Link as LinkType } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const Stats = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [link, setLink] = useState<LinkType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      if (!code) return;

      try {
        setLoading(true);
        const data = await linkApi.getLinkByCode(code);
        setLink(data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Link not found");
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [code]);

  const handleDelete = async () => {
    if (!code || !confirm("Are you sure you want to delete this link?")) return;

    try {
      setDeleting(true);
      await linkApi.deleteLink(code);
      alert("Link deleted successfully!");
      navigate("/");
    } catch {
      alert("Failed to delete link");
      setDeleting(false);
    }
  };

  const copyToClipboard = () => {
    if (!code) return;

    const url = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(url);
    alert(`Copied: ${url}`);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleString();
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4 flex items-center justify-center">
        {/* <div className="bg-white rounded-2xl shadow-2xl p-8"> */}
        <LoadingSpinner />
        {/* </div> */}
      </div>
    );
  }

  // Error screen
  if (error || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              ❌ Link Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              This link doesn't exist or has been deleted.
            </p>

            {/* <Link
              to="/"
              className="inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition"
            >
              Go to Dashboard
            </Link> */}
          </div>
        </div>
      </div>
    );
  }

  // Main Stats Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            📊 Link Statistics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Short Link */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Short Link
              </h3>

              <div className="flex items-center gap-2">
                <a
                  href={`${window.location.origin}/${link.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-purple-600 hover:underline break-all"
                >
                  {window.location.origin}/{link.code}
                </a>

                <button
                  onClick={copyToClipboard}
                  className="text-2xl hover:scale-110 transition"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </div>

            {/* Target URL */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Target URL
              </h3>

              <a
                href={link.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline break-all"
              >
                {link.targetUrl}
              </a>
            </div>

            {/* Total Clicks */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Total Clicks
              </h3>
              <p className="text-4xl font-bold text-green-600">{link.clicks}</p>
            </div>

            {/* Last Clicked */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border-l-4 border-orange-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Last Clicked
              </h3>
              <p className="text-lg font-semibold text-orange-600">
                {formatDate(link.lastClicked)}
              </p>
            </div>

            {/* Created */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Created
              </h3>
              <p className="text-lg font-semibold text-indigo-600">
                {formatDate(link.createdAt)}
              </p>
            </div>

            {/* Code */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border-l-4 border-pink-600">
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Code
              </h3>
              <p className="text-2xl font-bold text-pink-600">{link.code}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
            >
              {deleting ? "Deleting..." : "Delete Link"}
            </button>

            <Link
              to="/"
              className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
