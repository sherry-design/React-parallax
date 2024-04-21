import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ImageOne from "../components/ImageOne";
import MyPrediction from "../components/MyPrediction";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<ImageOne />} />
          <Route path="/predict" element={<MyPrediction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MyRoutes;
