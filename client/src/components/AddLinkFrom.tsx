import { useState, type FormEvent } from "react";
import type { CreateLinkInput } from "../types";
import { linkApi } from "../services/linkApi";
import { validateCode, validateUrl } from "../utils/validation";
import { message } from "antd";

interface AddLinkFormProps {
  onLinkCreated: () => void;
}

const AddLinkForm = ({ onLinkCreated }: AddLinkFormProps) => {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!targetUrl) {
      setError("Target URL is required");
      return;
    }

    if (!validateUrl(targetUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (customCode && !validateCode(customCode)) {
      setError("Custom code must be 6-8 alphanumeric characters");
      return;
    }

    try {
      setLoading(true);
      const input: CreateLinkInput = {
        targetUrl,
        customCode: customCode || undefined,
      };

      await linkApi.createLink(input);

      // setSuccess(`✅ Link created! Short URL: ${API_URL}/${link.code}`);
      messageApi.success({
        content: `Link created successfully..!!`,
        duration: 5,
      });
      setTargetUrl("");
      setCustomCode("");

      // Refresh the links list
      onLinkCreated();

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        messageApi.error("Custom code already exists. Please choose another.");
      } else {
        messageApi.error(err.response?.data?.error || "Failed to create link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {contextHolder}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create Short Link
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Target URL */}
          <div>
            <label
              htmlFor="targetUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Target URL *
            </label>
            <input
              type="text"
              id="targetUrl"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              disabled={loading}
            />
          </div>

          {/* Custom Code */}
          <div>
            <label
              htmlFor="customCode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Custom Code (optional)
            </label>
            <input
              type="text"
              id="customCode"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="mycode (6-8 characters)"
              pattern="[A-Za-z0-9]{6,8}"
              minLength={6}
              maxLength={8}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for auto-generated code. Must be 6-8 alphanumeric
              characters.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Short Link"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLinkForm;
