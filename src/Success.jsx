import { useEffect } from "react";
import PropTypes from "prop-types";

Success.propTypes = {
  message: PropTypes.string.isRequired,
  onDisappear: PropTypes.func,
};

function Success({ message, onDisappear }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onDisappear) {
        onDisappear();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDisappear]);

  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}

export default Success;
