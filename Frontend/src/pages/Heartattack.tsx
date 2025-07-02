import React, { useState, type ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  age: string;
  gender: "male" | "female" | "";
  heartRate: string;
  systolicBP: string;
  diastolicBP: string;
  bloodSugar: string;
  ckmb: string;
  troponin: string;
}

interface PredictionResult {
  prediction: number;
  probability: number[]; // expecting [prob_no, prob_yes]
}

const Heartattack: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: "45",
    gender: "male",
    heartRate: "75",
    systolicBP: "120",
    diastolicBP: "80",
    bloodSugar: "100",
    ckmb: "1.0",
    troponin: "0.02",
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    // Show toast for processing
    const toastId = toast.info("Processing prediction...", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

    try {
      const features = [
        Number(formData.age),
        formData.gender === "male" ? 1 : 0,
        Number(formData.heartRate),
        Number(formData.systolicBP),
        Number(formData.diastolicBP),
        Number(formData.bloodSugar),
        Number(formData.ckmb),
        Number(formData.troponin),
      ];

      const response = await axios.post<PredictionResult>(
        "http://localhost:8000/predictt",
        { features },
        { headers: { "Content-Type": "application/json" } }
      );

      setPrediction(response.data);
      toast.dismiss(toastId); // Dismiss processing toast on success
    } catch (err) {
      toast.dismiss(toastId); // Dismiss processing toast on error
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response?.data?.error) {
        setError(`Error: ${axiosError.response.data.error}`);
        toast.error(`Error: ${axiosError.response.data.error}`, {
          position: "top-center",
        });
      } else {
        setError("Error making prediction. Please try again.");
        toast.error("Error making prediction. Please try again.", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "",
      heartRate: "",
      systolicBP: "",
      diastolicBP: "",
      bloodSugar: "",
      ckmb: "",
      troponin: "",
    });
    setPrediction(null);
    setError("");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-128px)] bg-blue-50 py-12 px-6 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            Heart Condition Prediction
          </h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inputs */}
            {[
              { label: "Age", name: "age" },
              { label: "Heart Rate (bpm)", name: "heartRate" },
              { label: "Systolic Blood Pressure (mm Hg)", name: "systolicBP" },
              {
                label: "Diastolic Blood Pressure (mm Hg)",
                name: "diastolicBP",
              },
              { label: "Blood Sugar (mg/dL)", name: "bloodSugar" },
              { label: "CK-MB (ng/mL)", name: "ckmb", step: "0.01" },
              { label: "Troponin (ng/mL)", name: "troponin", step: "0.01" },
            ].map(({ label, name, step }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="font-semibold mb-2 text-blue-800"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type="number"
                  min="0"
                  step={step || "1"}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>
            ))}

            {/* Gender Select */}
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="font-semibold mb-2 text-blue-800"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </form>

          {/* Buttons */}
          <div className="flex gap-6 mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
            <button
              onClick={resetForm}
              className="flex-1 border border-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-center font-semibold">
              {error}
            </div>
          )}

          {/* Prediction Result */}
          {prediction && (
            <div
              className={`mt-8 p-6 rounded-lg border font-semibold text-center ${
                prediction.prediction === 1
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-green-100 border-green-400 text-green-700"
              }`}
            >
              <h2 className="mb-3 text-xl">Prediction Result</h2>
              <p className="mb-2 text-lg">
                {prediction.prediction === 1
                  ? "⚠️ You can't chill – start exercising and consult your doctor."
                  : "✅ You're good to chill – keep up the healthy habits!"}
              </p>
              <p>Confidence: {(prediction.probability[1] * 100).toFixed(1)}%</p>
              <small className="block mt-3 text-gray-600 text-xs">
                * This prediction is for informational purposes only.
              </small>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Heartattack;
