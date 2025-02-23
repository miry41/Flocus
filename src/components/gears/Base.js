import React, { useState, useEffect, useCallback } from 'react';

function Base() {
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
  
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
  
    return (
      <div className="base">
        <div className="text-center">
          <h2>{currentDate}</h2>
          <h1>{currentTime}</h1>
        </div>
      </div>
    );
}

export default Base;