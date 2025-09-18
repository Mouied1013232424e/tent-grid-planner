import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const TentGridPlanner = () => {
  const SCALE = 8; // pixels per foot for visualization
  const POLE_RADIUS = 3;
  const TABLE_DIAMETER = 6; // 72 inches = 6 feet
  const SMALL_TABLE_DIAMETER = 32 / 12; // 32 inches = 2.67 feet

  // 40x40 configuration
  const totalWidth4040 = 40 * SCALE;
  const totalHeight4040 = 40 * SCALE;
  const tableRadius = (TABLE_DIAMETER * SCALE) / 2;
  const smallTableRadius = (SMALL_TABLE_DIAMETER * SCALE) / 2;

  // 20x80 configuration  
  const totalWidth2080 = 80 * SCALE;
  const totalHeight2080 = 20 * SCALE;

  // Poles for 40x40 (3x3 grid)
  const poles4040 = [
    { x: 0, y: 0 }, { x: 20*SCALE, y: 0 }, { x: 40*SCALE, y: 0 },
    { x: 0, y: 20*SCALE }, { x: 20*SCALE, y: 20*SCALE }, { x: 40*SCALE, y: 20*SCALE },
    { x: 0, y: 40*SCALE }, { x: 20*SCALE, y: 40*SCALE }, { x: 40*SCALE, y: 40*SCALE }
  ];

  // Poles for 20x80 (5x2 grid)
  const poles2080 = [
    { x: 0, y: 0 }, { x: 20*SCALE, y: 0 }, { x: 40*SCALE, y: 0 }, { x: 60*SCALE, y: 0 }, { x: 80*SCALE, y: 0 },
    { x: 0, y: 20*SCALE }, { x: 20*SCALE, y: 20*SCALE }, { x: 40*SCALE, y: 20*SCALE }, { x: 60*SCALE, y: 20*SCALE }, { x: 80*SCALE, y: 20*SCALE }
  ];

  // Initial table positions for 40x40 - 12 large tables
  const initialLargeTables4040 = [
    // Row 1 - 4 tables
    { x: 60, y: 60, id: 1, type: 'large' as const },
    { x: 140, y: 60, id: 2, type: 'large' as const },
    { x: 220, y: 60, id: 3, type: 'large' as const },
    { x: 300, y: 60, id: 4, type: 'large' as const },
    // Row 2 - 4 tables
    { x: 60, y: 160, id: 5, type: 'large' as const },
    { x: 140, y: 160, id: 6, type: 'large' as const },
    { x: 220, y: 160, id: 7, type: 'large' as const },
    { x: 300, y: 160, id: 8, type: 'large' as const },
    // Row 3 - 4 tables
    { x: 60, y: 260, id: 9, type: 'large' as const },
    { x: 140, y: 260, id: 10, type: 'large' as const },
    { x: 220, y: 260, id: 11, type: 'large' as const },
    { x: 300, y: 260, id: 12, type: 'large' as const },
  ];

  // Initial small table positions for 40x40 - 10 cocktail tables
  const initialSmallTables4040 = [
    { x: 40, y: 40, id: 1, type: 'small' as const },
    { x: 120, y: 40, id: 2, type: 'small' as const },
    { x: 200, y: 40, id: 3, type: 'small' as const },
    { x: 280, y: 40, id: 4, type: 'small' as const },
    { x: 40, y: 120, id: 5, type: 'small' as const },
    { x: 320, y: 120, id: 6, type: 'small' as const },
    { x: 40, y: 200, id: 7, type: 'small' as const },
    { x: 320, y: 200, id: 8, type: 'small' as const },
    { x: 200, y: 300, id: 9, type: 'small' as const },
    { x: 280, y: 300, id: 10, type: 'small' as const },
  ];

  // Initial table positions for 20x80 - 8 large tables
  const initialLargeTables2080 = [
    { x: 60, y: 80, id: 1, type: 'large' as const },
    { x: 140, y: 80, id: 2, type: 'large' as const },
    { x: 220, y: 80, id: 3, type: 'large' as const },
    { x: 300, y: 80, id: 4, type: 'large' as const },
    { x: 380, y: 80, id: 5, type: 'large' as const },
    { x: 460, y: 80, id: 6, type: 'large' as const },
    { x: 540, y: 80, id: 7, type: 'large' as const },
    { x: 620, y: 80, id: 8, type: 'large' as const },
  ];

  // Initial small table positions for 20x80 - 6 cocktail tables
  const initialSmallTables2080 = [
    { x: 100, y: 40, id: 1, type: 'small' as const },
    { x: 200, y: 40, id: 2, type: 'small' as const },
    { x: 300, y: 40, id: 3, type: 'small' as const },
    { x: 400, y: 40, id: 4, type: 'small' as const },
    { x: 500, y: 40, id: 5, type: 'small' as const },
    { x: 600, y: 40, id: 6, type: 'small' as const },
  ];

  // State
  const [largeTables4040, setLargeTables4040] = useState(initialLargeTables4040);
  const [smallTables4040, setSmallTables4040] = useState(initialSmallTables4040);
  const [largeTables2080, setLargeTables2080] = useState(initialLargeTables2080);
  const [smallTables2080, setSmallTables2080] = useState(initialSmallTables2080);
  const [draggedTable, setDraggedTable] = useState<{id: number, type: 'large' | 'small', config: '4040' | '2080'} | null>(null);

  // Drag handlers
  const handleMouseDown = (tableId: number, tableType: 'large' | 'small', config: '4040' | '2080', event: React.MouseEvent) => {
    event.preventDefault();
    setDraggedTable({ id: tableId, type: tableType, config });
  };

  const handleMouseMove = (event: React.MouseEvent, config: '4040' | '2080') => {
    if (draggedTable === null || draggedTable.config !== config) return;
    
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    
    let scaleX, scaleY, maxWidth, maxHeight;
    if (config === '4040') {
      scaleX = (totalWidth4040 + 40) / rect.width;
      scaleY = (totalHeight4040 + 40) / rect.height;
      maxWidth = totalWidth4040;
      maxHeight = totalHeight4040;
    } else {
      scaleX = (totalWidth2080 + 40) / rect.width;
      scaleY = (totalHeight2080 + 40) / rect.height;
      maxWidth = totalWidth2080;
      maxHeight = totalHeight2080;
    }
    
    const x = (event.clientX - rect.left) * scaleX - 20;
    const y = (event.clientY - rect.top) * scaleY - 20;
    
    const radius = draggedTable.type === 'large' ? tableRadius : smallTableRadius;
    const clampedX = Math.max(radius, Math.min(maxWidth - radius, x));
    const clampedY = Math.max(radius, Math.min(maxHeight - radius, y));
    
    if (config === '4040') {
      if (draggedTable.type === 'large') {
        setLargeTables4040(prev => prev.map(table => 
          table.id === draggedTable.id ? { ...table, x: clampedX, y: clampedY } : table
        ));
      } else {
        setSmallTables4040(prev => prev.map(table => 
          table.id === draggedTable.id ? { ...table, x: clampedX, y: clampedY } : table
        ));
      }
    } else {
      if (draggedTable.type === 'large') {
        setLargeTables2080(prev => prev.map(table => 
          table.id === draggedTable.id ? { ...table, x: clampedX, y: clampedY } : table
        ));
      } else {
        setSmallTables2080(prev => prev.map(table => 
          table.id === draggedTable.id ? { ...table, x: clampedX, y: clampedY } : table
        ));
      }
    }
  };

  const handleMouseUp = () => {
    setDraggedTable(null);
  };

  const renderTables = (largeTables: any[], smallTables: any[], config: '4040' | '2080') => (
    <>
      {/* Large tables */}
      {largeTables.map((table) => (
        <g key={`large-${table.id}`}>
          <circle
            cx={table.x}
            cy={table.y}
            r={tableRadius}
            fill="rgba(34, 197, 94, 0.2)"
            stroke="#22c55e"
            strokeWidth="2"
            className="cursor-pointer hover:fill-green-300 hover:stroke-green-600 transition-colors"
            onMouseDown={(e) => handleMouseDown(table.id, 'large', config, e)}
          />
          <text
            x={table.x}
            y={table.y}
            textAnchor="middle"
            className="fill-green-700 dark:fill-green-300 font-medium text-xs pointer-events-none"
            dy="0.35em"
          >
            {table.id}
          </text>
        </g>
      ))}
      
      {/* Small tables */}
      {smallTables.map((table) => (
        <g key={`small-${table.id}`}>
          <circle
            cx={table.x}
            cy={table.y}
            r={smallTableRadius}
            fill="rgba(168, 85, 247, 0.2)"
            stroke="#a855f7"
            strokeWidth="2"
            className="cursor-pointer hover:fill-purple-300 hover:stroke-purple-600 transition-colors"
            onMouseDown={(e) => handleMouseDown(table.id, 'small', config, e)}
          />
          <text
            x={table.x}
            y={table.y}
            textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-medium text-xs pointer-events-none"
            dy="0.35em"
          >
            {table.id}
          </text>
        </g>
      ))}
    </>
  );

  const renderPoles = (poles: any[]) => (
    <>
      {poles.map((pole, index) => (
        <g key={index}>
          <circle
            cx={pole.x}
            cy={pole.y}
            r={POLE_RADIUS}
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="1"
          />
          <circle
            cx={pole.x}
            cy={pole.y}
            r={POLE_RADIUS + 2}
            fill="none"
            stroke="#dc2626"
            strokeWidth="1"
            opacity="0.3"
          />
        </g>
      ))}
    </>
  );

  return (
    <div className="space-y-6">
      {/* 40x40 Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>40×40ft Tent Configuration</CardTitle>
          <CardDescription>
            12 × 72" round tables + 10 × 32" cocktail tables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border">
            <svg 
              viewBox={`-20 -20 ${totalWidth4040 + 40} ${totalHeight4040 + 40}`}
              className="w-full h-auto max-w-2xl mx-auto cursor-crosshair"
              onMouseMove={(e) => handleMouseMove(e, '4040')}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid4040" width={SCALE * 5} height={SCALE * 5} patternUnits="userSpaceOnUse">
                  <path d={`M ${SCALE * 5} 0 L 0 0 0 ${SCALE * 5}`} fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x={-10} y={-10} width={totalWidth4040 + 20} height={totalHeight4040 + 20} fill="url(#grid4040)" />
              
              {/* Tent boundary */}
              <rect
                x={0}
                y={0}
                width={totalWidth4040}
                height={totalHeight4040}
                fill="rgba(59, 130, 246, 0.05)"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="8,4"
              />

              {renderPoles(poles4040)}
              {renderTables(largeTables4040, smallTables4040, '4040')}

              {/* Measurements */}
              <g className="text-xs fill-muted-foreground">
                <line x1={0} y1={-10} x2={totalWidth4040} y2={-10} stroke="#6b7280" strokeWidth="1"/>
                <text x={totalWidth4040 / 2} y={-15} textAnchor="middle">40ft</text>
                <line x1={-10} y1={0} x2={-10} y2={totalHeight4040} stroke="#6b7280" strokeWidth="1"/>
                <text x={-15} y={totalHeight4040 / 2} textAnchor="middle" transform={`rotate(-90, -15, ${totalHeight4040 / 2})`}>40ft</text>
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* 20x80 Configuration - Larger */}
      <Card>
        <CardHeader>
          <CardTitle>20×80ft Tent Configuration</CardTitle>
          <CardDescription>
            8 × 72" round tables + 6 × 32" cocktail tables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border">
            <svg 
              viewBox={`-20 -20 ${totalWidth2080 + 40} ${totalHeight2080 + 40}`}
              className="w-full h-auto cursor-crosshair"
              style={{ minHeight: '300px' }}
              onMouseMove={(e) => handleMouseMove(e, '2080')}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid2080" width={SCALE * 5} height={SCALE * 5} patternUnits="userSpaceOnUse">
                  <path d={`M ${SCALE * 5} 0 L 0 0 0 ${SCALE * 5}`} fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x={-10} y={-10} width={totalWidth2080 + 20} height={totalHeight2080 + 20} fill="url(#grid2080)" />
              
              {/* Tent boundary */}
              <rect
                x={0}
                y={0}
                width={totalWidth2080}
                height={totalHeight2080}
                fill="rgba(59, 130, 246, 0.05)"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="8,4"
              />

              {renderPoles(poles2080)}
              {renderTables(largeTables2080, smallTables2080, '2080')}

              {/* Measurements */}
              <g className="text-xs fill-muted-foreground">
                <line x1={0} y1={-10} x2={totalWidth2080} y2={-10} stroke="#6b7280" strokeWidth="1"/>
                <text x={totalWidth2080 / 2} y={-15} textAnchor="middle">80ft</text>
                <line x1={-10} y1={0} x2={-10} y2={totalHeight2080} stroke="#6b7280" strokeWidth="1"/>
                <text x={-15} y={totalHeight2080 / 2} textAnchor="middle" transform={`rotate(-90, -15, ${totalHeight2080 / 2})`}>20ft</text>
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-dashed bg-blue-100 dark:bg-blue-900/20"></div>
              <span className="text-sm">Tent boundary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-sm">Tent poles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-900/20 rounded-full"></div>
              <span className="text-sm">72" round tables</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-500 bg-purple-200 dark:bg-purple-900/20 rounded-full"></div>
              <span className="text-sm">32" cocktail tables</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-400"></div>
              <span className="text-sm">Measurements</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};