import { Helmet } from "react-helmet-async";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { COLORS } from "../../style/theme";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Helmet>
        <title>404 – Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for cannot be found."
        />
      </Helmet>

      <div className="text-center p-6">
        <div className="flex justify-center mb-4">
          <IoAlertCircleOutline size={80} color={COLORS.primary} />
        </div>

        <h1
          className="text-3xl font-semibold mb-2"
          style={{ color: COLORS.primary }}>
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          The page you are trying to reach doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded-lg text-white font-medium"
          style={{ background: COLORS.primary }}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
