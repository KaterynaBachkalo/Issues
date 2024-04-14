import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import Loader from "../Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export const SharedLayout = () => {
  return (
    <div>
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <main>
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
