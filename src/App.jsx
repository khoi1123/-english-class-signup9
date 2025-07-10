import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = form.email.includes("@") || /^[0-9]{9,11}$/.test(form.email);
    if (!isValid) {
      alert("Vui lòng nhập email hợp lệ hoặc số điện thoại.");
      return;
    }

    try {
      const response = await fetch("https://sheetdb.io/api/v1/4hw45peonj95w", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: form }),
      });

      if (!response.ok) {
        throw new Error("Gửi dữ liệu thất bại");
      }

      setSubmitted(true);
    } catch (err) {
      alert("Không gửi được dữ liệu. Vui lòng kiểm tra lại.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 space-y-6">
        <div className="flex justify-between">
          <Link to="/signup" className="text-blue-500 hover:underline text-sm">Đăng ký tài khoản</Link>
          <Link to="/login" className="text-green-500 hover:underline text-sm">Đăng nhập</Link>
        </div>

        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain mb-2" />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-pink-600 drop-shadow">
          Đăng ký lớp học tiếng Anh
        </h1>
        <p className="text-center text-gray-600">
          Lớp học kết hợp học & chơi – giúp bé yêu thích tiếng Anh từ sớm!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Họ và tên phụ huynh"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <input
              name="email"
              type="text"
              placeholder="Email hoặc SĐT liên hệ"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <textarea
              name="message"
              placeholder="Thông tin thêm về bé hoặc câu hỏi (nếu có)"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
              rows="4"
            />
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
            >
              Gửi đăng ký
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 text-lg font-medium">
            🎉 Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ lại sớm nhất 💌
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Design by <span className="text-pink-600 font-semibold">Khơi Phạm</span>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
