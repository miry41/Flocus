import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Base() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 日本標準時を取得する関数
  const updateTime = useCallback(() => {
    const now = new Date();
    const jstTime = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    const jstDate = now.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });
    setCurrentTime(jstTime);
    setCurrentDate(jstDate);
  }, []);

  // コンポーネントのマウント時および毎分の更新
  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 60000); // 1分ごとに更新
    return () => clearInterval(timer); // クリーンアップ
  }, [updateTime]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      const query = encodeURIComponent(searchQuery);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  return (
    <div className="base">
      <div className="text-center">
        <h5>{currentDate}</h5>
        <h1 className="display-1">{currentTime}</h1>
        <input
          type="text"
          placeholder="Googleで検索..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
          className="form-control mx-auto"
          style={{ maxWidth: "500px" }}
        />
      </div>
    </div>
  );
}

export default Base;