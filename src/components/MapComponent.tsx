import { useEffect, useRef, useState } from 'react';
import { weddingData } from '@/data/wedding';

interface MapComponentProps {
  className?: string;
  markerPosition?: [number, number];
  markerIcon?: string;
}

export default function MapComponent({
  className = 'h-64 md:h-96',
  markerPosition = weddingData.amapConfig.center,
  markerIcon = weddingData.mapData.marker.icon
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapLoaded) return;

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=${weddingData.amapConfig.version}&key=${weddingData.amapConfig.key}&plugin=${weddingData.amapConfig.plugins.join(',')}`;
    script.async = true;
    
    script.onload = () => {
      if (!window.AMap || !window.AMap.Map) {
        setMapError(true);
        return;
      }
      
      try {
        const AMap = window.AMap;
        const map = new AMap.Map(mapRef.current!, {
          zoom: weddingData.amapConfig.zoom,
          center: markerPosition,
          viewMode: '2D'
        });

        // 添加控件
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());


        setMapLoaded(true);
      } catch (error) {
        console.error('地图初始化失败:', error);
        setMapError(true);
      }
    };

    script.onerror = () => {
      setMapError(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [markerPosition, markerIcon, mapLoaded]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p>地图加载中...</p>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <p className="text-red-500">地图加载失败，请稍后重试</p>
        </div>
      )}
    </div>
  );
}