import React, { useState, useEffect, useCallback } from 'react';

function Base() {
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // 日本標準時を取得する関数
    const updateTime = useCallback(() => {
      const now = new Date();
      const jstTime = now.toLocaleTimeString('ja-JP', { hour12: false });
      const jstDate = now.toLocaleDateString('ja-JP');
      setCurrentTime(jstTime);
      setCurrentDate(jstDate);
    }, []);

    // コンポーネントのマウント時および毎秒の更新
    useEffect(() => {
      updateTime();
      const timer = setInterval(updateTime, 1000); // 1秒ごとに更新
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
          <h1>{currentTime}</h1>
          <input
            type="text"
            placeholder="Googleで検索..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            style={{ width: "60%", padding: "5px" }}
          />
        </div>
      </div>
    );
}

export default Base;