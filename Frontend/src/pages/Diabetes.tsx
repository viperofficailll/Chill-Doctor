import React, { useState, type ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Type definitions
interface FormData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigreeFunction: string;
  age: string;
}

interface PredictionResult {
  prediction: number;
  probability?: number[];
  success?: boolean;
  inputData?: FormData;
  timestamp?: string;
}

const Diabetes: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "2",
    glucose: "120",
    bloodPressure: "70",
    skinThickness: "20",
    insulin: "79",
    bmi: "25.5",
    diabetesPedigreeFunction: "0.5",
    age: "33",
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setError("");
    setPrediction(null);

    // Show loading toast
    const toastId = toast.loading("Processing your prediction...");

    setLoading(true);
    try {
      const features = [
        Number(formData.pregnancies),
        Number(formData.glucose),
        Number(formData.bloodPressure),
        Number(formData.skinThickness),
        Number(formData.insulin),
        Number(formData.bmi),
        Number(formData.diabetesPedigreeFunction),
        Number(formData.age),
      ];

      const response = await axios.post<PredictionResult>(
        "http://localhost:8000/predict",
        { features },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPrediction(response.data);
      toast.success("Prediction completed!", { id: toastId });
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      const message =
        axiosError.response?.data?.error ||
        "Error making prediction. Please try again.";
      setError(message);
      toast.error(message, { id: toastId });
      console.error("Prediction error:", axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (): void => {
    setFormData({
      pregnancies: "",
      glucose: "",
      bloodPressure: "",
      skinThickness: "",
      insulin: "",
      bmi: "",
      diabetesPedigreeFunction: "",
      age: "",
    });
    setPrediction(null);
    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 mb-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Diabetes Prediction
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                { name: "pregnancies", label: "Pregnancies" },
                { name: "glucose", label: "Glucose Level" },
                { name: "bloodPressure", label: "Blood Pressure" },
                { name: "skinThickness", label: "Skin Thickness" },
                { name: "insulin", label: "Insulin" },
                { name: "bmi", label: "BMI", step: "0.1" },
                {
                  name: "diabetesPedigreeFunction",
                  label: "Diabetes Pedigree Function",
                  step: "0.001",
                },
                { name: "age", label: "Age" },
              ] as const
            ).map(({ name, label, step }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={name}
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  min="0"
                  step={step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Predicting..." : "Predict Diabetes"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {prediction && (
          <div
            className={`mt-6 p-6 border rounded-md ${
              prediction.prediction === 1
                ? "bg-red-100 border-red-400 text-red-700"
                : "bg-green-100 border-green-400 text-green-700"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3">Prediction Result</h3>
            <div className="space-y-2">
              <p className="text-sm font-bold">
                {prediction.prediction === 1
                  ? "⚠️ You can't chill – start exercising and consult your doctor."
                  : "✅ You can chill – keep up the healthy habits!"}
              </p>
              {Array.isArray(prediction.probability) &&
                prediction.probability.length > 1 && (
                  <p className="text-sm">
                    <span className="font-medium">Confidence:</span>{" "}
                    {(prediction.probability[1] * 100).toFixed(1)}%
                  </p>
                )}
              <p className="text-xs mt-3 text-gray-600">
                * This prediction is for informational purposes only and should
                not replace professional medical advice.
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Diabetes;
