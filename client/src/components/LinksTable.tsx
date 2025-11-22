import { useState } from "react";
import type { Link as LinkType } from "../types";
import { linkApi } from "../services/linkApi";
import { useNavigate } from "react-router-dom";
import { Modal, message, Spin } from "antd";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";

interface LinksTableProps {
  links: LinkType[];
  onLinkDeleted: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const LinksTable = ({ links, onLinkDeleted }: LinksTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingCode, setDeletingCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;

  // Filter search
  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete handler
  const handleDelete = (code: string) => {
    let isDeleting = false;

    const modal = confirm({
      title: "Delete Link",
      icon: <ExclamationCircleFilled />,
      content: (
        <Spin spinning={isDeleting} indicator={<LoadingOutlined spin />}>
          <p>Are you sure you want to delete the link "{code}"?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </Spin>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      closable: false,
      maskClosable: false,
      keyboard: false,

      onOk: async () => {
        isDeleting = true;

        modal.update({
          content: (
            <Spin spinning={true} indicator={<LoadingOutlined spin />}>
              <p>Deleting link "{code}"...</p>
            </Spin>
          ),
          okButtonProps: { disabled: true },
          cancelButtonProps: { disabled: true },
        });

        try {
          setDeletingCode(code);
          await linkApi.deleteLink(code);

          messageApi.success("Link deleted successfully!");
          onLinkDeleted();
          modal.destroy();
        } catch (err) {
          messageApi.error("Failed to delete link");

          isDeleting = false;
          modal.update({
            content: (
              <Spin spinning={false}>
                <p>Are you sure you want to delete the link "{code}"?</p>
                <p className="text-red-500 text-sm mt-2">
                  Failed to delete. Please try again.
                </p>
              </Spin>
            ),
            okButtonProps: { disabled: false },
            cancelButtonProps: { disabled: false },
          });

          throw err;
        } finally {
          setDeletingCode(null);
        }
      },
    });
  };

  // Copy to clipboard
  const copyToClipboard = (code: string) => {
    const url = `${API_URL}/${code}`;
    navigator.clipboard.writeText(url);
    // messageApi.success(`Copied: ${url}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Empty state
  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">
          📭 No links yet. Create your first short link above!
        </p>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Links</h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search by code or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Table container */}
        <div className="bg-white rounded-lg shadow h-[500px] flex flex-col">
          <div className="flex-1 overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Short Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Target URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <tr
                      key={link.id}
                      className="hover:bg-gray-50 transition sm:table-row block mb-4 sm:mb-0 border sm:border-0 rounded-lg sm:rounded-none"
                    >
                      {/* Short Code */}
                      <td className="px-6 py-2 whitespace-nowrap sm:table-cell block">
                        <span className="sm:hidden font-semibold text-gray-600">
                          Short Code:{" "}
                        </span>
                        <button
                          onClick={() => navigate(`/code/${link.code}`)}
                          className="text-purple-600 font-semibold hover:underline"
                        >
                          {link.code}
                        </button>
                      </td>

                      {/* Target URL */}
                      <td className="px-6 py-2 sm:table-cell block">
                        <span className="sm:hidden font-semibold text-gray-600">
                          Target URL:{" "}
                        </span>
                        <div
                          className="max-w-xs truncate"
                          title={link.targetUrl}
                        >
                          <a
                            href={link.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {link.targetUrl}
                          </a>
                        </div>
                      </td>

                      {/* Clicks */}
                      <td className="px-6 py-2 whitespace-nowrap sm:table-cell block">
                        <span className="sm:hidden font-semibold text-gray-600">
                          Clicks:{" "}
                        </span>
                        <span className="px-2 py-1 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full">
                          {link.clicks}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-2 whitespace-nowrap text-sm space-x-2 sm:table-cell block">
                        <span className="sm:hidden font-semibold text-gray-600">
                          Actions:{" "}
                        </span>

                        <button
                          onClick={() => copyToClipboard(link.code)}
                          className={
                            copiedCode === link.code
                              ? "bg-green-600 text-white px-3 py-1 rounded transition"
                              : "bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                          }
                        >
                          {copiedCode === link.code ? "Copied!" : "Copy"}
                        </button>

                        <button
                          onClick={() => handleDelete(link.code)}
                          disabled={deletingCode === link.code}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400 transition"
                        >
                          {deletingCode === link.code ? (
                            <span className="flex items-center gap-2">
                              <LoadingOutlined spin />
                              Deleting...
                            </span>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <p className="text-gray-500">
                        No links found matching "{searchTerm}"
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksTable;
